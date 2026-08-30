export const calculateVisibleRange = (scrollTop, itemHeight, containerHeight, totalItems) => {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const end = Math.min(totalItems, Math.ceil((scrollTop + containerHeight) / itemHeight) + 2);
  return { start, end };
};
