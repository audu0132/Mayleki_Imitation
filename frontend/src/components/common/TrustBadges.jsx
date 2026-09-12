import React from 'react';

export default function TrustBadges() {
  const badges = [
    { title: 'Artisan Crafted', desc: 'Hand-set kundan and 24K gold plating', icon: '✨' },
    { title: 'Ultra-Sanitized', desc: 'Hospital-grade UV sterilization before dispatch', icon: '🛡️' },
    { title: 'Free Returns', desc: 'Hassle-free doorstep pickup in velvet lockbox', icon: '📦' },
    { title: 'Security Deposit', desc: '100% instant refund upon return inspection', icon: '🔒' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[#D4AF37]/20 my-6">
      {badges.map((b, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-3 rounded-lg bg-[#FAF7F2]/60 dark:bg-[#1C1817]/60">
          <span className="text-2xl mb-1">{b.icon}</span>
          <h4 className="font-serif font-semibold text-sm text-[#2B2321] dark:text-[#F3EDE2]">{b.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}
