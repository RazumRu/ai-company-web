export const formatMessageContent = (content: unknown): string => {
  if (typeof content === 'string') return content;
  if (typeof content === 'object' && content !== null)
    return JSON.stringify(content, null, 2);
  return String(content ?? '');
};

export const isBlankContent = (content: unknown): boolean => {
  if (content === null || content === undefined) return true;
  if (typeof content === 'string') {
    const trimmed = content.trim();
    return trimmed.length === 0 || trimmed === '[]' || trimmed === '{}';
  }
  return false;
};

export const limitConsecutiveNewlines = (value: string): string =>
  value.replace(/(\r?\n){2,}/g, '\n');
