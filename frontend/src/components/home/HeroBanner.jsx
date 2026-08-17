import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#FAF7F2] dark:bg-[#141110] flex flex-col justify-between pt-8 pb-12">
      
      {/* Background Subtle Line Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="max-w-7xl mx-auto h-full border-x border-[#C5A059]/20 flex justify-between">
          <div className="w-px h-full bg-[#C5A059]/10 hidden md:block" />
          <div className="w-px h-full bg-[#C5A059]/10 hidden lg:block" />
        </div>
      </div>

      {/* Main Editorial Hero Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* LEFT: EDITORIAL TYPOGRAPHY & CTAs (7 Cols) */}
          <div className="lg:col-span-7 z-20 pr-0 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#C5A059] uppercase block mb-4">
                MAYLEKI IMITATION BOUTIQUE
              </span>

              <h1 className="font-cormorant text-5xl sm:text-7xl lg:text-8xl font-normal text-[#1C1917] dark:text-[#FAF7F2] leading-[0.95] tracking-tight mb-6">
                Tradition,<br />
                <span className="italic font-serif text-[#4A0E17] dark:text-[#E88090]">Reimagined.</span>
              </h1>

              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed font-light mb-10">
                High-end Maharashtrian bridal sets, authentic Kolhapuri saaj, Kundan necklaces, and affordable rental jewellery crafted for your special moments.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/products"
                  className="btn-gold text-xs px-8 py-4 flex items-center gap-2 group"
                >
                  <span>EXPLORE COLLECTION</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  to="/rental-booking"
                  className="btn-gold-outline text-xs px-8 py-4 border border-[#C5A059]"
                >
                  BOOK JEWELLERY
                </Link>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: DOMINANT OVERLAPPING IMAGE WITH VERTICAL TYPOGRAPHY (5 Cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-full max-w-lg mx-auto lg:max-w-none"
            >
              {/* Vertical Text running along image edge */}
              <div className="hidden sm:block absolute -left-8 top-1/2 -translate-y-1/2 z-20 writing-mode-vertical rotate-180">
                <span className="font-sans text-[9px] font-semibold tracking-[0.4em] uppercase text-[#C5A059] whitespace-nowrap">
                  CRAFTED FOR YOUR MOMENTS
                </span>
              </div>

              {/* Dominant Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden border border-[#C5A059]/30 bg-[#1C1917] lg:translate-x-4 group">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1000&q=85"
                  alt="Royal Kundan Bridal Jewellery Set"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/60 via-transparent to-transparent" />
                
                {/* Image Overlay Tag */}
                <div className="absolute bottom-6 left-6 right-6 border-t border-[#C5A059]/30 pt-3 flex justify-between items-baseline">
                  <span className="font-cormorant text-xl text-[#FAF7F2]">Royal Kundan Set</span>
                  <span className="font-sans text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">Bridal Collection</span>
                </div>
              </div>

              {/* Decorative Gold Frame Outline Behind */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C5A059]/40 pointer-events-none hidden sm:block -z-10" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between z-20">
        <div className="flex items-center gap-3 font-sans text-[10px] font-semibold tracking-[0.25em] text-gray-500 uppercase">
          <span className="w-8 h-px bg-[#C5A059]" />
          <span>RAHURI, MAHARASHTRA</span>
        </div>

        <a href="#statement" className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase hover:text-[#9E7B32] transition-colors">
          <span>SCROLL TO DISCOVER</span>
          <FiChevronDown className="w-4 h-4 animate-bounce text-[#C5A059]" />
        </a>
      </div>

    </section>
  );
}
