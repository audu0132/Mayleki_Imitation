import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiHeart, FiShoppingCart, FiShare2, FiZoomIn,
  FiTruck, FiRotateCcw, FiShield,
  FiCalendar, FiStar, FiChevronRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/AppContext";
import { useWishlist } from "../context/AppContext";
import { useRecentlyViewed } from "../context/AppContext";
import { PRODUCTS } from "../data/mockData";
import ProductCard from "../components/products/ProductCard";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("purchase");
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const wishlisted = isWishlisted(product.id);
  const discountedPrice = product.sellingPrice - (product.sellingPrice * (product.discount || 0)) / 100;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  useEffect(() => {
    addRecentlyViewed(product);
    setSelectedImage(0);
    setQty(1);
    window.scrollTo(0, 0);
  }, [product, addRecentlyViewed]);

  const handleAddToCart = () => {
    addToCart(product, qty, activeTab);
    toast.success(`Added to cart!`, {
      icon: "🛒",
      style: { background: "#111111", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
    });
  };

  const handleWhatsApp = () => {
    const price = activeTab === "rental" ? `Rental: ₹${product.rentalPrice}/day` : `Price: ₹${discountedPrice}`;
    const msg = `Hi! I'm interested in "${product.title}" (SKU: ${product.sku}). ${price}. Please provide more details.`;
    window.open(`https://wa.me/919139236500?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.title} | Mayleki Jewellery Boutique</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Helmet>

      <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#111111] text-[#111111] dark:text-[#FFFDF8]">
        {/* COMPACT BREADCRUMB BAR */}
        <div className="bg-[#FFFDF8] dark:bg-[#181818] border-b border-[rgba(212,175,55,0.18)] py-3 sm:py-4">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 font-sans text-xs text-[#A9A9A9] flex-wrap">
              <Link to="/" className="text-[#D4AF37] hover:text-[#E6C76A] transition-colors">Home</Link>
              <FiChevronRight className="w-3 h-3 text-[#A9A9A9]" />
              <Link to="/products" className="text-[#D4AF37] hover:text-[#E6C76A] transition-colors">Collections</Link>
              <FiChevronRight className="w-3 h-3 text-[#A9A9A9]" />
              <Link to={`/category/${product.category}`} className="text-[#D4AF37] hover:text-[#E6C76A] transition-colors capitalize">
                {product.category.replace(/-/g, " ")}
              </Link>
              <FiChevronRight className="w-3 h-3 text-[#A9A9A9]" />
              <span className="text-[#111111] dark:text-[#FFFDF8] font-medium truncate max-w-[200px] sm:max-w-xs">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* MAIN PRODUCT SECTION CONTAINER */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-start">

            {/* ===== LEFT COLUMN: Image Gallery ===== */}
            <div className="space-y-3.5">
              {/* Main Image */}
              <div
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-[#181818] border border-[rgba(212,175,55,0.2)] shadow-md cursor-zoom-in group"
                onClick={() => setZoomed(true)}
              >
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-black/80 rounded-full p-3 shadow-lg">
                    <FiZoomIn className="w-5 h-5 text-[#111111] dark:text-[#FFFDF8]" />
                  </div>
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.trending && (
                    <span className="px-2.5 py-1 rounded-full bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                      🔥 Trending
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#111111] font-semibold text-[10px] uppercase tracking-wider shadow-sm">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pt-1 pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        selectedImage === i ? "border-[#D4AF37] shadow-sm scale-105" : "border-stone-200 dark:border-stone-800 hover:border-[#D4AF37]/50"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Share & Social Row */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-sans text-xs text-[#A9A9A9]">Share this piece:</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg border border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] transition-all cursor-pointer"
                    title="Share Link"
                  >
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="p-2 rounded-lg border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== RIGHT COLUMN: Product Information & Actions ===== */}
            <div className="space-y-4 sm:space-y-5">
              
              {/* Category & SKU Header Row */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${product.category}`}
                  className="font-sans text-xs font-semibold text-[#D4AF37] tracking-widest uppercase hover:underline"
                >
                  {product.category.replace(/-/g, " ")}
                </Link>
                <span className="font-sans text-xs text-[#A9A9A9] tracking-wider">SKU: {product.sku}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] dark:text-[#FFFDF8] leading-tight">
                {product.title}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-stone-300 dark:text-stone-700"}`}
                    />
                  ))}
                </div>
                <span className="font-sans text-xs font-semibold text-[#111111] dark:text-[#FFFDF8]">
                  {product.rating}
                </span>
                <span className="font-sans text-xs text-[#A9A9A9]">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Buy / Rent Toggle (Height h-12 with equal 50/50 tabs) */}
              <div className="flex h-12 rounded-xl border border-[rgba(212,175,55,0.25)] overflow-hidden bg-[#FAF7F2] dark:bg-[#181818] p-1">
                <button
                  onClick={() => setActiveTab("purchase")}
                  className={`flex-1 h-full rounded-lg font-sans font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "purchase"
                      ? "bg-[#111111] dark:bg-[#D4AF37] text-[#FFFDF8] dark:text-[#111111] shadow-sm"
                      : "text-stone-600 dark:text-stone-300 hover:text-[#D4AF37]"
                  }`}
                >
                  💳 Buy Now
                </button>
                {product.isRentalAvailable && (
                  <button
                    onClick={() => setActiveTab("rental")}
                    className={`flex-1 h-full rounded-lg font-sans font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === "rental"
                        ? "bg-gradient-to-r from-[#E6B93F] to-[#C88A18] text-[#FFFDF8] shadow-sm"
                        : "text-stone-600 dark:text-stone-300 hover:text-[#D4AF37]"
                    }`}
                  >
                    🎁 Rent Set
                  </button>
                )}
              </div>

              {/* Price Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent rounded-xl p-4 sm:p-5 border border-[rgba(212,175,55,0.25)]"
                >
                  {activeTab === "purchase" ? (
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#111111] dark:text-[#FFFDF8]">
                          ₹{discountedPrice.toLocaleString("en-IN")}
                        </span>
                        {product.discount > 0 && (
                          <span className="font-sans text-base text-[#A9A9A9] line-through">
                            ₹{product.sellingPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="font-sans text-[11px] font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                            Save {product.discount}%
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[11px] text-[#A9A9A9] mt-1">Inclusive of all taxes & free shipping across India</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#D4AF37]">
                          ₹{product.rentalPrice?.toLocaleString("en-IN")}
                        </span>
                        <span className="font-sans text-xs text-[#A9A9A9]">/ 2-day rental</span>
                      </div>
                      <p className="font-sans text-[11px] text-[#A9A9A9] mt-1">
                        Refundable deposit: ₹{(product.sellingPrice * 0.4).toLocaleString("en-IN")} (returned upon receipt)
                      </p>
                      <p className="font-sans text-[11px] text-[#D4AF37] font-medium mt-1">
                        ✓ Min. 2 days rental · Free Rahuri boutique pickup
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Stock Status Indicator */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.availableQty > 0 ? "bg-emerald-500" : "bg-rose-500"}`} />
                <span className="font-sans text-xs font-semibold text-[#111111] dark:text-[#FFFDF8]">
                  {product.availableQty > 0
                    ? product.availableQty <= 3
                      ? `Only ${product.availableQty} left in stock!`
                      : "In Stock & Ready to Dispatch"
                    : "Out of Stock"}
                </span>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Material", value: product.material },
                  { label: "Weight", value: product.weight },
                  { label: "Occasion", value: product.occasion },
                  { label: "Color", value: product.color },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#FAF7F2] dark:bg-[#181818] rounded-xl p-3 border border-[rgba(212,175,55,0.18)]">
                    <p className="font-sans text-[10px] uppercase text-[#A9A9A9] tracking-wider">{label}</p>
                    <p className="font-sans text-xs font-semibold text-[#111111] dark:text-[#FFFDF8] mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#A9A9A9] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs font-semibold text-[#111111] dark:text-[#FFFDF8]">Quantity:</span>
                <div className="flex items-center border border-[rgba(212,175,55,0.3)] rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#181818]">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#111111] dark:text-[#FFFDF8] hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-sans font-semibold text-xs text-[#111111] dark:text-[#FFFDF8]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.availableQty, qty + 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#111111] dark:text-[#FFFDF8] hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  disabled={product.availableQty === 0}
                  className="h-11 sm:h-12 rounded-xl bg-[#111111] dark:bg-[#D4AF37] text-[#FFFDF8] dark:text-[#111111] font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] disabled:opacity-50 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  {activeTab === "rental" ? "Add to Rental Cart" : "Add to Cart"}
                </button>
                {activeTab === "rental" ? (
                  <Link
                    to={`/rental-booking?product=${product.id}`}
                    className="h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md border border-[#F3E5AB]/60 hover:from-[#C5A059] hover:via-[#F3E5AB] hover:to-[#B8860B] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <FiCalendar className="w-4 h-4 text-stone-950" /> Book Rental Now
                  </Link>
                ) : (
                  <Link
                    to="/checkout"
                    className="h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#E6B93F] to-[#C88A18] text-[#FFFDF8] font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm hover:from-[#C88A18] hover:to-[#E6B93F] transition-all"
                  >
                    Buy Now
                  </Link>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  toggleWishlist(product);
                  toast(isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist!", { icon: "❤️" });
                }}
                className={`w-full h-11 sm:h-12 rounded-xl border-2 font-sans font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  wishlisted
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-stone-300 dark:border-stone-700 hover:border-[#D4AF37] text-stone-700 dark:text-stone-300 hover:text-[#D4AF37]"
                }`}
              >
                <FiHeart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full h-11 sm:h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <FaWhatsapp className="w-4 h-4" />
                Inquire on WhatsApp
              </button>

              {/* Trust Badges Row */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[rgba(212,175,55,0.2)]">
                {[
                  { icon: FiTruck, label: "Free Delivery", sub: "Above ₹999" },
                  { icon: FiRotateCcw, label: "7-Day Return", sub: "Easy replacement" },
                  { icon: FiShield, label: "Genuine Quality", sub: "100% authentic" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                    <p className="font-sans text-[11px] font-semibold text-[#111111] dark:text-[#FFFDF8]">{label}</p>
                    <p className="font-sans text-[9px] text-[#A9A9A9]">{sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RELATED PRODUCTS SHOWCASE */}
          {related.length > 0 && (
            <div className="mt-14 sm:mt-20">
              <div className="text-center mb-8">
                <span className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full inline-block mb-2">
                  Complete Your Look
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#111111] dark:text-[#FFFDF8]">
                  Related <span className="text-[#D4AF37]">Products</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* IMAGE ZOOM MODAL */}
        <AnimatePresence>
          {zoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomed(false)}
              className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={product.images[selectedImage]}
                alt={product.title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
