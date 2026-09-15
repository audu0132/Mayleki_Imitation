/**
 * Lightweight TTL Cache for catalogue categories
 */

const cacheStore = new Map();

export const getCached = (key) => {
  const item = cacheStore.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    cacheStore.delete(key);
    return null;
  }
  return item.value;
};

export const setCached = (key, value, ttlMs = 60000) => {
  cacheStore.set(key, { value, expiresAt: Date.now() + ttlMs });
};
