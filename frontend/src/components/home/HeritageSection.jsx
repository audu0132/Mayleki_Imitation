import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function HeritageSection() {
  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: STORYTELLING CONTENT (6 Cols) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-3">
                𑁍 MAHARASHTRIAN HERITAGE
              </span>

              <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#1C1917] dark:text-[#FAF7F2] leading-[1.08] mb-6">
                Rooted in Tradition.<br />
                <span className="italic font-serif text-[#4A0E17] dark:text-[#E88090]">Styled for Today.</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6">
                For generations, Maharashtrian jewellery has symbolized royal poise and timeless grace. At Mayleki Rahuri, we preserve centuries-old motifs — from the golden beads of the Kolhapuri Saaj to the regal curve of the Brahmani Nath — re-imagined for modern celebrations.
              </p>

              <div className="w-16 h-px bg-[#C5A059] mb-8" />

              <Link
                to="/about"
                className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-1 group"
              >
                <span>DISCOVER OUR HERITAGE</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#C5A059]" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: EDITORIAL HERITAGE IMAGE (6 Cols) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative aspect-[4/5] overflow-hidden border border-[#C5A059]/30 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85"
                alt="Traditional Maharashtrian Nath & Jewellery"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 via-transparent to-transparent" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
