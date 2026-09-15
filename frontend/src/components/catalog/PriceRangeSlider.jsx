import React from "react";

export default function PriceRangeSlider({ min = 300, max = 5000, value, onChange }) {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between text-stone-400">
        <span>Daily Rental Budget</span>
        <span className="text-gold font-medium">Up to ₹{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
      />
    </div>
  );
}
