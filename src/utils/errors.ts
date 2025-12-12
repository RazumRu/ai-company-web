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

const extractDetailFromError = (error: unknown): string | null => {
  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === 'string') {
      return data;
    }

    if (data && typeof data === 'object') {
      const extracted = extractMessageFromUnknown(data);
      if (extracted) {
        return extracted;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
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

  if (detail.toLowerCase() === fallback.toLowerCase()) {
    return detail;
  }

  return `${fallback}: ${detail}`;
};

