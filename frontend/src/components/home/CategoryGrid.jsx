import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const CATEGORY_ITEMS = [
  {
    name: "BRIDAL",
    slug: "bridal-sets",
    count: "48 Designs",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1000&q=80",
  },
  {
    name: "MAHARASHTRIAN",
    slug: "maharashtrian",
    count: "32 Designs",
    image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=1000&q=80",
  },
  {
    name: "NECKLACES",
    slug: "necklace-sets",
    count: "64 Designs",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&q=80",
  },
  {
    name: "EARRINGS",
    slug: "earrings",
    count: "78 Designs",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80",
  },
  {
    name: "BANGLES",
    slug: "bangles",
    count: "56 Designs",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=1000&q=80",
  },
  {
    name: "NATH",
    slug: "nath",
    count: "22 Designs",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1000&q=80",
  },
  {
    name: "SETS",
    slug: "kolhapuri-saaj",
    count: "35 Designs",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1000&q=80",
  },
];

export default function CategoryGrid() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative py-24 lg:py-36 bg-[#1C1917] text-[#FAF7F2] overflow-hidden border-b border-[#C5A059]/30">
      
      {/* Dynamic Background Image Reveal on Hover */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={CATEGORY_ITEMS[activeIdx].image}
            alt={CATEGORY_ITEMS[activeIdx].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-[#1C1917]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#C5A059]/20">
          <div>
            <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-2">
              𑁍 EXPLORE BY CATEGORY
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#FAF7F2]">
              Select Your Aesthetic
            </h2>
          </div>
          <p className="font-sans text-xs text-gray-400 font-light mt-3 md:mt-0 tracking-wider">
            Hover over categories to preview curated designs
          </p>
        </div>

        {/* Interactive Text Category List */}
        <div className="space-y-4 sm:space-y-6">
          {CATEGORY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.name}
              onMouseEnter={() => setActiveIdx(idx)}
              className="border-b border-[#C5A059]/15 pb-4 sm:pb-6 group"
            >
              <Link
                to={`/category/${item.slug}`}
                className="flex items-center justify-between transition-all duration-300"
              >
                <div className="flex items-baseline gap-6 sm:gap-12">
                  <span className="font-sans text-xs text-[#C5A059] font-mono opacity-60">
                    0{idx + 1}
                  </span>
                  <span className="font-cormorant text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FAF7F2]/80 group-hover:text-[#C5A059] group-hover:translate-x-3 transition-all duration-300 tracking-tight">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block font-sans text-xs text-gray-400 font-light tracking-widest uppercase">
                    {item.count}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#1C1917] transition-all duration-300">
                    <FiArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
