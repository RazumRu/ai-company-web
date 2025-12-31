import type { GraphNode, GraphNodeData, SchemaProperty } from '../types';

/**
 * Safely extracts GraphNodeData from a GraphNode.
 * Returns undefined if node is null/undefined.
 */
export const getNodeData = (
  node: GraphNode | null | undefined,
): GraphNodeData | undefined => {
  if (!node) return undefined;
  return node.data as unknown as GraphNodeData;
};

/**
 * Normalizes a JSON Schema type field which can be a string, array, or undefined.
 * Returns the first non-null type found, or undefined if none.
 */
export const normalizeSchemaType = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    const first = value.find(
      (item): item is string => typeof item === 'string' && item !== 'null',
    );
    return first;
  }
  return undefined;
};

/**
 * Gets the effective type name for a schema property.
 * Handles both direct type field and allOf constructs.
 */
export const getSchemaTypeName = (schema: SchemaProperty): string => {
  const allOfType =
    schema.allOf && schema.allOf.length === 1
      ? (schema.allOf[0] as { type?: unknown } | undefined)?.type
      : undefined;

  return (
    normalizeSchemaType(schema.type) ??
    normalizeSchemaType(allOfType) ??
    'string'
  );
};

/**
 * Gets the UI label for a schema property, falling back to title or key.
 */
export const getSchemaLabel = (schema: SchemaProperty, key: string): string => {
  const uiLabel =
    typeof schema['x-ui:label'] === 'string' ? schema['x-ui:label'] : undefined;
  return uiLabel ?? schema.title ?? key;
};

/**
 * Determines if a value is "truly empty" for the purposes of config serialization.
 * Empty strings, empty arrays, empty objects, null, and undefined are considered empty.
 * Booleans are never considered empty.
 */
export const isTrulyEmptyValue = (
  value: unknown,
  typeName: string,
): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeName === 'boolean') {
    return false;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (
    typeName === 'object' &&
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value as Record<string, unknown>).length === 0
  ) {
    return true;
  }

  return false;
};

/**
 * Processes a raw form value according to its schema type.
 * Returns undefined if the value cannot be processed.
 */
export const processValueByType = (
  value: unknown,
  typeName: string,
): unknown | undefined => {
  switch (typeName) {
    case 'number':
    case 'integer': {
      if (typeof value === 'string') {
        const num = Number(value);
        if (Number.isNaN(num)) {
          return undefined;
        }
        return typeName === 'integer' ? Math.trunc(num) : num;
      }
      if (typeof value === 'number') {
        return typeName === 'integer' ? Math.trunc(value) : value;
      }
      return undefined;
    }

    case 'array': {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === 'string') {
        return value
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line !== '');
      }
      return undefined;
    }

    case 'object': {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      }
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value;
      }
      return undefined;
    }

    case 'boolean': {
      return Boolean(value);
    }

    case 'string':
    default: {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed === '') {
          return undefined;
        }
        return trimmed;
      }
      return value;
    }
  }
};

/**
 * Gets the default empty value for a given type.
 */
export const getDefaultEmptyValue = (typeName: string): unknown => {
  switch (typeName) {
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return {};
    default:
      return '';
  }
};
