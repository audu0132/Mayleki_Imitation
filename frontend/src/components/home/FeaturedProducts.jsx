import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS } from "../../data/mockData";
import ProductCard from "../products/ProductCard";
import ScrollReveal from "../common/ScrollReveal";

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Necklaces", "Earrings", "Bridal", "Traditional"];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Necklaces")
      return p.category.includes("necklace") || p.category.includes("saaj");
    if (activeFilter === "Earrings")
      return p.category.includes("earrings") || p.category.includes("jhumkas");
    if (activeFilter === "Bridal") return p.category.includes("bridal");
    if (activeFilter === "Traditional")
      return p.category.includes("maharashtrian") || p.category.includes("temple");
    return true;
  }).slice(0, 7);

  return (
    <section className="py-section bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-14">
            <span className="section-eyebrow">Curated Pieces</span>
            <h2 className="section-heading section-heading-lg mb-10">
              The Collection
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-1 relative ${
                    activeFilter === filter
                      ? "text-charcoal after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-champagne"
                      : "text-text-secondary hover:text-charcoal"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Product Grid — Asymmetric */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 items-start"
          >
            {/* Large Featured Card */}
            {filteredProducts[0] && (
              <div className="col-span-2 md:col-span-7">
                <ProductCard product={filteredProducts[0]} featured={true} />
              </div>
            )}

            {/* Two Stacked Cards */}
            <div className="col-span-2 md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
              {filteredProducts[1] && <ProductCard product={filteredProducts[1]} />}
              {filteredProducts[2] && <ProductCard product={filteredProducts[2]} />}
            </div>

            {/* Row 2 — Three Cards */}
            {filteredProducts.slice(3, 6).map((product) => (
              <div key={product.id} className="col-span-1 md:col-span-4">
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Link */}
        <div className="text-center mt-16">
          <Link to="/products" className="btn-ghost-luxury">
            Explore Complete Collection →
          </Link>
        </div>
      </div>
    </section>
  );
}
