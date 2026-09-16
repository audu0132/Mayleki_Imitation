import React from "react";
import { FiX, FiHeart } from "react-icons/fi";

export default function CustomerPhotoGallery({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
      <div className="bg-stone-900 border border-gold/40 rounded-2xl p-6 max-w-lg w-full text-stone-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-serif text-lg text-gold flex items-center gap-2">
            <FiHeart className="text-rose-400 fill-current" /> Real Mayleki Brides
          </span>
          <button onClick={onClose}><FiX className="text-stone-400 hover:text-white" /></button>
        </div>
        <p className="text-xs text-stone-400 mb-4">Explore styling photographs shared by our brides across India.</p>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((num) => (
            <div key={num} className="aspect-square bg-stone-800 rounded-lg flex items-center justify-center text-stone-600 text-xs">
              Look #{num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
