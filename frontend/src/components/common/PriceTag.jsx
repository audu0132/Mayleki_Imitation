import React from 'react';

export default function PriceTag({ rentalPrice, retailPrice, days = 3, className = '' }) {
  const discount = retailPrice && rentalPrice
    ? Math.round(((retailPrice - rentalPrice) / retailPrice) * 100)
    : 0;

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-xl font-serif font-bold text-[#D4AF37]">
        ₹{rentalPrice?.toLocaleString('en-IN')}
      </span>
      <span className="text-xs text-gray-500 font-sans tracking-wide">
        / {days} days
      </span>
      {retailPrice && (
        <span className="text-xs text-gray-400 line-through font-sans">
          ₹{retailPrice?.toLocaleString('en-IN')}
        </span>
      )}
      {discount > 0 && (
        <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
          Save {discount}%
        </span>
      )}
    </div>
  );
}
