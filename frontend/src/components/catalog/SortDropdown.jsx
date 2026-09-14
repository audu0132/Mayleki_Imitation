import React from "react";

export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort jewellery collection"
      className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-2 focus:border-gold outline-none"
    >
      <option value="featured">Featured & Curated</option>
      <option value="price_asc">Rental Rate: Low to High</option>
      <option value="price_desc">Rental Rate: High to Low</option>
      <option value="rating">Highest Rated</option>
      <option value="newest">Latest Arrivals</option>
    </select>
  );
}
