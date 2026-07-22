import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiMessageCircle } from "react-icons/fi";

const WA_NUMBER = "919876543210";
const WA_DEFAULT_MSG = "Hi! I'm interested in your jewellery collection at Mayleki. Can you help me?";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [open, setOpen] = useState(false);

  const quickMessages = [
    { label: "Browse Collection", msg: "Hi! I'd like to browse your jewellery collection." },
    { label: "Bridal Set Inquiry", msg: "Hi! I'm looking for a bridal jewellery set. Can you help?" },
    { label: "Rental Info", msg: "Hi! I want to know about jewellery rental. What are the charges and process?" },
    { label: "Custom Order", msg: "Hi! I want to place a custom order. Can you assist?" },
    { label: "Track My Order", msg: "Hi! I want to track my order. Can you help?" },
  ];

  const handleMessage = (msg) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick message panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="bg-white rounded-2xl shadow-luxury border border-gold/10 overflow-hidden w-72"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-poppins font-semibold text-white text-sm">Mayleki Jewellery</p>
                <p className="font-poppins text-xs text-green-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                  Online · Usually replies instantly
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/80 hover:text-white">
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Message bubble */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100 max-w-[90%]">
                <p className="font-poppins text-sm text-dark-brown leading-relaxed">
                  👋 Hello! Welcome to <strong>Mayleki Jewellery</strong>.<br />
                  How can we help you today?
                </p>
              </div>
            </div>

            {/* Quick replies */}
            <div className="p-4 space-y-2">
              <p className="font-poppins text-xs text-gray-400 mb-2">Quick inquiries:</p>
              {quickMessages.map((qm) => (
                <button
                  key={qm.label}
                  onClick={() => handleMessage(qm.msg)}
                  className="w-full text-left px-3 py-2 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 font-poppins text-sm text-dark-brown transition-all duration-200"
                >
                  {qm.label}
                </button>
              ))}
              <button
                onClick={() => handleMessage(WA_DEFAULT_MSG)}
                className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-poppins font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-4 h-4" />
                Start Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-colors duration-200 animate-gold-pulse"
        style={{ animation: "none", boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.4)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <FiX className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FaWhatsapp className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 whitespace-nowrap bg-dark-brown text-cream text-xs font-poppins font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none"
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
