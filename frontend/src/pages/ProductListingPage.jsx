import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiGrid, FiList, FiX, FiChevronDown, FiSliders } from "react-icons/fi";
import ProductCard from "../components/products/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/mockData";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "popularity", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const OCCASIONS = ["Wedding", "Reception", "Haldi", "Mehendi", "Festival", "Traditional", "Casual"];
const COLORS = ["Gold", "Silver", "Rose Gold", "Yellow", "Multi"];

export default function ProductListingPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    occasion: [],
    color: [],
    availability: "all",
    type: "all",
  });

  const category = slug ? CATEGORIES.find((c) => c.slug === slug) : null;

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key])
        ? prev[key].includes(value)
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value]
        : value,
    }));
  };

  const filteredProducts = useMemo(() => {
    let items = [...PRODUCTS];

    if (slug) items = items.filter((p) => p.category === slug);
    if (query) items = items.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    );
    if (filters.occasion.length) items = items.filter((p) => filters.occasion.includes(p.occasion));
    if (filters.color.length) items = items.filter((p) => filters.color.includes(p.color));
    if (filters.priceMin) items = items.filter((p) => p.sellingPrice >= Number(filters.priceMin));
    if (filters.priceMax) items = items.filter((p) => p.sellingPrice <= Number(filters.priceMax));
    if (filters.availability === "rental") items = items.filter((p) => p.isRentalAvailable);
    if (filters.availability === "instock") items = items.filter((p) => p.availableQty > 0);

    switch (sortBy) {
      case "price-asc": items.sort((a, b) => a.sellingPrice - b.sellingPrice); break;
      case "price-desc": items.sort((a, b) => b.sellingPrice - a.sellingPrice); break;
      case "rating": items.sort((a, b) => b.rating - a.rating); break;
      case "popularity": items.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return items;
  }, [slug, query, filters, sortBy]);

  const clearFilters = () => {
    setFilters({ priceMin: "", priceMax: "", occasion: [], color: [], availability: "all", type: "all" });
  };

  const hasActiveFilters = filters.occasion.length || filters.color.length ||
    filters.priceMin || filters.priceMax || filters.availability !== "all";

  return (
    <>
      <Helmet>
        <title>
          {category ? `${category.name} | Mayleki Jewellery` : query ? `Search: "${query}" | Mayleki` : "All Collections | Mayleki Jewellery"}
        </title>
        <meta name="description" content={`Browse ${category?.name || "all"} jewellery at Mayleki. Premium imitation and bridal jewellery in Rahuri, Maharashtra.`} />
      </Helmet>

      <div className="page-wrapper">
        {/* Page Header */}
        <div className="bg-dark-brown py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative text-center">
            {category ? (
              <>
                <p className="section-subtitle mb-2">{category.icon} Collection</p>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
                  {category.name}
                </h1>
                <p className="font-poppins text-sm text-gray-400 mt-2">
                  {category.count} designs available
                </p>
              </>
            ) : query ? (
              <>
                <p className="section-subtitle mb-2">Search Results</p>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-cream">
                  Results for "<span className="text-gold">{query}</span>"
                </h1>
                <p className="font-poppins text-sm text-gray-400 mt-2">
                  {filteredProducts.length} products found
                </p>
              </>
            ) : (
              <>
                <p className="section-subtitle mb-2">Explore Our</p>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
                  All <span className="text-gold-gradient">Collections</span>
                </h1>
              </>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white dark:bg-dark-brown-light border-b border-gold/10">
          <div className="container-luxury py-3">
            <nav className="flex items-center gap-2 font-poppins text-sm text-gray-400">
              <a href="/" className="hover:text-gold transition-colors">Home</a>
              <span>/</span>
              {category ? (
                <span className="text-dark-brown dark:text-cream font-medium">{category.name}</span>
              ) : (
                <span className="text-dark-brown dark:text-cream font-medium">All Collections</span>
              )}
            </nav>
          </div>
        </div>

        <div className="container-luxury py-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-poppins text-sm font-medium transition-all duration-200 ${
                  filtersOpen || hasActiveFilters
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gray-200 text-dark-brown hover:border-gold hover:text-gold"
                }`}
              >
                <FiSliders className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 rounded-full bg-gold text-dark-brown text-xs font-bold flex items-center justify-center">
                    {filters.occasion.length + filters.color.length + (filters.priceMin ? 1 : 0) + (filters.availability !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm font-poppins text-red-500 hover:text-red-600"
                >
                  <FiX className="w-3.5 h-3.5" /> Clear all
                </button>
              )}

              <span className="font-poppins text-sm text-gray-400 hidden sm:block">
                {filteredProducts.length} products
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-brown-light font-poppins text-sm text-dark-brown dark:text-cream focus:outline-none focus:border-gold cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-gold text-dark-brown" : "bg-white dark:bg-dark-brown-light text-gray-400 hover:text-gold"}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-gold text-dark-brown" : "bg-white dark:bg-dark-brown-light text-gray-400 hover:text-gold"}`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 overflow-hidden"
                >
                  <div className="w-[260px] bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 p-5 space-y-6">

                    {/* Price Range */}
                    <div>
                      <h4 className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream mb-3">Price Range (₹)</h4>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceMin}
                          onChange={(e) => setFilters(p => ({ ...p, priceMin: e.target.value }))}
                          className="input-luxury text-xs py-2"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceMax}
                          onChange={(e) => setFilters(p => ({ ...p, priceMax: e.target.value }))}
                          className="input-luxury text-xs py-2"
                        />
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <h4 className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream mb-3">Availability</h4>
                      <div className="space-y-2">
                        {[{ value: "all", label: "All Items" }, { value: "instock", label: "In Stock" }, { value: "rental", label: "Rental Available" }].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${
                              filters.availability === opt.value ? "border-gold bg-gold" : "border-gray-300 group-hover:border-gold"
                            }`}>
                              {filters.availability === opt.value && <span className="text-dark-brown text-[8px]">✓</span>}
                            </div>
                            <input
                              type="radio"
                              className="hidden"
                              value={opt.value}
                              checked={filters.availability === opt.value}
                              onChange={() => setFilters(p => ({ ...p, availability: opt.value }))}
                            />
                            <span className="font-poppins text-sm text-dark-brown dark:text-cream">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <h4 className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream mb-3">Occasion</h4>
                      <div className="flex flex-wrap gap-2">
                        {OCCASIONS.map((occ) => (
                          <button
                            key={occ}
                            onClick={() => updateFilter("occasion", occ)}
                            className={`px-3 py-1.5 rounded-full text-xs font-poppins font-medium transition-all duration-200 ${
                              filters.occasion.includes(occ)
                                ? "bg-gold text-dark-brown"
                                : "bg-gray-100 dark:bg-white/10 text-gray-500 hover:bg-gold/10 hover:text-gold"
                            }`}
                          >
                            {occ}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color */}
                    <div>
                      <h4 className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream mb-3">Color</h4>
                      <div className="flex flex-wrap gap-2">
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() => updateFilter("color", color)}
                            className={`px-3 py-1.5 rounded-full text-xs font-poppins font-medium transition-all duration-200 ${
                              filters.color.includes(color)
                                ? "bg-gold text-dark-brown"
                                : "bg-gray-100 dark:bg-white/10 text-gray-500 hover:bg-gold/10 hover:text-gold"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-6xl mb-4 block">💎</span>
                  <h3 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream mb-2">
                    No products found
                  </h3>
                  <p className="font-poppins text-sm text-gray-400 mb-6">
                    Try adjusting your filters or search query.
                  </p>
                  <button onClick={clearFilters} className="btn-gold">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
