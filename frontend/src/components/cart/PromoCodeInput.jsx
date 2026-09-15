import React, { useState } from "react";

export default function PromoCodeInput({ onApplyCoupon }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!code) return;
    onApplyCoupon?.(code);
    setApplied(true);
  };

  return (
    <form onSubmit={handleApply} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter Promo Code"
        value={code}
        onChange={(e) => { setCode(e.target.value.toUpperCase()); setApplied(false); }}
        className="bg-stone-800 border border-stone-700 px-3 py-2 rounded-lg text-xs text-stone-200 uppercase w-full outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-stone-700 hover:bg-gold hover:text-stone-950 rounded-lg text-xs font-medium text-stone-200 transition-colors">
        {applied ? "Applied" : "Apply"}
      </button>
    </form>
  );
}
