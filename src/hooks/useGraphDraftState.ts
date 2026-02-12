import type { Viewport } from '@xyflow/react';
import { isEqual } from 'lodash';
import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  /** Ref holding the latest ReactFlow viewport (updated on every pan/zoom).
   *  Used by persistDraft so saved drafts always contain the real viewport. */
  viewportRef?: RefObject<Viewport>;
}

export interface UseGraphDraftStateReturn {
  // Current draft state
  draftState: GraphDraftState;

  // Update functions
  updateNodes: (nodes: GraphNode[]) => void;
  updateEdges: (edges: GraphEdge[]) => void;
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
      const val = (obj as Record<string, unknown>)[key];
      // Skip null/undefined keys so that {key: null} and {} are equivalent.
      // This prevents phantom diffs when the server strips null config values.
      if (val === null || val === undefined) return;
      sorted[key] = deepSortKeys(val);
    });
  return sorted;
}

/**
 * Normalizes graph state for consistent comparison.
 * Strips callbacks and React Flow internal properties, sorts arrays deterministically.
 */
function normalizeState(state: GraphDraftState): GraphDraftState {
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
        const strippedDataRecord = node.data as Record<string, unknown>;
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
 * Strips viewport and baseVersion from an already-normalized state for comparison.
 * Viewport changes (pan/zoom) and version metadata should not be considered "unsaved changes".
 * NOTE: Expects pre-normalized input — call normalizeState() first if needed.
 */
function stripViewportAndVersion(
  state: GraphDraftState,
): Omit<GraphDraftState, 'viewport' | 'baseVersion'> {
  const { viewport: _viewport, baseVersion: _baseVersion, ...rest } = state;
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
      data: deepSortKeys(n.data),
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
  viewportRef: externalViewportRef,
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

    // Always prefer the separately-saved viewport (written on every pan/zoom)
    // over the viewport inside the structural draft (only written when
    // nodes/edges change via persistDraft, so it can be stale).
    const freshViewport = GraphStorageService.loadViewport(graphId);

    // Merge to ensure newly added fields (e.g. graphName) default to server baseline
    return {
      ...serverState,
      ...stored,
      viewport: freshViewport ?? stored.viewport,
    };
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
      // If we have no local changes, sync draft to server
      const currentDraft = GraphStorageService.loadDraft(graphId);
      if (!currentDraft) {
        setDraftState(newServerState);
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

      // Always use the latest ReactFlow viewport (from the ref) when persisting,
      // because the viewport inside draftState can be stale — ReactFlow viewport
      // changes are saved directly via GraphStorageService.saveViewport and don't
      // go through applyDraft.
      const latestViewport =
        externalViewportRef?.current ?? normalized.viewport;

      // Compare without viewport - we only persist meaningful changes
      const normalizedWithoutViewport = stripViewportAndVersion(normalized);
      const baselineWithoutViewport = stripViewportAndVersion(baseline);

      // Always persist the latest viewport so pan/zoom is restored on reload.
      GraphStorageService.saveViewport(graphId, latestViewport);

      // If draft matches server (excluding viewport), clear the structural draft.
      if (
        JSON.stringify(normalizedWithoutViewport) ===
        JSON.stringify(baselineWithoutViewport)
      ) {
        GraphStorageService.clearDraft(graphId);
      } else {
        // Save structural draft with latest viewport included
        GraphStorageService.saveDraft(graphId, {
          ...normalized,
          viewport: latestViewport,
        });
      }
    },
    [graphId, externalViewportRef],
  );

  // Update draft state helper — uses functional setState to avoid stale closures.
  // Only the useEffect on draftState (line 212) calls onStateChange, so we don't
  // call it here to avoid double-firing.
  const applyDraft = useCallback(
    (updater: (prev: GraphDraftState) => GraphDraftState) => {
      setDraftState((prev) => {
        const next = updater(prev);
        persistDraft(next);
        return next;
      });
    },
    [persistDraft],
  );

  // Update functions — all use functional updates so they never capture stale draftState
  const updateNodes = useCallback(
    (nodes: GraphNode[]) => {
      applyDraft((prev) => ({ ...prev, nodes }));
    },
    [applyDraft],
  );

  const updateEdges = useCallback(
    (edges: GraphEdge[]) => {
      applyDraft((prev) => ({ ...prev, edges }));
    },
    [applyDraft],
  );

  const updateSelectedThread = useCallback(
    (threadId?: string) => {
      applyDraft((prev) => ({ ...prev, selectedThreadId: threadId }));
    },
    [applyDraft],
  );

  const updateGraphName = useCallback(
    (name: string) => {
      applyDraft((prev) => ({ ...prev, graphName: name }));
    },
    [applyDraft],
  );

  const updateNodeConfig = useCallback(
    (
      nodeId: string,
      updates: { name?: string; config?: Record<string, unknown> },
    ) => {
      applyDraft((prev) => {
        const updatedNodes = prev.nodes.map((node: GraphNode) => {
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

        return { ...prev, nodes: updatedNodes };
      });
    },
    [applyDraft],
  );

  // Diff computation
  const normalizedDraft = useMemo(
    () => normalizeState(draftState),
    [draftState],
  );

  const normalizedServer = normalizedServerBaseline;

  const hasUnsavedChanges = useMemo(() => {
    // Compare without viewport - viewport changes (pan/zoom) are not "unsaved changes"
    const draftWithoutViewport = stripViewportAndVersion(normalizedDraft);
    const serverWithoutViewport = stripViewportAndVersion(normalizedServer);
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
    applyDraft(() => serverBaselineRef.current);
  }, [applyDraft]);

  const clearAllChanges = useCallback(() => {
    GraphStorageService.clearDraft(graphId);
    setDraftState(serverBaselineRef.current);
    // The useEffect on draftState will call onStateChange
  }, [graphId]);

  return {
    draftState,
    updateNodes,
    updateEdges,
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
