import React from "react";
import { FiX, FiAward } from "react-icons/fi";

export default function ArtisanStoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-gold/30 rounded-2xl p-6 max-w-lg w-full text-stone-300">
        <div className="flex justify-between items-center mb-4">
          <span className="font-serif text-lg text-gold flex items-center gap-2">
            <FiAward /> The Mayleki Karigari Heritage
          </span>
          <button onClick={onClose}><FiX className="text-stone-400 hover:text-white" /></button>
        </div>
        <p className="text-xs leading-relaxed text-stone-400 mb-4">
          Every choker, hathphool, and royal jhumka in our collection is hand-set by 4th-generation kundan and jadau artisans from Jaipur, Rajkot, and Kolhapur.
        </p>
        <p className="text-xs leading-relaxed text-stone-400">
          We use brass-copper alloy cores plated with genuine 24KT micro-gold flash, ensuring authentic bridal heritage weight and sparkle.
        </p>
      </div>
    </div>
  );
}
