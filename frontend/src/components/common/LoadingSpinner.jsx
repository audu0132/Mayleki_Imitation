import React from "react";

export default function LoadingSpinner({ size = "md", text = "Loading elegance..." }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3" role="status" aria-label="Loading">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-amber-200/30 border-t-amber-500 animate-spin`}
      />
      {text && (
        <p className="text-xs tracking-widest text-amber-300 uppercase font-light animate-pulse">
          {text}
        </p>
      )}
      <span className="sr-only">Loading content</span>
    </div>
  );
}
