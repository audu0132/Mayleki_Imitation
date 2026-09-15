import React, { useState } from "react";
import { FiTruck } from "react-icons/fi";

export default function DeliveryEstimator() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setResult("Estimated delivery within 48 hours via BlueDart Luxury.");
    }
  };

  return (
    <div className="p-3 bg-stone-900/50 rounded-xl border border-stone-800 text-xs">
      <label className="block text-stone-400 mb-1.5 flex items-center gap-1.5">
        <FiTruck className="text-gold" /> Check Dispatch & Courier Serviceability
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit PIN code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          className="bg-stone-800 border border-stone-700 px-3 py-1.5 rounded-lg text-stone-200 w-full outline-none"
        />
        <button onClick={checkDelivery} className="px-3 py-1.5 bg-stone-800 hover:bg-gold hover:text-stone-950 rounded-lg text-stone-300 font-medium">
          Check
        </button>
      </div>
      {result && <p className="mt-2 text-[11px] text-emerald-400">{result}</p>}
    </div>
  );
}
