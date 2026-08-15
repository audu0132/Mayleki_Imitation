import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../../data/mockData";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Necklaces", "Earrings", "Bridal", "Traditional"];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Necklaces") return p.category.includes("necklace") || p.category.includes("saaj");
    if (activeFilter === "Earrings") return p.category.includes("earrings") || p.category.includes("jhumkas");
    if (activeFilter === "Bridal") return p.category.includes("bridal");
    if (activeFilter === "Traditional") return p.category.includes("maharashtrian") || p.category.includes("temple");
    return true;
  }).slice(0, 7);

  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Title & Refined Filter Bar */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-2">
            𑁍 CURATED PIECES
          </span>
          <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#1C1917] dark:text-[#FAF7F2] mb-8">
            The Collection
          </h2>

          <div className="flex items-center justify-center gap-6 sm:gap-10 border-b border-[#C5A059]/20 pb-3 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors pb-1 relative ${
                  activeFilter === filter
                    ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                    : "text-gray-500 dark:text-gray-400 hover:text-[#C5A059]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Rhythm Grid (Large | Small | Medium) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            {/* Column 1: Large Featured Card (Span 7) */}
            {filteredProducts[0] && (
              <div className="md:col-span-7">
                <ProductCard product={filteredProducts[0]} featured={true} />
              </div>
            )}

            {/* Column 2: Two Medium Stacked Cards (Span 5) */}
            <div className="md:col-span-5 space-y-8">
              {filteredProducts[1] && <ProductCard product={filteredProducts[1]} />}
              {filteredProducts[2] && <ProductCard product={filteredProducts[2]} />}
            </div>

            {/* Row 2: Three Balanced Cards */}
            {filteredProducts.slice(3, 6).map((product) => (
              <div key={product.id} className="md:col-span-4">
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Editorial Link */}
        <div className="text-center mt-20">
          <Link
            to="/products"
            className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-1"
          >
            EXPLORE COMPLETE CATALOGUE →
          </Link>
        </div>

      </div>
    </section>
  );
}
