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
    <Link to={`/products/${product.slug}`} className="group block h-full flex flex-col cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />

        {/* Minimal Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="text-[9px] uppercase tracking-widest text-black bg-white/90 px-2 py-1">New</span>
          )}
          {product.trending && (
            <span className="text-[9px] uppercase tracking-widest text-black bg-white/90 px-2 py-1">Trending</span>
          )}
          {product.discount > 0 && (
            <span className="text-[9px] uppercase tracking-widest text-white bg-black/90 px-2 py-1">-{product.discount}%</span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
          <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={handleWishlist}
              className="text-white hover:text-[#D4AF37] transition-colors p-2"
              title="Add to Wishlist"
            >
              <FiHeart strokeWidth={1} className={`w-5 h-5 ${wishlisted ? "fill-current text-[#D4AF37]" : ""}`} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
              className="text-[10px] uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors border-b border-white hover:border-[#D4AF37] pb-0.5"
            >
              Quick View
            </button>
          </div>
        </div>
        
        {/* Availability */}
        {product.availableQty === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-black text-xs uppercase tracking-widest border border-black px-4 py-2">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <p className="font-poppins text-[10px] uppercase tracking-widest text-gray-500 mb-1">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="font-playfair text-base text-[#111111] line-clamp-1 mb-2">
          {product.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-poppins text-xs text-[#111111]">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="font-poppins text-xs text-gray-400 line-through">
                {formatPrice(product.sellingPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.availableQty === 0}
            className="text-[#111111] hover:text-[#D4AF37] transition-colors disabled:opacity-30 p-1"
          >
            <FiShoppingCart strokeWidth={1} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}

