import React, { useState } from "react";
import { FiX, FiCopy, FiCheck } from "react-icons/fi";

export default function ShareProductModal({ isOpen, onClose, productTitle }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-stone-900 border border-gold/30 rounded-xl p-6 max-w-sm w-full text-stone-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg text-gold">Share this Design</h3>
          <button onClick={onClose}><FiX className="w-5 h-5 text-stone-400 hover:text-stone-100" /></button>
        </div>
        <p className="text-xs text-stone-400 mb-4">{productTitle}</p>
        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 flex items-center justify-center gap-2 text-xs font-medium"
        >
          {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
          <span>{copied ? "Link Copied to Clipboard!" : "Copy Product Link"}</span>
        </button>
      </div>
    </div>
  );
}
