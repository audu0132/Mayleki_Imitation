import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { PRODUCTS } from "../../data/mockData";
import ProductCard from "../products/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.95 }
};

export default function FeaturedBridal() {
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
    <section className="py-24 bg-white">
      <div className="container-luxury">
        {/* Header & Filters */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="section-title text-center">
              Curated Pieces
            </h2>
            <p className="section-description text-center">
              Explore our most loved and trending jewellery pieces, perfect for every occasion.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 overflow-x-auto pb-2 scrollbar-hide w-full max-w-full">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-poppins text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors pb-1 border-b ${
                  activeFilter === filter
                    ? "text-dark-brown border-dark-brown"
                    : "text-gray-400 border-transparent hover:text-dark-brown"
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
          className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-6 gap-y-12 w-full justify-center"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          {hasMore && (
            <button
              onClick={() => setShowAll(true)}
              className="font-poppins text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-dark-brown transition-colors border-b border-transparent hover:border-dark-brown pb-1"
            >
              Load More ({allFiltered.length - 8})
            </button>
          )}
          <Link 
            to="/products" 
            className="font-poppins text-xs font-medium uppercase tracking-widest text-dark-brown hover:text-gold transition-colors border-b border-dark-brown hover:border-gold pb-1"
          >
            Discover All
          </Link>
        </div>
      </div>
    </section>
  );
}

