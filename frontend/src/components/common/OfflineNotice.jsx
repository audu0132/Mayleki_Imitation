import React, { useState, useEffect } from "react";
import { FiWifiOff } from "react-icons/fi";

export default function OfflineNotice() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-stone-950 text-xs py-2 px-4 flex items-center justify-center gap-2 font-medium">
      <FiWifiOff className="w-4 h-4" />
      <span>You are currently browsing offline. Some rental actions may be unavailable.</span>
    </div>
  );
}
