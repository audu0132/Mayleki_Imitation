import React from "react";

export default function LiveStockIndicator({ stock = 2 }) {
  const isLow = stock <= 2;
  return (
    <div className="inline-flex items-center gap-1.5 text-xs">
      <span className={`w-2 h-2 rounded-full ${isLow ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
      <span className={isLow ? "text-amber-300 font-medium" : "text-emerald-300"}>
        {isLow ? `Only ${stock} sets available for upcoming dates` : "Available for instant booking"}
      </span>
    </div>
  );
}
