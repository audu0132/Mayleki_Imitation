import React from 'react';

export default function CustomerSupportFloatingBtn() {
  const whatsappUrl = 'https://wa.me/919876543210?text=Hi%20Mayleki%20Jewellery,%20I%20need%20assistance%20with%20a%20bridal%20rental.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mayleki Jewellery Concierge on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 transition-transform font-sans text-sm font-medium"
    >
      <span className="text-lg">💬</span>
      <span className="hidden sm:inline">Bridal Concierge</span>
    </a>
  );
}
