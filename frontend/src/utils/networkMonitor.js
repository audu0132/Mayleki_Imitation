export const subscribeToNetworkChanges = (callback) => {
  const handleOnline = () => callback({ online: true });
  const handleOffline = () => callback({ online: false });
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
};
