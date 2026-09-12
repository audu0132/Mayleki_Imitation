import React from 'react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const bangleSizes = [
    { size: '2-4', innerDiameter: '2.25 inches (57.2 mm)', fit: 'Small / Petite wrists' },
    { size: '2-6', innerDiameter: '2.37 inches (60.3 mm)', fit: 'Medium (Most Popular)' },
    { size: '2-8', innerDiameter: '2.50 inches (63.5 mm)', fit: 'Large / Comfort fit' },
    { size: '2-10', innerDiameter: '2.62 inches (66.7 mm)', fit: 'Extra Large' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#D4AF37]/40 rounded-xl p-6 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/20">
          <h3 className="font-serif text-lg font-bold text-[#D4AF37]">Bangle & Jewellery Sizing Guide</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#D4AF37]/30 text-[#D4AF37]">
                <th className="py-2">Indian Size</th>
                <th className="py-2">Inner Diameter</th>
                <th className="py-2">Wrist Fit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              {bangleSizes.map((row) => (
                <tr key={row.size}>
                  <td className="py-2.5 font-semibold">{row.size}</td>
                  <td className="py-2.5">{row.innerDiameter}</td>
                  <td className="py-2.5">{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#c49f2e] transition-colors"
        >
          Close Guide
        </button>
      </div>
    </div>
  );
}
