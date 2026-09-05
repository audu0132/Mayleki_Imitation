import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../../data/mockData";

const POPULAR_SEARCHES = [
  "Bridal Sets",
  "Kolhapuri Saaj",
  "Kundan",
  "Nath",
  "Jhumkas",
  "Temple Jewellery",
  "Rental",
  "Bangles",
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
    if (!isOpen) setQuery("");
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  const trendingProducts = PRODUCTS.filter((p) => p.trending).slice(0, 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleQuickSearch = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="search-overlay"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center text-charcoal hover:text-champagne transition-colors"
            aria-label="Close search"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="w-full max-w-2xl mx-auto px-6">
            {/* Search Input */}
            <form onSubmit={handleSubmit} className="relative mb-12">
              <div className="flex items-center gap-4">
                <FiSearch className="w-5 h-5 text-champagne flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jewellery..."
                  className="search-input-luxury"
                  autoComplete="off"
                />
              </div>
            </form>

            {/* Live Suggestions */}
            <AnimatePresence mode="wait">
              {suggestions.length > 0 ? (
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 mb-12"
                >
                  <span className="font-body text-eyebrow font-semibold uppercase text-champagne tracking-widest">
                    Suggestions
                  </span>
                  <div className="space-y-1">
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 py-3 border-b border-champagne/10 hover:bg-champagne/5 transition-colors px-2 -mx-2 group"
                      >
                        <div className="w-12 h-14 flex-shrink-0 bg-ivory-200 overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-charcoal group-hover:text-champagne transition-colors truncate">
                            {product.title}
                          </p>
                          <p className="font-body text-xs text-text-secondary capitalize">
                            {product.category.replace(/-/g, " ")}
                          </p>
                        </div>
                        <span className="font-body text-sm font-semibold text-charcoal">
                          ₹{(product.sellingPrice - (product.sellingPrice * (product.discount || 0)) / 100).toLocaleString("en-IN")}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Popular Searches */}
                  <div className="mb-12">
                    <span className="font-body text-eyebrow font-semibold uppercase text-champagne tracking-widest block mb-4">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleQuickSearch(term)}
                          className="px-4 py-2 border border-champagne/20 font-body text-xs font-medium text-charcoal hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-all duration-300"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending Products */}
                  <div>
                    <span className="font-body text-eyebrow font-semibold uppercase text-champagne tracking-widest block mb-4">
                      Trending Now
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {trendingProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.slug}`}
                          onClick={onClose}
                          className="group"
                        >
                          <div className="aspect-product bg-ivory-200 overflow-hidden mb-2">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <p className="font-body text-xs font-medium text-charcoal group-hover:text-champagne transition-colors truncate">
                            {product.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
