/**
 * Get the color for a template kind/type.
 * This mapping is used consistently across the UI for node types.
 */
export const getTemplateKindColor = (kind?: string): string => {
  const normalized = kind?.toLowerCase() || '';
  switch (normalized) {
    case 'knowledge':
      return '#8e63ff';
    case 'mcp':
      return '#3d6cff';
    case 'resource':
      return '#25b5ae';
    case 'runtime':
      return '#ff8a34';
    case 'simpleagent':
      return '#6cc36c';
    case 'tool':
      return '#4c8dff';
    case 'trigger':
      return '#ffb020';
    default:
      return '#d9d9d9';
  }
};
