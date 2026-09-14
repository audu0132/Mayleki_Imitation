import React from "react";
import { FiCheck } from "react-icons/fi";

export default function OrderTrackingProgress({ currentStep = 2 }) {
  const steps = ["Order Placed", "Sanitized & Packed", "Dispatched", "Delivered", "Returned & Refunded"];

  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-800 -translate-y-1/2 z-0" />
        {steps.map((label, idx) => {
          const isDone = idx <= currentStep;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${isDone ? "bg-gold text-stone-950 font-bold" : "bg-stone-800 text-stone-500"}`}>
                {isDone ? <FiCheck /> : idx + 1}
              </div>
              <span className="text-[10px] text-stone-400 mt-2 text-center max-w-[70px]">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
