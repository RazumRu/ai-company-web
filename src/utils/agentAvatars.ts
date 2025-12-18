import { micah } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

const avatarCache = new Map<string, string>();

export function getAgentAvatarDataUri(nodeId: string, size = 64): string {
  const key = `${nodeId}:${size}`;
  const cached = avatarCache.get(key);
  if (cached) return cached;

  const dataUri = createAvatar(micah, {
    seed: nodeId,
    size,
    radius: 50,
    'backgroundColor': ['b6e3f4'],
    'baseColor': ['f9c9b6'],
  }).toDataUri();

  avatarCache.set(key, dataUri);
  return dataUri;
}

