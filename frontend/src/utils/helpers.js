// Frontend helpers
export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const truncate = (s, n = 50) => s.length > n ? s.slice(0, n) + '...' : s;
