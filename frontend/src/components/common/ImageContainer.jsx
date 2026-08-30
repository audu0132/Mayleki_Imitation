import React from "react";

export default function ImageContainer({ src, alt, aspectRatio = "aspect-[3/4]" }) {
  return (
    <div className={`relative overflow-hidden bg-stone-900 ${aspectRatio}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
