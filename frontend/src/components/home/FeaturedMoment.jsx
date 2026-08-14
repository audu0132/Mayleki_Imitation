import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedMoment() {
  return (
    <section className="relative py-24 lg:py-36 bg-[#1C1917] text-[#FAF7F2] overflow-hidden border-b border-[#C5A059]/30">
      
      {/* Fine Gold Line Artwork Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full border-t border-b border-[#C5A059] my-auto scale-y-95" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: LARGE CINEMATIC JEWELLERY IMAGE (6 Cols) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[4/5] overflow-hidden border border-[#C5A059]/40 shadow-2xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&q=85"
                alt="Limited Collection Royal Necklace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* RIGHT: CINEMATIC CONTENT (6 Cols) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl"
            >
              <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-3">
                𑁍 LIMITED COLLECTION
              </span>

              <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#FAF7F2] leading-[1.05] tracking-tight mb-6">
                Designed to be<br />
                <span className="italic text-[#E5C88A]">remembered.</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-10 tracking-wide">
                An exclusive limited-edition bridal piece handcrafted with 1GM gold polish, antique rubies, and intricate freshwater pearls. Engineered to make your grand wedding entry truly unforgettable.
              </p>

              <div className="flex items-center gap-8">
                <Link
                  to="/products/traditional-kolhapuri-saaj"
                  className="btn-gold text-xs px-8 py-4 flex items-center gap-2 group"
                >
                  <span>VIEW PIECE</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="hidden sm:block">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#C5A059] block">Rental Rate</span>
                  <span className="font-cormorant text-2xl font-bold text-[#FAF7F2]">₹450 / Day</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}
