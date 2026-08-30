export const recordViewLru = (productId, maxItems = 6) => {
  const key = "mayleki_lru_views";
  try {
    const list = JSON.parse(sessionStorage.getItem(key) || "[]").filter((id) => id !== productId);
    list.unshift(productId);
    sessionStorage.setItem(key, JSON.stringify(list.slice(0, maxItems)));
  } catch {}
};
