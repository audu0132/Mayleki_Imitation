import React from "react";
import { FiShield, FiCheckCircle } from "react-icons/fi";

export default function DepositExplainerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-stone-900 border border-gold/40 rounded-xl p-6 max-w-md w-full text-stone-300">
        <div className="flex items-center gap-2 text-gold mb-3 font-serif text-lg">
          <FiShield className="w-5 h-5" /> 100% Refundable Security Deposit
        </div>
        <p className="text-xs leading-relaxed text-stone-400 mb-4">
          We charge a small refundable security deposit to protect our handcrafted 1GM gold pieces during rental transit.
        </p>
        <ul className="space-y-2 text-xs text-stone-300 mb-6">
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Automatic refund within 24-48 hours after courier return pickup.</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
            <span>No deduction for minor natural wear and micro-scratches.</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Securely held via Razorpay Escrow protocol.</span>
          </li>
        </ul>
        <button onClick={onClose} className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium">
          Understood
        </button>
      </div>
    </div>
  );
}
