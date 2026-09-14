import React, { useState } from "react";
import { FiX, FiGift } from "react-icons/fi";

export default function NewsletterPopup({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-gold/40 rounded-2xl p-8 max-w-sm w-full text-center relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-stone-400 hover:text-white"><FiX /></button>
        <FiGift className="w-10 h-10 text-gold mx-auto mb-3" />
        <h3 className="font-serif text-xl text-stone-100 mb-2">Unlock ₹500 Off</h3>
        <p className="text-xs text-stone-400 mb-6">Join the Mayleki Royale Privé club and receive ₹500 off your first bridal rental.</p>
        {submitted ? (
          <p className="text-xs text-emerald-400 font-medium">Coupon code <strong>ROYALE500</strong> sent to your email!</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-200 outline-none focus:border-gold"
            />
            <button type="submit" className="w-full py-2.5 bg-gold text-stone-950 rounded-lg text-xs font-semibold uppercase tracking-wider">
              Claim VIP Voucher
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
