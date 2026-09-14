import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

export default function BridalConsultationBanner() {
  return (
    <section className="my-12 p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-gold/30 text-center relative overflow-hidden">
      <h3 className="font-serif text-2xl text-gold mb-2">Need a 1-on-1 Bridal Jewellery Consultation?</h3>
      <p className="text-xs text-stone-300 max-w-lg mx-auto mb-6 leading-relaxed">
        Connect with our senior bridal stylists via video call or visit our Pune heritage studio for personalized lehenga matching.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-stone-950 text-xs font-semibold uppercase tracking-wider hover:bg-gold/90 transition-colors"
      >
        <FiCalendar className="w-4 h-4" /> Schedule Complimentary Session
      </Link>
    </section>
  );
}
