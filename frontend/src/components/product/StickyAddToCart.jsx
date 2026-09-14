import React from "react";
import { FiShoppingBag } from "react-icons/fi";

export default function StickyAddToCart({ product, onRentNow }) {
  if (!product) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-stone-900/95 backdrop-blur-md border-t border-gold/20 p-3 px-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-stone-400">Rental from</p>
        <p className="text-base font-serif text-gold font-semibold">₹{product.price || 799}/day</p>
      </div>
      <button
        onClick={onRentNow}
        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-700 text-stone-950 font-medium rounded-full text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
      >
        <FiShoppingBag className="w-4 h-4" />
        <span>Rent Now</span>
      </button>
    </div>
  );
}
