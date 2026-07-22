import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useWishlist } from "../context/AppContext";
import { useCart } from "../context/AppContext";
import ProductCard from "../components/products/ProductCard";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <>
        <Helmet><title>My Wishlist | Mayleki Jewellery</title></Helmet>
        <div className="page-wrapper flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              💔
            </motion.div>
            <h2 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream mb-3">
              Your wishlist is empty
            </h2>
            <p className="font-poppins text-gray-500 mb-8">
              Save your favorite pieces and come back to them anytime!
            </p>
            <Link to="/products" className="btn-gold text-base px-8 py-4">
              <FiHeart className="w-5 h-5" /> Explore Collections
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>My Wishlist ({wishlist.length}) | Mayleki Jewellery</title></Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-4xl font-bold text-cream">My Wishlist</h1>
              <p className="font-poppins text-sm text-gray-400 mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
            </div>
            <button
              onClick={() => { wishlist.forEach((p) => toggleWishlist(p)); }}
              className="flex items-center gap-2 text-sm font-poppins text-red-400 hover:text-red-300 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" /> Clear all
            </button>
          </div>
        </div>

        <div className="container-luxury py-10">
          {/* Add all to cart */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-poppins text-sm text-gray-500">{wishlist.length} items saved</p>
            <button
              onClick={() => {
                wishlist.forEach((p) => addToCart(p, 1, "purchase"));
                toast.success("All items added to cart!", { icon: "🛒" });
              }}
              className="btn-gold px-5 py-2.5 text-sm"
            >
              <FiShoppingCart className="w-4 h-4" /> Add All to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
