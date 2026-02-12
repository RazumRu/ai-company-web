import type { Viewport } from '@xyflow/react';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { GraphEdge, GraphNode } from '../pages/graphs/types';
import { GraphStorageService } from '../services/GraphStorageService';

/**
 * Central state management hook for graph draft changes.
 * This is the single source of truth for all local unsaved changes.
 *
 * Features:
 * - Tracks all local changes (nodes, edges, viewport, metadata)
 * - Persists changes to localStorage immediately
 * - Provides diff detection against server baseline
 * - Manages unsaved changes state
 */

export interface GraphDraftState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  viewport: Viewport;
  selectedThreadId?: string;
  graphName?: string;
  baseVersion?: string; // The server version this draft is based on
}

export interface UseGraphDraftStateOptions {
  graphId: string;
  serverState: GraphDraftState;
  onStateChange?: (state: GraphDraftState) => void;
}

export interface UseGraphDraftStateReturn {
  // Current draft state
  draftState: GraphDraftState;

  // Update functions
  updateNodes: (nodes: GraphNode[]) => void;
  updateEdges: (edges: GraphEdge[]) => void;
  updateViewport: (viewport: Viewport) => void;
  updateSelectedThread: (threadId?: string) => void;
  updateGraphName: (name: string) => void;
  updateNodeConfig: (
    nodeId: string,
    updates: { name?: string; config?: Record<string, unknown> },
  ) => void;

  // Diff information
  hasUnsavedChanges: boolean;
  hasStructuralChanges: boolean;
  hasPositionChanges: boolean;
  nodeIdsWithChanges: string[];
  hasNodeChanges: (nodeId: string) => boolean;

  // Operations
  resetToServer: () => void;
  clearAllChanges: () => void;

  // Server state management
  updateServerBaseline: (newServerState: GraphDraftState) => void;
}

/**
 * Recursively sorts object keys to ensure consistent JSON.stringify output.
 * This is crucial for detecting when values are truly equal regardless of key order.
 */
function deepSortKeys(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepSortKeys);

  const sorted: Record<string, unknown> = {};
  Object.keys(obj as Record<string, unknown>)
    .sort()
    .forEach((key) => {
      sorted[key] = deepSortKeys((obj as Record<string, unknown>)[key]);
    });
  return sorted;
}

/**
 * Normalizes graph state for consistent comparison.
 * Strips callbacks and React Flow internal properties, sorts arrays deterministically.
 */
function normalizeState(state: GraphDraftState): GraphDraftState {
  const stripCallbacks = (data: unknown): unknown => {
    if (!data || typeof data !== 'object') return data;
    const {
      onEdit: _onEdit,
      onDelete: _onDelete,
      ...rest
    } = data as Record<string, unknown>;
    return rest;
  };

  return {
    nodes: state.nodes
      .map((node) => {
        const {
          selected: _selected,
          dragging: _dragging,
          draggable: _draggable,
          selectable: _selectable,
          connectable: _connectable,
          deletable: _deletable,
          width: _width,
          height: _height,
          ...coreNode
        } = node;
        const strippedData = stripCallbacks(node.data);
        const strippedDataRecord = strippedData as Record<string, unknown>;
        const normalizedData = {
          label: strippedDataRecord.label,
          template: strippedDataRecord.template,
          config: strippedDataRecord?.config
            ? deepSortKeys(strippedDataRecord.config)
            : strippedDataRecord?.config,
        };
        return {
          ...coreNode,
          data: {
            ...normalizedData,
          },
        } as GraphNode;
      })
      .sort((a, b) => a.id.localeCompare(b.id)),
    edges: state.edges
      .map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        label: typeof edge.label === 'string' ? edge.label : undefined,
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
    viewport: state.viewport,
    selectedThreadId: state.selectedThreadId,
    graphName: state.graphName,
    baseVersion: state.baseVersion,
  };
}

/**
 * Normalizes state but EXCLUDES viewport and baseVersion for "unsaved changes" comparison.
 * Viewport changes (pan/zoom) and version metadata should not be considered "unsaved changes".
 */
function normalizeStateWithoutViewport(
  state: GraphDraftState,
): Omit<GraphDraftState, 'viewport' | 'baseVersion'> {
  const normalized = normalizeState(state);
  const {
    viewport: _viewport,
    baseVersion: _baseVersion,
    ...rest
  } = normalized;
  return rest;
}

/**
 * Extracts structural changes (ignoring positions/viewport/baseVersion).
 */
function extractStructure(state: GraphDraftState) {
  return {
    selectedThreadId: state.selectedThreadId,
    graphName: state.graphName,
    nodes: state.nodes.map((n) => ({
      id: n.id,
      type: n.type,
      data: n.data,
    })),
    edges: state.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle,
      label: typeof e.label === 'string' ? e.label : undefined,
    })),
  };
}

export function useGraphDraftState({
  graphId,
  serverState,
  onStateChange,
}: UseGraphDraftStateOptions): UseGraphDraftStateReturn {
  // Store normalized server baseline as state so it can be read during render
  const serverBaselineRef = useRef<GraphDraftState>(
    normalizeState(serverState),
  );
  const [normalizedServerBaseline, setNormalizedServerBaseline] =
    useState<GraphDraftState>(() => normalizeState(serverState));

  // Use ref for onStateChange to avoid dependency issues
  const onStateChangeRef = useRef(onStateChange);
  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  // Current draft state
  const [draftState, setDraftState] = useState<GraphDraftState>(() => {
    // On mount, apply any stored local changes to server state
    const stored = GraphStorageService.loadDraft(graphId);
    if (!stored) return serverState;
    // Merge to ensure newly added fields (e.g. graphName) default to server baseline
    return { ...serverState, ...stored };
  });

  // Notify parent whenever draft state changes
  useEffect(() => {
    onStateChangeRef.current?.(draftState);
  }, [draftState]);

  // Update server baseline when server state changes
  const updateServerBaseline = useCallback(
    (newServerState: GraphDraftState) => {
      const normalized = normalizeState(newServerState);
      serverBaselineRef.current = normalized;
      setNormalizedServerBaseline(normalized);

      // If we have no local changes, sync draft to server
      const currentDraft = GraphStorageService.loadDraft(graphId);
      if (!currentDraft) {
        setDraftState(newServerState);
        // The useEffect will handle calling onStateChange
      } else {
        // Keep local draft changes, but backfill any newly added fields from server baseline
        // (e.g. graphName introduced after an API/schema update).
        setDraftState((prev) => ({ ...newServerState, ...prev }));
      }
    },
    [graphId],
  );

  // Persist draft state to localStorage
  const persistDraft = useCallback(
    (state: GraphDraftState) => {
      const normalized = normalizeState(state);
      const baseline = serverBaselineRef.current;

      // Compare without viewport - we only persist meaningful changes
      const normalizedWithoutViewport =
        normalizeStateWithoutViewport(normalized);
      const baselineWithoutViewport = normalizeStateWithoutViewport(baseline);

      // If draft matches server (excluding viewport), clear local storage
      if (
        JSON.stringify(normalizedWithoutViewport) ===
        JSON.stringify(baselineWithoutViewport)
      ) {
        GraphStorageService.clearDraft(graphId);
      } else {
        // Save with viewport included (so viewport is restored on reload)
        GraphStorageService.saveDraft(graphId, normalized);
      }
    },
    [graphId],
  );

  // Update draft state helper
  const updateDraft = useCallback(
    (newState: GraphDraftState) => {
      setDraftState(newState);
      persistDraft(newState);
      onStateChange?.(newState);
    },
    [persistDraft, onStateChange],
  );

  // Update functions
  const updateNodes = useCallback(
    (nodes: GraphNode[]) => {
      updateDraft({ ...draftState, nodes });
    },
    [draftState, updateDraft],
  );

  const updateEdges = useCallback(
    (edges: GraphEdge[]) => {
      updateDraft({ ...draftState, edges });
    },
    [draftState, updateDraft],
  );

  const updateViewport = useCallback(
    (viewport: Viewport) => {
      updateDraft({ ...draftState, viewport });
    },
    [draftState, updateDraft],
  );

  const updateSelectedThread = useCallback(
    (threadId?: string) => {
      updateDraft({ ...draftState, selectedThreadId: threadId });
    },
    [draftState, updateDraft],
  );

  const updateGraphName = useCallback(
    (name: string) => {
      updateDraft({ ...draftState, graphName: name });
    },
    [draftState, updateDraft],
  );

  const updateNodeConfig = useCallback(
    (
      nodeId: string,
      updates: { name?: string; config?: Record<string, unknown> },
    ) => {
      const updatedNodes = draftState.nodes.map((node: GraphNode) => {
        if (node.id !== nodeId) return node;

        const currentData = node.data as Record<string, unknown>;
        const newData = { ...currentData };

        if (updates.name !== undefined) {
          newData.label = updates.name;
        }

        if (updates.config !== undefined) {
          newData.config = updates.config;
        }

        return { ...node, data: newData };
      });

      updateDraft({ ...draftState, nodes: updatedNodes });
    },
    [draftState, updateDraft],
  );

  // Diff computation
  const normalizedDraft = useMemo(
    () => normalizeState(draftState),
    [draftState],
  );

  const normalizedServer = normalizedServerBaseline;

  const hasUnsavedChanges = useMemo(() => {
    // Compare without viewport - viewport changes (pan/zoom) are not "unsaved changes"
    const draftWithoutViewport = normalizeStateWithoutViewport(normalizedDraft);
    const serverWithoutViewport =
      normalizeStateWithoutViewport(normalizedServer);
    const hasChanges =
      JSON.stringify(draftWithoutViewport) !==
      JSON.stringify(serverWithoutViewport);

    return hasChanges;
  }, [normalizedDraft, normalizedServer]);

  const hasStructuralChanges = useMemo(() => {
    const draftStructure = extractStructure(normalizedDraft);
    const serverStructure = extractStructure(normalizedServer);

    return !isEqual(draftStructure, serverStructure);
  }, [normalizedDraft, normalizedServer]);

  const hasPositionChanges = useMemo(() => {
    // Check if there are position changes (node positions changed, not viewport)
    // Compare node positions specifically
    const draftPositions = normalizedDraft.nodes.map((n) => ({
      id: n.id,
      position: n.position,
    }));
    const serverPositions = normalizedServer.nodes.map((n) => ({
      id: n.id,
      position: n.position,
    }));
    return JSON.stringify(draftPositions) !== JSON.stringify(serverPositions);
  }, [normalizedDraft, normalizedServer]);

  const nodeIdsWithChanges = useMemo(() => {
    const changedIds: string[] = [];

    normalizedDraft.nodes.forEach((draftNode) => {
      const serverNode = normalizedServer.nodes.find(
        (n) => n.id === draftNode.id,
      );
      if (!serverNode) {
        // New node
        changedIds.push(draftNode.id);
        return;
      }

      // Compare node data (label, config, etc) - ignore position
      const draftData = draftNode.data as Record<string, unknown>;
      const serverData = serverNode.data as Record<string, unknown>;

      const draftCore = {
        label: draftData?.label,
        template: draftData?.template,
        config: deepSortKeys(draftData?.config || {}),
      };
      const serverCore = {
        label: serverData?.label,
        template: serverData?.template,
        config: deepSortKeys(serverData?.config || {}),
      };

      if (JSON.stringify(draftCore) !== JSON.stringify(serverCore)) {
        changedIds.push(draftNode.id);
      }
    });

    // Also check for deleted nodes
    normalizedServer.nodes.forEach((serverNode) => {
      const draftNode = normalizedDraft.nodes.find(
        (n) => n.id === serverNode.id,
      );
      if (!draftNode) {
        changedIds.push(serverNode.id);
      }
    });

    return changedIds;
  }, [normalizedDraft, normalizedServer]);

  const hasNodeChanges = useCallback(
    (nodeId: string) => {
      return nodeIdsWithChanges.includes(nodeId);
    },
    [nodeIdsWithChanges],
  );

  // Operations
  const resetToServer = useCallback(() => {
    updateDraft(serverBaselineRef.current);
  }, [updateDraft]);

  const clearAllChanges = useCallback(() => {
    GraphStorageService.clearDraft(graphId);
    setDraftState(serverBaselineRef.current);
    onStateChange?.(serverBaselineRef.current);
  }, [graphId, onStateChange]);

  return {
    draftState,
    updateNodes,
    updateEdges,
    updateViewport,
    updateSelectedThread,
    updateGraphName,
    updateNodeConfig,
    hasUnsavedChanges,
    hasStructuralChanges,
    hasPositionChanges,
    nodeIdsWithChanges,
    hasNodeChanges,
    resetToServer,
    clearAllChanges,
    updateServerBaseline,
  };
}
