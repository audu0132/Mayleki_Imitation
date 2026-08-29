import React from "react";

export default function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center my-8 gap-3 opacity-60">
      <div className="h-[1px] w-12 bg-gold/40" />
      <span className="text-gold text-xs">❖</span>
      <div className="h-[1px] w-12 bg-gold/40" />
    </div>
  );
}
