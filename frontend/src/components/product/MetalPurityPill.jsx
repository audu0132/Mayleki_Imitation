import React from "react";

export default function MetalPurityPill({ finish = "1GM Micro Gold Plated" }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800/80 border border-gold/25 text-[11px] text-amber-200 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      {finish}
    </span>
  );
}
