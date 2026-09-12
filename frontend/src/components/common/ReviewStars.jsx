import React from 'react';

export default function ReviewStars({ rating = 5, totalStars = 5, onChange, editable = false }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= Math.round(rating);

        return (
          <button
            key={index}
            type="button"
            disabled={!editable}
            onClick={() => editable && onChange && onChange(starIndex)}
            className={`text-lg transition-transform ${
              editable ? 'hover:scale-125 cursor-pointer' : 'cursor-default'
            } ${isFilled ? 'text-[#D4AF37]' : 'text-gray-400'}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
