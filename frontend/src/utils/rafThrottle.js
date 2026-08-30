export const rafThrottle = (callback) => {
  let isTicking = false;
  return (...args) => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        callback(...args);
        isTicking = false;
      });
      isTicking = true;
    }
  };
};
