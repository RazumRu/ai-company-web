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
  maxChars = 420,
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

  const normalizedText = normalized.join('\n');
  const isTruncatedByLines = normalized.length > maxLines;
  let truncated = isTruncatedByLines
    ? normalized.slice(0, maxLines).join('\n').trim()
    : normalizedText.trim();

  const isTruncatedByChars =
    !isTruncatedByLines && maxChars > 0 && truncated.length > maxChars;
  if (isTruncatedByChars) {
    truncated = truncated.slice(0, maxChars).trimEnd();
  }

  return {
    text: truncated.length > 0 ? truncated : 'Reasoning hidden.',
    isTruncated: isTruncatedByLines || isTruncatedByChars,
  };
};
