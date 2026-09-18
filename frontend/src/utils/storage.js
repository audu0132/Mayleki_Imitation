// Local storage helpers
export const setItem = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const getItem = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
export const removeItem = (k) => localStorage.removeItem(k);
