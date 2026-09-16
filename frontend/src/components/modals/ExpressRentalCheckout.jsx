import React from "react";
import { FiX, FiZap } from "react-icons/fi";

export default function ExpressRentalCheckout({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-stone-900 border border-gold/40 rounded-2xl p-6 max-w-sm w-full text-stone-200">
        <div className="flex justify-between items-center mb-3">
          <span className="font-serif text-base text-gold flex items-center gap-1.5">
            <FiZap /> Express 1-Click Hold
          </span>
          <button onClick={onClose}><FiX className="text-stone-400 hover:text-white" /></button>
        </div>
        <p className="text-xs text-stone-400 mb-4">{product.name}</p>
        <button onClick={onClose} className="w-full py-2.5 bg-gold text-stone-950 font-medium rounded-lg text-xs uppercase tracking-wider">
          Proceed with Razorpay
        </button>
      </div>
    </div>
  );
}
