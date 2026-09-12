import React from 'react';

export default function JewelleryCareModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const instructions = [
    'Avoid direct contact with perfumes, hairsprays, sanitizers, and body lotions.',
    'Store each piece individually in the provided velvet pouch to prevent scratches.',
    'Wipe gently with a soft micro-fiber cloth after every wear to maintain shine.',
    'Keep away from water, moisture, and extreme humidity to protect 24K gold polish.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#D4AF37]/40 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/20">
          <h3 className="font-serif text-lg font-bold text-[#D4AF37]">Jewellery Care Guide</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {instructions.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-[#D4AF37] font-bold">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B38F28] text-black font-semibold rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          Got It, Thank You
        </button>
      </div>
    </div>
  );
}
