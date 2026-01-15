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

/**
 * Flattens allOf structures in a JSON Schema.
 * This helps RJSF better understand schemas where properties like enum are nested in allOf.
 * After $RefParser.dereference, we still need to flatten allOf arrays into a single schema.
 *
 * Also handles anyOf schemas when a specific UI hint (like x-ui:textarea) is present.
 * In such cases, we pick the most appropriate type from anyOf to avoid RJSF rendering
 * multiple fields.
 */
export const flattenAllOfInSchema = (
  schema: Record<string, unknown>,
): Record<string, unknown> => {
  const properties = schema.properties as
    | Record<string, Record<string, unknown>>
    | undefined;
  if (!properties) {
    return schema;
  }

  const flattenedProperties: Record<string, Record<string, unknown>> = {};

  for (const [key, prop] of Object.entries(properties)) {
    const allOf = prop.allOf as Record<string, unknown>[] | undefined;

    if (allOf && Array.isArray(allOf) && allOf.length > 0) {
      // Merge all schemas in allOf array into the parent property
      const merged: Record<string, unknown> = { ...prop };
      delete merged.allOf; // Remove allOf after merging

      for (const subSchema of allOf) {
        Object.assign(merged, subSchema);
      }

      flattenedProperties[key] = simplifyAnyOf(merged);
    } else {
      flattenedProperties[key] = simplifyAnyOf(prop);
    }
  }

  return {
    ...schema,
    properties: flattenedProperties,
  };
};

/**
 * Simplifies anyOf schemas when UI hints indicate a specific rendering intent.
 * For example, if x-ui:textarea is true and anyOf contains a string type,
 * we prefer the string type to avoid duplicate field rendering in RJSF.
 */
const simplifyAnyOf = (
  prop: Record<string, unknown>,
): Record<string, unknown> => {
  const anyOf = prop.anyOf as Record<string, unknown>[] | undefined;

  if (!anyOf || !Array.isArray(anyOf) || anyOf.length === 0) {
    return prop;
  }

  // If a UI widget is explicitly specified (textarea, select, etc.),
  // we should pick the most appropriate type from anyOf to avoid RJSF
  // rendering both a type selector and the actual field
  const hasUiHint =
    prop['x-ui:textarea'] === true ||
    prop['x-ui:litellm-models-list-select'] === true ||
    prop['x-ui:ai-suggestions'] === true;

  if (!hasUiHint) {
    return prop;
  }

  // Try to find a string type in anyOf (most common for UI fields)
  const stringSchema = anyOf.find(
    (schema) => (schema as { type?: unknown }).type === 'string',
  );

  if (stringSchema) {
    // Merge the string schema with the parent, removing anyOf
    const result: Record<string, unknown> = { ...prop };
    delete result.anyOf;
    Object.assign(result, stringSchema);
    return result;
  }

  // If no string type found, try to find an array type
  const arraySchema = anyOf.find(
    (schema) => (schema as { type?: unknown }).type === 'array',
  );

  if (arraySchema) {
    // Merge the array schema with the parent, removing anyOf
    const result: Record<string, unknown> = { ...prop };
    delete result.anyOf;
    Object.assign(result, arraySchema);
    return result;
  }

  // Fallback: keep anyOf if we can't determine a better option
  return prop;
};
