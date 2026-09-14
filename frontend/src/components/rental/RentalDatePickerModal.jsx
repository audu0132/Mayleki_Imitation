import React, { useState } from "react";
import { FiCalendar, FiCheck } from "react-icons/fi";

export default function RentalDatePickerModal({ isOpen, onClose, onSelectDates }) {
  const [start, setStart] = useState("");
  const [days, setDays] = useState(3);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!start) return;
    onSelectDates({ startDate: start, durationDays: Number(days) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-stone-900 border border-gold/30 rounded-xl p-6 max-w-md w-full">
        <h3 className="font-serif text-lg text-gold mb-4 flex items-center gap-2">
          <FiCalendar className="w-5 h-5" /> Select Rental Dates
        </h3>
        <div className="space-y-4 text-sm text-stone-300">
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1 text-stone-400">Wedding / Event Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-stone-100"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1 text-stone-400">Rental Duration</label>
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-stone-100"
            >
              <option value={3}>3 Days (Recommended for Weekend Weddings)</option>
              <option value={5}>5 Days (Destination Weddings)</option>
              <option value={7}>7 Days (Full Bridal Week)</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="mt-6 w-full py-2.5 bg-gold text-stone-950 font-medium rounded-lg text-xs uppercase tracking-wider hover:bg-gold/90 transition-colors"
        >
          Confirm Rental Dates
        </button>
      </div>
    </div>
  );
}
