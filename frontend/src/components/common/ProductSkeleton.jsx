import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="rounded-xl bg-stone-900/60 border border-stone-800 p-4 animate-pulse space-y-3">
      <div className="aspect-square bg-stone-800 rounded-lg" />
      <div className="h-4 bg-stone-800 rounded w-3/4" />
      <div className="h-3 bg-stone-800 rounded w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 bg-stone-800 rounded w-1/4" />
        <div className="h-7 bg-stone-800 rounded-full w-20" />
      </div>
    </div>
  );
}
