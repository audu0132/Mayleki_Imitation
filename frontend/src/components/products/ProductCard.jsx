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
      className="card h-100 shadow-sm border-0 rounded-3 text-decoration-none group overflow-hidden"
    >
      {/* Bootstrap Card Image Header */}
      <div className={`position-relative ${featured ? "aspect-[3/4]" : "aspect-[4/5]"} overflow-hidden bg-light`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
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
      </div>

      {/* Bootstrap Card Body */}
      <div className="card-body d-flex flex-column p-4">
        <span className="text-uppercase text-muted text-xs font-semibold tracking-wider mb-1">
          {product.category.replace(/-/g, " ")}
        </span>

        <h5 className="card-title text-dark fw-bold text-truncate mb-3">
          {product.title}
        </h5>

        <div className="mt-auto pt-3 border-top d-flex align-items-baseline justify-content-between">
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
          {product.isRentalAvailable && product.rentalPrice && (
            <small className="fw-semibold text-[#C5A059]">
              Rental: ₹{product.rentalPrice}/day
            </small>
          )}
        </div>
      </div>
    </Link>
  );
}
