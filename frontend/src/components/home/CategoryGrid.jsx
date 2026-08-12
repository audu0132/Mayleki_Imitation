import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CATEGORIES } from "../../data/mockData";

export default function CategoryGrid() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <section id="collections" className="py-14 bg-white">
      {/* Section header */}
      <div className="container-luxury mb-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poppins text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-1">
            Discover
          </p>
          <h2 className="font-playfair text-2xl sm:text-3xl text-dark-brown font-normal">
            Shop by Category
          </h2>
        </motion.div>

        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="hidden sm:inline-flex font-poppins text-[10px] font-semibold tracking-[0.15em] uppercase text-dark-brown hover:text-gold transition-colors duration-200 border-b border-dark-brown/30 hover:border-gold pb-0.5"
          >
            View All
          </Link>
          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-[#C9A227] hover:text-[#C9A227] text-gray-400 transition-all duration-200"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-[#C9A227] hover:text-[#C9A227] text-gray-400 transition-all duration-200"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-6 md:px-16 lg:px-24 pb-4"
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
                className="flex flex-col items-center gap-3 group cursor-pointer w-[90px] sm:w-[100px]"
              >
                {/* Circle image */}
                <div className="relative w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#C9A227] transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200";
                    }}
                  />
                  <div className="absolute inset-0 bg-[#C9A227]/0 group-hover:bg-[#C9A227]/10 transition-all duration-300" />
                </div>

                {/* Category name */}
                <span className="font-poppins text-[10px] sm:text-[11px] font-medium text-center text-gray-600 group-hover:text-[#C9A227] transition-colors duration-200 leading-tight w-full">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: View All link */}
      <div className="sm:hidden text-center mt-4">
        <Link
          to="/products"
          className="font-poppins text-[10px] font-semibold tracking-[0.15em] uppercase text-dark-brown hover:text-gold transition-colors duration-200 border-b border-dark-brown/30 hover:border-gold pb-0.5"
        >
          View All Categories
        </Link>
      </div>
    </section>
  );
}
