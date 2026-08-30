export const purgeStaleCaches = () => {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("mayleki_exp_")) {
        const item = JSON.parse(localStorage.getItem(key) || "{}");
        if (Date.now() > (item.expiry || 0)) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch {}
};
