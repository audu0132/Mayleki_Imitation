import React from "react";
import { FiCamera, FiCheck } from "react-icons/fi";

export default function VirtualTryOnExplainer() {
  return (
    <div className="p-5 rounded-2xl bg-stone-900 border border-gold/30 text-stone-300 space-y-3 text-xs">
      <div className="flex items-center gap-2 text-gold font-serif text-sm">
        <FiCamera className="w-4 h-4" /> AI Bridal Outfit Matching
      </div>
      <p className="text-stone-400">
        Upload a photo of your bridal lehenga or saree. Our Google Gemini Vision AI model detects your embroidery undertones and matches the ideal Kundan or Temple piece.
      </p>
      <div className="flex gap-4 text-emerald-400 text-[11px]">
        <span className="flex items-center gap-1"><FiCheck /> 100% Privacy Protected</span>
        <span className="flex items-center gap-1"><FiCheck /> Instant Color Palette Analysis</span>
      </div>
    </div>
  );
}
