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
}

export type GraphDiffKind = 'structure' | 'position' | 'metadata';

export class GraphStorageService {
  private static readonly STORAGE_KEY_PREFIX = 'graph_draft_';

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
