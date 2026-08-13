import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../../data/mockData";
import ProductCard from "../products/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.95 }
};

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const filters = ["All", "Trending", "Best Sellers", "New Arrivals", "Rental"];

  const allFiltered = PRODUCTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Trending") return p.trending;
    if (activeFilter === "Best Sellers") return p.bestSeller;
    if (activeFilter === "New Arrivals") return p.featured;
    if (activeFilter === "Rental") return p.isRentalAvailable;
    return true;
  });

  const filteredProducts = showAll ? allFiltered : allFiltered.slice(0, 8);
  const hasMore = allFiltered.length > 8 && !showAll;

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] dark:bg-[#1C1917] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filters */}
        <div className="flex flex-col items-center text-center mb-14">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-2">
            𑁍 Handcrafted Perfection
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2] mb-4">
            Curated Jewellery Masterpieces
          </h2>
          <p className="font-sans text-sm text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
            Explore our signature collection of bridal sets, Kolhapuri saaj, Kundan necklaces, and rental jewellery designed for unforgettable moments.
          </p>

          {/* Luxury Tab Filters */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap border-b border-[#C5A059]/20 pb-3 w-full max-w-2xl">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setShowAll(false); }}
                className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-2 px-1 relative ${
                  activeFilter === filter
                    ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                    : "text-[#1C1917]/70 dark:text-[#FAF7F2]/70 hover:text-[#C5A059]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          {hasMore && (
            <button
              onClick={() => setShowAll(true)}
              className="btn-gold-outline text-xs px-8 py-3.5"
            >
              Load More Designs ({allFiltered.length - 8})
            </button>
          )}
          <Link
            to="/products"
            className="btn-wine text-xs px-8 py-3.5 border border-[#C5A059]/30"
          >
            Explore Complete Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
