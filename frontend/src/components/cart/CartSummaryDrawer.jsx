import React from "react";

export default function CartSummaryDrawer({ subtotal = 0, deposit = 0, cleaningFee = 150 }) {
  const gst = Math.round(subtotal * 0.03);
  const total = subtotal + deposit + cleaningFee + gst;

  return (
    <div className="p-5 bg-stone-900/90 rounded-xl border border-gold/20 space-y-3 text-xs">
      <h4 className="font-serif text-sm text-gold font-medium mb-3">Payment Summary</h4>
      <div className="flex justify-between text-stone-400">
        <span>Base Rental Fee</span>
        <span className="text-stone-200">₹{subtotal}</span>
      </div>
      <div className="flex justify-between text-stone-400">
        <span>Refundable Security Deposit</span>
        <span className="text-emerald-400">₹{deposit}</span>
      </div>
      <div className="flex justify-between text-stone-400">
        <span>Sanitization & Packaging</span>
        <span className="text-stone-200">₹{cleaningFee}</span>
      </div>
      <div className="flex justify-between text-stone-400">
        <span>GST (3% jewellery)</span>
        <span className="text-stone-200">₹{gst}</span>
      </div>
      <div className="border-t border-stone-800 pt-3 flex justify-between font-medium text-sm text-stone-100">
        <span>Total Payable</span>
        <span className="text-gold font-serif">₹{total}</span>
      </div>
    </div>
  );
}
