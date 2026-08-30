export const setWithExpiry = (key, value, ttlMs) => {
  const item = { value, expiry: Date.now() + ttlMs };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const str = localStorage.getItem(key);
  if (!str) return null;
  try {
    const item = JSON.parse(str);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
};
