import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecentlyViewedProducts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("mayleki_recent") || "[]");
      setItems(stored.slice(0, 4));
    } catch {}
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="my-8 pt-6 border-t border-stone-800">
      <h4 className="font-serif text-sm text-gold mb-4">Recently Viewed Pieces</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => (
          <Link key={item.id} to={`/products/${item.id}`} className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-gold/40 text-xs">
            <p className="font-medium text-stone-300 truncate">{item.name}</p>
            <p className="text-gold mt-1">₹{item.price}/day</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
