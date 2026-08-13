import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CATEGORIES } from "../../data/mockData";

export default function CategoryGrid() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <section id="collections" className="py-16 md:py-20 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A059] font-semibold mb-2">
            𑁍 Curated Collections
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#1C1917] dark:text-[#FAF7F2] font-normal tracking-wide">
            Maharashtrian & Traditional Treasures
          </h2>
        </motion.div>

        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="hidden sm:inline-flex font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-0.5"
          >
            Explore All Collections
          </Link>
          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 flex items-center justify-center border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-white text-[#1C1917] dark:text-[#FAF7F2] transition-all duration-300 rounded-none"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 flex items-center justify-center border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-white text-[#1C1917] dark:text-[#FAF7F2] transition-all duration-300 rounded-none"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex-none"
            >
              <Link
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center group cursor-pointer w-[130px] sm:w-[150px]"
              >
                {/* Circular frame with 1px antique gold ring */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#C5A059]/30 group-hover:border-[#C5A059] transition-all duration-500 shadow-sm p-1 bg-white dark:bg-[#1C1917]">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400";
                      }}
                    />
                    <div className="absolute inset-0 bg-[#4A0E17]/10 group-hover:bg-[#4A0E17]/25 transition-all duration-300 flex items-center justify-center">
                      <span className="text-2xl opacity-80 group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Category Details */}
                <h3 className="font-cormorant text-lg font-medium text-center text-[#1C1917] dark:text-[#FAF7F2] group-hover:text-[#C5A059] transition-colors mt-3 leading-tight">
                  {cat.name}
                </h3>
                <span className="font-sans text-[10px] text-[#C5A059] font-medium tracking-wider uppercase mt-0.5">
                  {cat.count || 24}+ Designs
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile view link */}
      <div className="sm:hidden text-center mt-4">
        <Link
          to="/products"
          className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-0.5"
        >
          View All Categories
        </Link>
      </div>
    </section>
  );
}
