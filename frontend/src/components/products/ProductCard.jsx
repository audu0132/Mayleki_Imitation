import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
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
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountedPrice =
    product.sellingPrice - (product.sellingPrice * (product.discount || 0)) / 100;

  const hasSecondImage = product.images?.length > 1;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
      style: {
        background: "#1A1816",
        color: "#FAF8F4",
        borderRadius: 0,
        border: "1px solid rgba(184,151,95,0.2)",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "12px",
      },
    });
  };

  // Determine badge
  const badge = product.featured
    ? { label: "New", type: "new" }
    : product.bestSeller
    ? { label: "Bestseller", type: "bestseller" }
    : product.availableQty <= 3 && product.availableQty > 0
    ? { label: "Limited", type: "limited" }
    : null;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="product-card block group"
      data-cursor="view"
    >
      {/* Image Container */}
      <div
        className={`product-card-image relative ${
          featured ? "aspect-[3/4]" : "aspect-product"
        }`}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-800 ease-luxury group-hover:scale-[1.04] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600";
          }}
        />

        {/* Secondary Image (crossfade on hover) */}
        {hasSecondImage && (
          <img
            src={product.images[1]}
            alt={`${product.title} alternate`}
            className="image-secondary w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Badge */}
        {badge && (
          <span className={`product-card-badge ${badge.type}`}>
            {badge.label}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`wishlist-btn ${wishlisted ? "active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            className={`w-3.5 h-3.5 ${wishlisted ? "fill-current text-red-500" : ""}`}
          />
        </button>

        {/* Quick View Bar */}
        <div className="product-card-quick-view">Quick View</div>
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        <span className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-1 block">
          {product.category.replace(/-/g, " ")}
        </span>
        <h3 className="product-card-title truncate">{product.title}</h3>
        <div className="flex items-center gap-2">
          <span className="product-card-price">
            {formatPrice(discountedPrice)}
          </span>
          {product.discount > 0 && (
            <span className="product-card-price-original">
              {formatPrice(product.sellingPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
