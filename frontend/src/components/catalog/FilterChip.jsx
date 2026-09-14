import React from "react";
import { FiX } from "react-icons/fi";

export default function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-gold text-xs border border-gold/30">
      <span>{label}</span>
      <button onClick={onRemove} className="hover:text-white"><FiX className="w-3 h-3" /></button>
    </span>
  );
}
