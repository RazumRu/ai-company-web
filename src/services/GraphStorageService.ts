import type { Viewport } from '@xyflow/react';

import type { GraphEdge, GraphNode } from '../pages/graphs/types';

/**
 * Pure storage service for graph draft state.
 * This service ONLY handles localStorage persistence.
 * No business logic, no diff computation - just simple get/set operations.
 */

export interface GraphDiffState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  viewport: Viewport;
  selectedThreadId?: string;
  graphName?: string;
  baseVersion?: string; // The server version this draft is based on
}

export type GraphDiffKind = 'structure' | 'position' | 'metadata';

export interface GraphPendingRevisionState extends GraphDiffState {
  /**
   * The target version this snapshot represents (the "toVersion" of the revision).
   * This can differ from the server's current graph.version while the revision is applying.
   */
  toVersion: string;
  revisionId?: string;
  savedAt: number;
}

export class GraphStorageService {
  private static readonly STORAGE_KEY_PREFIX = 'graph_draft_';
  private static readonly VIEWPORT_KEY_PREFIX = 'graph_viewport_';
  private static readonly PENDING_KEY_PREFIX = 'graph_pending_revision_';

  static loadViewport(graphId: string): Viewport | null {
    try {
      const key = `${this.VIEWPORT_KEY_PREFIX}${graphId}`;
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<Viewport>;
      return {
        x: typeof parsed.x === 'number' ? parsed.x : 0,
        y: typeof parsed.y === 'number' ? parsed.y : 0,
        zoom: typeof parsed.zoom === 'number' ? parsed.zoom : 1,
      };
    } catch {
      return null;
    }
  }

  static saveViewport(graphId: string, viewport: Viewport): void {
    try {
      const key = `${this.VIEWPORT_KEY_PREFIX}${graphId}`;
      localStorage.setItem(key, JSON.stringify(viewport));
    } catch {
      //
    }
  }

  /**
   * Load draft state from localStorage for a specific graph.
   */
  static loadDraft(graphId: string): GraphDiffState | null {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as GraphDiffState;
      return parsed;
    } catch (error) {
      console.warn('Failed to load graph draft:', error);
      return null;
    }
  }

  /**
   * Save draft state to localStorage for a specific graph.
   */
  static saveDraft(graphId: string, state: GraphDiffState): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save graph draft:', error);
    }
  }

  /**
   * Persist a "saved but not yet applied" graph snapshot.
   * This is used to restore the latest user-visible graph state after reload while
   * a backend revision is still pending/applying.
   */
  static savePendingRevision(
    graphId: string,
    state: GraphPendingRevisionState,
  ): void {
    try {
      const key = `${this.PENDING_KEY_PREFIX}${graphId}`;
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save pending graph revision:', error);
    }
  }

  static loadPendingRevision(
    graphId: string,
  ): GraphPendingRevisionState | null {
    try {
      const key = `${this.PENDING_KEY_PREFIX}${graphId}`;
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as GraphPendingRevisionState;
    } catch (error) {
      console.warn('Failed to load pending graph revision:', error);
      return null;
    }
  }

  static clearPendingRevision(graphId: string): void {
    try {
      const key = `${this.PENDING_KEY_PREFIX}${graphId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear pending graph revision:', error);
    }
  }

  /**
   * Clear draft state for a specific graph.
   */
  static clearDraft(graphId: string): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear graph draft:', error);
    }
  }

  /**
   * Clear all draft states (useful for cleanup).
   */
  static clearAllDrafts(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
        if (key.startsWith(this.PENDING_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear all graph drafts:', error);
    }
  }

  /**
   * Check if a draft exists for a specific graph.
   */
  static hasDraft(graphId: string): boolean {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.warn('Failed to check graph draft:', error);
      return false;
    }
  }
}
