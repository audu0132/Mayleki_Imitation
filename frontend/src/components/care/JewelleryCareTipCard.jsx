import React from "react";

export default function JewelleryCareTipCard({ icon, title, text }) {
  return (
    <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/80 text-left">
      <div className="text-xl mb-2">{icon}</div>
      <h4 className="text-xs font-serif text-gold font-medium mb-1">{title}</h4>
      <p className="text-[11px] text-stone-400 leading-relaxed">{text}</p>
    </div>
  );
}
