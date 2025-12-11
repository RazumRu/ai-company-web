import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Viewport } from '@xyflow/react';
import type { GraphNode, GraphEdge } from '../pages/graphs/types';
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
  updateNodeConfig: (nodeId: string, updates: { name?: string; config?: Record<string, unknown> }) => void;
  
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
 * Normalizes graph state for consistent comparison.
 * Strips callbacks and sorts arrays deterministically.
 */
function normalizeState(state: GraphDraftState): GraphDraftState {
  const stripCallbacks = (data: any) => {
    if (!data || typeof data !== 'object') return data;
    const { onEdit, onDelete, ...rest } = data;
    return rest;
  };

  return {
    nodes: state.nodes
      .map(node => ({
        ...node,
        data: stripCallbacks(node.data),
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
    edges: state.edges
      .map(edge => ({
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
  };
}

/**
 * Extracts structural changes (ignoring positions/viewport).
 */
function extractStructure(state: GraphDraftState) {
  return {
    selectedThreadId: state.selectedThreadId,
    nodes: state.nodes.map(n => ({
      id: n.id,
      type: n.type,
      data: n.data,
    })),
    edges: state.edges.map(e => ({
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
  // Store normalized server baseline
  const serverBaselineRef = useRef<GraphDraftState>(normalizeState(serverState));
  const [baselineVersion, setBaselineVersion] = useState(0);
  
  // Use ref for onStateChange to avoid dependency issues
  const onStateChangeRef = useRef(onStateChange);
  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);
  
  // Current draft state
  const [draftState, setDraftState] = useState<GraphDraftState>(() => {
    // On mount, apply any stored local changes to server state
    const stored = GraphStorageService.loadDraft(graphId);
    return stored || serverState;
  });

  // Notify parent whenever draft state changes
  useEffect(() => {
    onStateChangeRef.current?.(draftState);
  }, [draftState]);

  // Update server baseline when server state changes
  const updateServerBaseline = useCallback((newServerState: GraphDraftState) => {
    serverBaselineRef.current = normalizeState(newServerState);
    setBaselineVersion(v => v + 1);
    
    // If we have no local changes, sync draft to server
    const currentDraft = GraphStorageService.loadDraft(graphId);
    if (!currentDraft) {
      setDraftState(newServerState);
      // The useEffect will handle calling onStateChange
    }
  }, [graphId]);

  // Persist draft state to localStorage
  const persistDraft = useCallback((state: GraphDraftState) => {
    const normalized = normalizeState(state);
    const baseline = serverBaselineRef.current;
    
    // If draft matches server, clear local storage
    if (JSON.stringify(normalized) === JSON.stringify(baseline)) {
      GraphStorageService.clearDraft(graphId);
    } else {
      GraphStorageService.saveDraft(graphId, normalized);
    }
  }, [graphId]);

  // Update draft state helper
  const updateDraft = useCallback((newState: GraphDraftState) => {
    setDraftState(newState);
    persistDraft(newState);
    onStateChange?.(newState);
  }, [persistDraft, onStateChange]);

  // Update functions
  const updateNodes = useCallback((nodes: GraphNode[]) => {
    updateDraft({ ...draftState, nodes });
  }, [draftState, updateDraft]);

  const updateEdges = useCallback((edges: GraphEdge[]) => {
    updateDraft({ ...draftState, edges });
  }, [draftState, updateDraft]);

  const updateViewport = useCallback((viewport: Viewport) => {
    updateDraft({ ...draftState, viewport });
  }, [draftState, updateDraft]);

  const updateSelectedThread = useCallback((threadId?: string) => {
    updateDraft({ ...draftState, selectedThreadId: threadId });
  }, [draftState, updateDraft]);

  const updateNodeConfig = useCallback((
    nodeId: string,
    updates: { name?: string; config?: Record<string, unknown> }
  ) => {
    const updatedNodes = draftState.nodes.map((node: GraphNode) => {
      if (node.id !== nodeId) return node;
      
      const currentData = node.data as any;
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
  }, [draftState, updateDraft]);

  // Diff computation
  const normalizedDraft = useMemo(
    () => normalizeState(draftState),
    [draftState]
  );

  const normalizedServer = useMemo(
    () => serverBaselineRef.current,
    [baselineVersion]
  );

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(normalizedDraft) !== JSON.stringify(normalizedServer);
  }, [normalizedDraft, normalizedServer]);

  const hasStructuralChanges = useMemo(() => {
    const draftStructure = extractStructure(normalizedDraft);
    const serverStructure = extractStructure(normalizedServer);
    return JSON.stringify(draftStructure) !== JSON.stringify(serverStructure);
  }, [normalizedDraft, normalizedServer]);

  const hasPositionChanges = useMemo(() => {
    // If there are changes but not structural, they must be position/viewport
    return hasUnsavedChanges && !hasStructuralChanges;
  }, [hasUnsavedChanges, hasStructuralChanges]);

  const nodeIdsWithChanges = useMemo(() => {
    const changedIds: string[] = [];
    
    normalizedDraft.nodes.forEach(draftNode => {
      const serverNode = normalizedServer.nodes.find(n => n.id === draftNode.id);
      if (!serverNode) {
        // New node
        changedIds.push(draftNode.id);
        return;
      }
      
      // Compare node data (label, config, etc) - ignore position
      const draftData = draftNode.data as any;
      const serverData = serverNode.data as any;
      
      const draftCore = {
        label: draftData?.label,
        template: draftData?.template,
        config: draftData?.config || {},
      };
      const serverCore = {
        label: serverData?.label,
        template: serverData?.template,
        config: serverData?.config || {},
      };
      
      if (JSON.stringify(draftCore) !== JSON.stringify(serverCore)) {
        changedIds.push(draftNode.id);
      }
    });
    
    // Also check for deleted nodes
    normalizedServer.nodes.forEach(serverNode => {
      const draftNode = normalizedDraft.nodes.find(n => n.id === serverNode.id);
      if (!draftNode) {
        changedIds.push(serverNode.id);
      }
    });
    
    return changedIds;
  }, [normalizedDraft, normalizedServer]);

  const hasNodeChanges = useCallback((nodeId: string) => {
    return nodeIdsWithChanges.includes(nodeId);
  }, [nodeIdsWithChanges]);

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
