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
      style: { background: "#3B2F2F", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
    });
  };

  const handleWhatsApp = () => {
    const price = activeTab === "rental" ? `Rental: ₹${product.rentalPrice}/day` : `Price: ₹${discountedPrice}`;
    const msg = `Hi! I'm interested in "${product.title}" (SKU: ${product.sku}). ${price}. Please provide more details.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
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
        <title>{product.title} | Mayleki Jewellery</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Helmet>

      <div className="page-wrapper">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-dark-brown-light border-b border-gold/10">
          <div className="container-luxury py-3">
            <nav className="flex items-center gap-1 font-poppins text-sm text-gray-400 flex-wrap">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <FiChevronRight className="w-3.5 h-3.5" />
              <Link to="/products" className="hover:text-gold transition-colors">Collections</Link>
              <FiChevronRight className="w-3.5 h-3.5" />
              <Link to={`/category/${product.category}`} className="hover:text-gold transition-colors capitalize">
                {product.category.replace(/-/g, " ")}
              </Link>
              <FiChevronRight className="w-3.5 h-3.5" />
              <span className="text-dark-brown dark:text-cream font-medium truncate">{product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container-luxury py-10">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

            {/* ===== LEFT: Image Gallery ===== */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                className="relative aspect-square rounded-3xl overflow-hidden bg-cream cursor-zoom-in group"
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
                <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <FiZoomIn className="w-6 h-6 text-dark-brown" />
                  </div>
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.trending && <span className="badge-gold">🔥 Trending</span>}
                  {product.discount > 0 && <span className="badge-sale">-{product.discount}% OFF</span>}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === i ? "border-gold shadow-gold scale-105" : "border-transparent hover:border-gold/50"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Share row */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-poppins text-xs text-gray-400">Share this product:</span>
                <div className="flex gap-2">
                  <button onClick={handleShare} className="p-2 rounded-lg border border-gray-200 hover:border-gold text-gray-500 hover:text-gold transition-all">
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  <button onClick={handleWhatsApp} className="p-2 rounded-lg border border-gray-200 hover:border-green-400 text-gray-500 hover:text-green-500 transition-all">
                    <FaWhatsapp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== RIGHT: Product Info ===== */}
            <div className="space-y-6">
              {/* Category & SKU */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${product.category}`}
                  className="font-poppins text-xs font-semibold text-gold tracking-wider uppercase hover:underline"
                >
                  {product.category.replace(/-/g, " ")}
                </Link>
                <span className="font-poppins text-xs text-gray-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-dark-brown dark:text-cream leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-gray-300"}`}
                      fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"}
                    />
                  ))}
                </div>
                <span className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream">
                  {product.rating}
                </span>
                <span className="font-poppins text-sm text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Purchase / Rental Toggle */}
              <div className="flex rounded-2xl border border-gold/20 overflow-hidden bg-gray-50 dark:bg-white/5 p-1">
                <button
                  onClick={() => setActiveTab("purchase")}
                  className={`flex-1 py-3 rounded-xl font-poppins font-semibold text-sm transition-all duration-300 ${
                    activeTab === "purchase"
                      ? "bg-gold text-dark-brown shadow-gold"
                      : "text-gray-500 hover:text-gold"
                  }`}
                >
                  💳 Buy Now
                </button>
                {product.isRentalAvailable && (
                  <button
                    onClick={() => setActiveTab("rental")}
                    className={`flex-1 py-3 rounded-xl font-poppins font-semibold text-sm transition-all duration-300 ${
                      activeTab === "rental"
                        ? "bg-rose-gold text-white shadow-rose-gold"
                        : "text-gray-500 hover:text-rose-gold"
                    }`}
                  >
                    🎁 Rent
                  </button>
                )}
              </div>

              {/* Price */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-gradient-to-r from-gold/10 to-transparent rounded-2xl p-5 border border-gold/20"
                >
                  {activeTab === "purchase" ? (
                    <div>
                      <div className="flex items-end gap-3">
                        <span className="font-playfair text-4xl font-bold text-dark-brown dark:text-cream">
                          ₹{discountedPrice.toLocaleString("en-IN")}
                        </span>
                        {product.discount > 0 && (
                          <span className="font-poppins text-lg text-gray-400 line-through mb-1">
                            ₹{product.sellingPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="badge-sale mb-1">{product.discount}% off</span>
                        )}
                      </div>
                      <p className="font-poppins text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-end gap-3">
                        <span className="font-playfair text-4xl font-bold text-rose-gold">
                          ₹{product.rentalPrice.toLocaleString("en-IN")}<span className="text-xl">/day</span>
                        </span>
                      </div>
                      <p className="font-poppins text-xs text-gray-400 mt-1">
                        Security deposit: ₹{(product.sellingPrice * 0.5).toLocaleString("en-IN")} (refundable)
                      </p>
                      <p className="font-poppins text-xs text-gold mt-1">
                        ✓ Min. 2 days rental · Free pickup available
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Stock status */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.availableQty > 0 ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-poppins text-sm font-medium text-dark-brown dark:text-cream">
                  {product.availableQty > 0
                    ? product.availableQty <= 3
                      ? `Only ${product.availableQty} left in stock!`
                      : "In Stock"
                    : "Out of Stock"}
                </span>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Material", value: product.material },
                  { label: "Weight", value: product.weight },
                  { label: "Occasion", value: product.occasion },
                  { label: "Color", value: product.color },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
                    <p className="font-poppins text-xs text-gray-400">{label}</p>
                    <p className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <p className="font-poppins text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream">Qty:</span>
                <div className="flex items-center border border-gold/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gold/10 text-dark-brown dark:text-cream transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-poppins font-semibold text-dark-brown dark:text-cream">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.availableQty, qty + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gold/10 text-dark-brown dark:text-cream transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.availableQty === 0}
                  className="btn-gold py-4 text-base disabled:opacity-50"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {activeTab === "rental" ? "Add to Rental Cart" : "Add to Cart"}
                </button>
                {activeTab === "rental" ? (
                  <Link to={`/rental-booking?product=${product.id}`} className="btn-rose py-4 text-base flex items-center justify-center gap-2">
                    <FiCalendar className="w-5 h-5" /> Book Now
                  </Link>
                ) : (
                  <Link to="/checkout" className="btn-dark py-4 text-base flex items-center justify-center gap-2">
                    Buy Now
                  </Link>
                )}
              </div>

              <button
                onClick={() => { toggleWishlist(product); toast(isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist!", { icon: "❤️" }); }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-poppins font-semibold text-sm transition-all duration-300 ${
                  wishlisted ? "border-rose-gold bg-rose-gold/10 text-rose-gold" : "border-gray-200 hover:border-rose-gold text-gray-500 hover:text-rose-gold"
                }`}
              >
                <FiHeart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-poppins font-semibold text-sm transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Inquire on WhatsApp
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gold/10">
                {[
                  { icon: FiTruck, label: "Free Delivery", sub: "Above ₹999" },
                  { icon: FiRotateCcw, label: "7-Day Return", sub: "Easy returns" },
                  { icon: FiShield, label: "Genuine Quality", sub: "100% authentic" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream">{label}</p>
                    <p className="font-poppins text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-10">
                <p className="section-subtitle mb-2">You May Also Like</p>
                <h2 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">
                  Related <span className="text-gold-gradient">Products</span>
                </h2>
                <div className="gold-divider mt-3" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>

        {/* Zoom Modal */}
        <AnimatePresence>
          {zoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomed(false)}
              className="fixed inset-0 z-[70] bg-dark-brown/95 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={product.images[selectedImage]}
                alt={product.title}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
