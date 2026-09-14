import React from "react";
import { FiX, FiPlay } from "react-icons/fi";

export default function VideoShowcaseModal({ isOpen, onClose, videoUrl, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-stone-950 border border-gold/30 rounded-2xl p-4 max-w-xl w-full">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-serif text-gold flex items-center gap-2">
            <FiPlay className="w-4 h-4" /> 360° Artisan Craftsmanship View
          </span>
          <button onClick={onClose}><FiX className="w-5 h-5 text-stone-400 hover:text-white" /></button>
        </div>
        <div className="aspect-video bg-stone-900 rounded-lg flex items-center justify-center text-stone-500 text-xs">
          {videoUrl ? (
            <iframe src={videoUrl} title={title} className="w-full h-full rounded-lg" allowFullScreen />
          ) : (
            <p>High-definition 4K jewellery inspection video available in studio.</p>
          )}
        </div>
      </div>
    </div>
  );
}
