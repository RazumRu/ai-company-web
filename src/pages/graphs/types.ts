import type { Node, Edge } from '@xyflow/react';

export interface GraphNodeData {
  label: string;
  template: string;
  templateKind?: string;
  templateSchema?: TemplateSchema;
  config: Record<string, unknown>;
  onEdit?: () => void;
  onDelete?: () => void;
}

export type GraphNode = Node;
export type GraphEdge = Edge;

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface NodeMetadata {
  id: string;
  x: number;
  y: number;
  name?: string;
}

export interface GraphMetadata {
  nodes?: NodeMetadata[];
  zoom?: number;
  x?: number;
  y?: number;
}

export interface SchemaProperty {
  type: string;
  title?: string;
  description?: string;
  default?: unknown;
  const?: unknown;
  additionalProperties?: boolean;
  'x-ui:show-on-node'?: boolean;
}

export interface TemplateSchema {
  properties: Record<string, SchemaProperty>;
  required?: string[];
}

export interface FormField {
  key: string;
  name: string;
  description?: string;
  type: string;
  required?: boolean;
  default?: unknown;
  const?: unknown;
  isConst?: boolean;
  isObject?: boolean;
}

export interface KeyValuePair {
  key: string;
  value: string;
}
