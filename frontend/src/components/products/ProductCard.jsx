import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiZap } from "react-icons/fi";
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

  const discountedPrice = product.sellingPrice - (product.sellingPrice * (product.discount || 0)) / 100;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
      style: { background: "#1C1917", color: "#FAF7F2", border: "1px solid #C5A059" },
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, "purchase");
    toast.success(`Added ${product.title} to cart!`, {
      icon: "🛒",
      style: { background: "#111111", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
    });
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, "purchase");
    toast.success("Proceeding to Checkout!", { icon: "⚡" });
    navigate("/checkout");
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="card h-100 shadow-sm border-0 rounded-3 text-decoration-none group overflow-hidden"
    >
      {/* Bootstrap Card Image Header */}
      <div className={`position-relative ${featured ? "aspect-[3/4]" : "aspect-[4/5]"} overflow-hidden bg-light`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600";
          }}
        />

        {/* Bootstrap Badges */}
        <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1 z-2">
          {product.featured && (
            <span className="badge bg-[#C5A059] text-dark text-uppercase px-2.5 py-1 text-xs fw-bold">
              New
            </span>
          )}
          {product.isRentalAvailable && (
            <span className="badge bg-dark text-white text-uppercase px-2 py-1 text-xs">
              Rental Available
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="position-absolute top-0 end-0 m-3 btn btn-light btn-sm rounded-circle p-2 shadow-sm border-0 z-2"
          title="Wishlist"
        >
          <FiHeart className={`w-4 h-4 ${wishlisted ? "text-danger fill-danger" : "text-dark"}`} />
        </button>

        {/* Quick Action Overlay */}
        <div className="position-absolute bottom-0 start-0 end-0 p-2 z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex gap-1.5 justify-center">
          <button
            onClick={handleAddToCart}
            className="btn btn-sm btn-dark flex-1 text-xs font-semibold uppercase tracking-wider d-flex items-center justify-center gap-1 border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-dark"
            title="Add to Cart"
          >
            <FiShoppingCart className="w-3.5 h-3.5" /> Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="btn btn-sm bg-[#D4AF37] text-dark flex-1 text-xs font-bold uppercase tracking-wider d-flex items-center justify-center gap-1 hover:bg-[#E6C76A]"
            title="Buy Now"
          >
            <FiZap className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>

      {/* Bootstrap Card Body */}
      <div className="card-body d-flex flex-column p-4">
        <span className="text-uppercase text-muted text-xs font-semibold tracking-wider mb-1">
          {product.category.replace(/-/g, " ")}
        </span>

        <h5 className="card-title text-dark fw-bold text-truncate mb-3">
          {product.title}
        </h5>

        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between gap-2">
          <div>
            <span className="fw-bold text-dark me-2">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <small className="text-muted text-decoration-line-through">
                {formatPrice(product.sellingPrice)}
              </small>
            )}
          </div>
          <button
            onClick={handleBuyNow}
            className="btn btn-sm btn-outline-dark text-xs px-2.5 py-1 rounded-pill flex-shrink-0 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-dark transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
