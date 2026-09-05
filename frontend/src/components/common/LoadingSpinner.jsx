import { useState, useEffect } from "react";

export default function LoadingSpinner({ fullScreen = true, text = "" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (fullScreen) {
      const timer = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [fullScreen]);

  if (!visible && fullScreen) return null;

  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-[300px] w-full">
        <div className="flex flex-col items-center gap-4">
          <span className="font-display text-xl tracking-[0.3em] uppercase text-charcoal opacity-60">
            Mayleki
          </span>
          <div className="w-8 h-px bg-champagne animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="loader-screen"
      style={{
        animation: visible ? "none" : "loaderFadeOut 0.5s ease forwards",
      }}
    >
      <span className="loader-wordmark">Mayleki</span>
      <div className="mt-4 w-8 h-px bg-champagne opacity-50" />
    </div>
  );
}
