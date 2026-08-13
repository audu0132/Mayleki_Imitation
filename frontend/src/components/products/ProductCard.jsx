import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaWhatsapp, FaStar } from "react-icons/fa";
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
      icon: "✨",
      style: { background: "#1C1917", color: "#FAF7F2", border: "1px solid #C5A059" },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
      style: { background: "#1C1917", color: "#FAF7F2", border: "1px solid #C5A059" },
    });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const msg = `Hi Mayleki! I'm interested in purchasing "${product.title}" (SKU: ${product.sku}). Price: ₹${discountedPrice}. Is this item available?`;
    window.open(`https://wa.me/919139236500?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col h-full cursor-pointer bg-white dark:bg-[#1F1B19] border border-[#C5A059]/20 hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-none hover:shadow-lg rounded-none"
    >
      {/* Image Container (3:4 aspect ratio) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] dark:bg-black/20 w-full flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-semibold text-white bg-[#4A0E17] px-2.5 py-1 shadow-sm">
              New
            </span>
          )}
          {product.trending && (
            <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-semibold text-[#1C1917] bg-[#C5A059] px-2.5 py-1 shadow-sm">
              Trending
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-[9px] font-sans uppercase tracking-[0.18em] font-semibold text-white bg-[#1C1917] px-2 py-0.5">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Top Right */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm border border-[#C5A059]/30 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
          title="Wishlist"
        >
          <FiHeart className={`w-4 h-4 ${wishlisted ? "fill-[#4A0E17] text-[#4A0E17]" : ""}`} />
        </button>

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-[#1C1917]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
            <button
              onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
              className="flex-1 py-2.5 bg-white/95 dark:bg-[#1C1917]/95 text-[#1C1917] dark:text-[#FAF7F2] text-[10px] uppercase font-sans font-semibold tracking-[0.18em] hover:bg-[#C5A059] hover:text-white transition-colors border border-[#C5A059]/30 flex items-center justify-center gap-1.5"
            >
              <FiEye className="w-3.5 h-3.5" /> Quick View
            </button>
            <button
              onClick={handleWhatsApp}
              className="p-2.5 bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors"
              title="Inquire on WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stock Status */}
        {product.availableQty === 0 && (
          <div className="absolute inset-0 bg-[#FAF7F2]/80 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="text-[#1C1917] dark:text-white text-xs uppercase font-sans tracking-[0.2em] border border-[#1C1917] px-4 py-2 bg-white/90">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 bg-white dark:bg-[#1F1B19]">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-1 truncate">
          {product.category.replace(/-/g, " ")}
        </p>

        <h3 className="font-cormorant text-lg sm:text-xl font-medium text-[#1C1917] dark:text-[#FAF7F2] line-clamp-1 mb-1.5 group-hover:text-[#C5A059] transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? "text-[#C5A059]" : "text-gray-200 dark:text-gray-700"}`} />
          ))}
          <span className="text-[10px] text-gray-400 font-sans ml-1">
            ({product.reviews || 12})
          </span>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-auto pt-3 border-t border-[#C5A059]/15 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-sm sm:text-base font-bold text-[#1C1917] dark:text-[#FAF7F2]">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount > 0 && (
                <span className="font-sans text-xs text-gray-400 line-through">
                  {formatPrice(product.sellingPrice)}
                </span>
              )}
            </div>
            {product.isRentalAvailable && product.rentalPrice && (
              <p className="font-sans text-[10px] text-[#4A0E17] dark:text-[#E88090] font-medium uppercase tracking-wider mt-0.5">
                Rental: ₹{product.rentalPrice}/day
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.availableQty === 0}
            className="p-2.5 bg-[#4A0E17] hover:bg-[#6B1D2F] text-white transition-colors disabled:opacity-30 border border-[#C5A059]/30"
            title="Add to Cart"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
