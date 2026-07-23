import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { PRODUCTS } from "../../data/mockData";
import ProductCard from "../products/ProductCard";

export default function FeaturedBridal() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Trending", "Best Sellers", "New Arrivals", "Rental"];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Trending") return p.trending;
    if (activeFilter === "Best Sellers") return p.bestSeller;
    if (activeFilter === "New Arrivals") return p.featured;
    if (activeFilter === "Rental") return p.isRentalAvailable;
    return true;
  });

  return (
    <section className="py-20 bg-white dark:bg-[#1A1414]">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-subtitle mb-3">Handpicked For You</p>
          <h2 className="section-title mb-4">
            Featured <span className="text-gold-gradient">Jewellery</span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="section-description mx-auto">
            Explore our most loved and trending jewellery pieces, perfect for every occasion.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-poppins text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gold text-dark-brown shadow-gold font-semibold"
                  : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="btn-gold text-base px-10 py-4 inline-flex items-center gap-2"
          >
            View All Products <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
