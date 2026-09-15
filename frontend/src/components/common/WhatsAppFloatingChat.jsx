import React from "react";
import { FiMessageCircle } from "react-icons/fi";

export default function WhatsAppFloatingChat({ phoneNumber = "919876543210" }) {
  const handleClick = () => {
    const text = encodeURIComponent("Namaste Mayleki, I am inquiring about bridal jewellery rental for my upcoming celebration.");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl transition-transform hover:scale-105"
    >
      <FiMessageCircle className="w-5 h-5" />
    </button>
  );
}
