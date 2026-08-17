import { Link } from "react-router-dom";
import { FiHeart, FiArrowRight } from "react-icons/fi";
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

export default function ProductCard({ product, featured = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discountedPrice = product.sellingPrice - (product.sellingPrice * (product.discount || 0)) / 100;

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
      style: { background: "#1C1917", color: "#FAF7F2", border: "1px solid #C5A059" },
    });
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col h-full cursor-pointer bg-white dark:bg-[#1F1B19] border border-[#C5A059]/15 hover:border-[#C5A059] transition-all duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div className={`relative ${featured ? "aspect-[3/4]" : "aspect-[4/5]"} overflow-hidden bg-[#FAF7F2] dark:bg-black/30 w-full flex-shrink-0`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Minimal Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.featured && (
            <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-semibold text-white bg-[#4A0E17] px-2.5 py-0.5">
              New
            </span>
          )}
          {product.isRentalAvailable && (
            <span className="text-[9px] font-sans uppercase tracking-[0.18em] font-semibold text-[#1C1917] bg-[#C5A059] px-2 py-0.5">
              Rental Available
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
          title="Wishlist"
        >
          <FiHeart className={`w-4 h-4 ${wishlisted ? "fill-[#4A0E17] text-[#4A0E17]" : ""}`} />
        </button>

        {/* Minimal Hover Link */}
        <div className="absolute inset-0 bg-[#1C1917]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-5">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FAF7F2] flex items-center gap-2 group-hover:text-[#C5A059] transition-colors">
            VIEW PRODUCT <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5 bg-white dark:bg-[#1F1B19]">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-1">
          {product.category.replace(/-/g, " ")}
        </p>

        <h3 className={`font-cormorant ${featured ? "text-2xl" : "text-xl"} font-normal text-[#1C1917] dark:text-[#FAF7F2] line-clamp-1 mb-2 group-hover:text-[#C5A059] transition-colors`}>
          {product.title}
        </h3>

        <div className="mt-auto pt-3 border-t border-[#C5A059]/15 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#FAF7F2]">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="font-sans text-[11px] text-gray-400 line-through">
                {formatPrice(product.sellingPrice)}
              </span>
            )}
          </div>
          {product.isRentalAvailable && product.rentalPrice && (
            <span className="font-sans text-[10px] text-[#4A0E17] dark:text-[#E88090] uppercase tracking-wider font-semibold">
              Rental: ₹{product.rentalPrice}/day
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
