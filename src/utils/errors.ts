import { isAxiosError } from 'axios';

const extractMessageFromUnknown = (value: unknown): string | null => {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const extracted = extractMessageFromUnknown(item);
      if (extracted) {
        return extracted;
      }
    }
    return null;
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const keysToCheck = ['message', 'error', 'detail', 'details'];
    for (const key of keysToCheck) {
      if (key in obj) {
        const extracted = extractMessageFromUnknown(obj[key]);
        if (extracted) {
          return extracted;
        }
      }
    }
  }

  return null;
};

type ExtractedErrorDetail = {
  message: string;
  isFullMessage: boolean;
};

const extractDetailFromError = (
  error: unknown,
): ExtractedErrorDetail | null => {
  if (isAxiosError(error)) {
    const data: unknown = error.response?.data;

    if (typeof data === 'string') {
      return { message: data, isFullMessage: false };
    }

    if (data && typeof data === 'object') {
      if ('fullMessage' in data) {
        const extracted = extractMessageFromUnknown(
          (data as Record<string, unknown>).fullMessage,
        );
        if (extracted) {
          return { message: extracted, isFullMessage: true };
        }
      }

      const extracted = extractMessageFromUnknown(data);
      if (extracted) {
        return { message: extracted, isFullMessage: false };
      }
    }
  }

  if (error instanceof Error) {
    return { message: error.message, isFullMessage: false };
  }

  return null;
};

export const extractApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  const detail = extractDetailFromError(error);

  if (!detail) {
    return fallback;
  }

  if (detail.isFullMessage) {
    return detail.message;
  }

  if (detail.message.toLowerCase() === fallback.toLowerCase()) {
    return detail.message;
  }

  return `${fallback}: ${detail.message}`;
};
