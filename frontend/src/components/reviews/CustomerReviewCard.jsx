import React from "react";
import { FiCheckCircle, FiStar } from "react-icons/fi";

export default function CustomerReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-stone-200 text-sm">{review.author}</span>
          <div className="flex text-amber-400">
            {[...Array(review.rating || 5)].map((_, i) => (
              <FiStar key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-xs text-stone-400 italic leading-relaxed mb-3">"{review.comment}"</p>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
        <FiCheckCircle className="w-3.5 h-3.5" />
        <span>Verified Bridal Rental • {review.city || "Mumbai"}</span>
      </div>
    </div>
  );
}
