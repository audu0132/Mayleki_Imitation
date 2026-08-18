import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-44 bg-[#1C1917] text-[#FAF7F2] overflow-hidden border-b border-[#C5A059]/30">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=1920&q=85"
          alt="Mayleki Final Luxury CTA"
          className="w-full h-full object-cover object-center opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#4A0E17]/60 to-[#1C1917]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="font-sans text-[10px] font-semibold tracking-[0.4em] uppercase text-[#C5A059] block mb-4">
            𑁍 MAYLEKI BOUTIQUE
          </span>

          <h2 className="font-cormorant text-5xl sm:text-7xl lg:text-8xl font-normal text-[#FAF7F2] leading-[0.95] tracking-tight mb-8">
            Your moment deserves<br />
            <span className="italic font-serif text-[#E5C88A]">something unforgettable.</span>
          </h2>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-10" />

          <Link
            to="/products"
            className="btn-gold text-xs px-10 py-4.5 inline-flex items-center gap-3 group shadow-xl"
          >
            <span>EXPLORE THE COLLECTION</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
