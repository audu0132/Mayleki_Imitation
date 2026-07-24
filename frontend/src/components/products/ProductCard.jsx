import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiEye, FiShare2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../context/AppContext";
import { useWishlist } from "../../context/AppContext";
import toast from "react-hot-toast";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discountedPrice = product.sellingPrice - (product.sellingPrice * (product.discount || 0)) / 100;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, "purchase");
    toast.success(`${product.title} added to cart!`, {
      icon: "🛒",
      style: { background: "#3B2F2F", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
      style: { background: "#3B2F2F", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
    });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const msg = `Hi! I'm interested in "${product.title}" (SKU: ${product.sku}). Price: ₹${discountedPrice}. Can you help me?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <Link to={`/products/${product.slug}`} className="product-card h-full flex flex-col justify-between block group">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-product bg-cream">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="badge-gold text-[10px] px-2 py-0.5">Featured</span>
          )}
          {product.trending && (
            <span className="px-2 py-0.5 bg-rose-gold text-white rounded-full text-[10px] font-poppins font-semibold">
              🔥 Trending
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2 py-0.5 bg-dark-brown text-gold rounded-full text-[10px] font-poppins font-semibold">
              ⭐ Best Seller
            </span>
          )}
          {product.discount > 0 && (
            <span className="badge-sale text-[10px] px-2 py-0.5">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Rental badge */}
        {product.isRentalAvailable && (
          <div className="absolute top-3 right-3">
            <span className="badge-rental text-[10px] px-2 py-0.5">🎁 Rental</span>
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-dark-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                wishlisted ? "bg-rose-gold text-white" : "bg-white text-dark-brown hover:bg-rose-gold hover:text-white"
              }`}
              title="Add to Wishlist"
            >
              <FiHeart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
              className="w-10 h-10 rounded-full bg-white text-dark-brown hover:bg-gold hover:text-dark-brown flex items-center justify-center shadow-lg transition-all duration-200"
              title="Quick View"
            >
              <FiEye className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWhatsApp}
              className="w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 flex items-center justify-center shadow-lg transition-all duration-200"
              title="WhatsApp Inquiry"
            >
              <FaWhatsapp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Availability */}
        {product.availableQty <= 2 && product.availableQty > 0 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="bg-red-500 text-white text-[10px] font-poppins font-semibold px-3 py-1 rounded-full">
              Only {product.availableQty} left!
            </span>
          </div>
        )}
        {product.availableQty === 0 && (
          <div className="absolute inset-0 bg-dark-brown/50 flex items-center justify-center">
            <span className="bg-white text-dark-brown text-sm font-poppins font-semibold px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content (p-6 sm:p-8 = 24px - 32px) */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        {/* Category */}
        <p className="font-poppins text-xs text-gold font-semibold tracking-wider uppercase mb-1">
          {product.category.replace(/-/g, " ")}
        </p>

        {/* Title */}
        <h3 className="font-playfair text-base font-bold text-dark-brown dark:text-cream group-hover:text-gold transition-colors duration-200 line-clamp-2 leading-snug mb-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-gold" : "text-gray-300"}`}>★</span>
            ))}
          </div>
          <span className="font-poppins text-xs text-gray-400">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-playfair text-lg sm:text-xl font-bold text-dark-brown dark:text-cream">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount > 0 && (
                <span className="font-poppins text-xs sm:text-sm text-gray-400 line-through">
                  {formatPrice(product.sellingPrice)}
                </span>
              )}
            </div>
            {product.isRentalAvailable && product.rentalPrice > 0 && (
              <p className="font-poppins text-xs text-rose-gold font-medium mt-0.5">
                Rent from {formatPrice(product.rentalPrice)}/day
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.availableQty === 0}
            className="w-10 h-10 rounded-full bg-gold text-dark-brown hover:bg-gold-dark hover:shadow-gold flex items-center justify-center transition-all duration-200 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <FiShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </Link>
  );
}

