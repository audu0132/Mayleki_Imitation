/**
 * Top searched terms & jewellery category trends
 */

const searchFrequency = new Map();

export const recordSearchQuery = (term) => {
  if (!term || typeof term !== "string") return;
  const normalized = term.trim().toLowerCase();
  searchFrequency.set(normalized, (searchFrequency.get(normalized) || 0) + 1);
};

export const getTrendingKeywords = (limit = 6) => {
  return [...searchFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
};
