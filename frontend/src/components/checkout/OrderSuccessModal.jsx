import React from 'react';

export default function OrderSuccessModal({ isOpen, orderId, onExploreMore }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#FAF7F2] dark:bg-[#181413] border border-[#D4AF37]/50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-3xl animate-bounce">
          👑
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#D4AF37]">Reservation Confirmed!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-sans">
          Your regal jewellery set is reserved. Order ID: <span className="font-mono font-bold text-[#D4AF37]">{orderId || 'MYL-2026-9812'}</span>
        </p>
        <p className="text-xs text-gray-500 mt-3">
          A confirmation SMS and calendar reminder have been sent to your registered contact.
        </p>
        <button
          onClick={onExploreMore}
          className="mt-6 w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B38F28] text-black font-semibold rounded-lg shadow-lg hover:opacity-95 transition-opacity"
        >
          Continue Exploring Catalog
        </button>
      </div>
    </div>
  );
}
