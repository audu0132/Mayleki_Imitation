import React from "react";
import { FiX, FiShield, FiLock } from "react-icons/fi";

export default function SecurityAndTrustModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-stone-900 border border-gold/40 rounded-2xl p-6 max-w-md w-full text-stone-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-serif text-lg text-gold flex items-center gap-2">
            <FiShield /> Trust & Sanitization Protocol
          </span>
          <button onClick={onClose}><FiX className="text-stone-400 hover:text-white" /></button>
        </div>
        <div className="space-y-3 text-xs text-stone-300 mb-6 leading-relaxed">
          <p>💎 <strong>UV-C & Ultrasonic Cleansed:</strong> Every returned jewellery piece undergoes 3-stage ultrasonic sanitization before re-dispatch.</p>
          <p>🔒 <strong>Zero KYC Hassle:</strong> Only standard mobile OTP verification required for rental orders under ₹10,000.</p>
          <p>📦 <strong>Tamper-Proof Seal:</strong> Sealed with serialized numbered security tags to guarantee pristine condition.</p>
        </div>
        <button onClick={onClose} className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium">
          Close
        </button>
      </div>
    </div>
  );
}
