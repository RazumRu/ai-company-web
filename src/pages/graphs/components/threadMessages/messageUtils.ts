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

export const createReasoningPreview = (
  value: string,
  maxLines = 6,
): { text: string; isTruncated: boolean } => {
  if (!value) {
    return { text: '', isTruncated: false };
  }

  const lines = value.split('\n');
  const normalized: string[] = [];

  for (const line of lines) {
    if (
      line.trim().length === 0 &&
      normalized.length > 0 &&
      normalized[normalized.length - 1].trim().length === 0
    ) {
      continue;
    }
    normalized.push(line);
  }

  const isTruncated = normalized.length > maxLines;
  const truncated = normalized.slice(0, maxLines).join('\n').trim();

  return {
    text: truncated.length > 0 ? truncated : 'Reasoning hidden.',
    isTruncated,
  };
};
