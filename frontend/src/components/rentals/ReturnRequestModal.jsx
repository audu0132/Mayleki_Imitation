import React from "react";
import { FiX, FiPackage } from "react-icons/fi";

export default function ReturnRequestModal({ isOpen, onClose, orderId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-gold/30 rounded-2xl p-6 max-w-md w-full text-stone-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg text-gold flex items-center gap-2">
            <FiPackage /> Initiate Return Pickup
          </h3>
          <button onClick={onClose}><FiX className="text-stone-400 hover:text-white" /></button>
        </div>
        <p className="text-xs text-stone-400 mb-4">Order #{orderId || "MLK-8921"}</p>
        <div className="space-y-3 text-xs mb-6">
          <label className="flex items-center gap-2 text-stone-300">
            <input type="checkbox" defaultChecked className="accent-amber-500" />
            <span>Jewellery packed in original velvet case with silica pouch.</span>
          </label>
          <label className="flex items-center gap-2 text-stone-300">
            <input type="checkbox" defaultChecked className="accent-amber-500" />
            <span>All matching earrings, dori, and maang tikka included.</span>
          </label>
        </div>
        <button onClick={onClose} className="w-full py-2.5 bg-gold text-stone-950 font-medium rounded-lg text-xs uppercase tracking-wider">
          Schedule Courier Pickup
        </button>
      </div>
    </div>
  );
}
