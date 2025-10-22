import type { GraphNode, GraphEdge } from '../pages/graphs/types';
import type { Viewport } from '@xyflow/react';

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  viewport: Viewport;
  hasUnsavedChanges: boolean;
}

export class GraphStorageService {
  private static readonly STORAGE_KEY_PREFIX = 'graph_editor_';

  /**
   * Save graph state to localStorage
   */
  static saveGraphState(graphId: string, state: GraphState): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.warn('Failed to save graph state to localStorage:', error);
    }
  }

  /**
   * Load graph state from localStorage
   */
  static loadGraphState(graphId: string): GraphState | null {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      const serializedState = localStorage.getItem(key);
      
      if (!serializedState) {
        return null;
      }

      const state = JSON.parse(serializedState);
      
      // Validate the loaded state has required properties
      if (
        state &&
        Array.isArray(state.nodes) &&
        Array.isArray(state.edges) &&
        state.viewport &&
        typeof state.hasUnsavedChanges === 'boolean'
      ) {
        return state as GraphState;
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to load graph state from localStorage:', error);
      return null;
    }
  }

  /**
   * Clear graph state from localStorage
   */
  static clearGraphState(graphId: string): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear graph state from localStorage:', error);
    }
  }

  /**
   * Check if graph state exists in localStorage
   */
  static hasGraphState(graphId: string): boolean {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${graphId}`;
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.warn('Failed to check graph state in localStorage:', error);
      return false;
    }
  }

  /**
   * Get all stored graph IDs
   */
  static getAllStoredGraphIds(): string[] {
    try {
      const keys = Object.keys(localStorage);
      return keys
        .filter(key => key.startsWith(this.STORAGE_KEY_PREFIX))
        .map(key => key.replace(this.STORAGE_KEY_PREFIX, ''));
    } catch (error) {
      console.warn('Failed to get stored graph IDs:', error);
      return [];
    }
  }
}
