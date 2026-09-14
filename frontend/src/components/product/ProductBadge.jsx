import React from "react";

export default function ProductBadge({ type = "trending" }) {
  const styles = {
    trending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    bestseller: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    new: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    rental_popular: "bg-gold/20 text-gold border-gold/40",
  };

  const labels = {
    trending: "🔥 Trending",
    bestseller: "👑 Bestseller",
    new: "✨ New Arrival",
    rental_popular: "💎 Top Rental",
  };

  return (
    <span className={`inline-block text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full border ${styles[type] || styles.trending}`}>
      {labels[type] || type}
    </span>
  );
}
