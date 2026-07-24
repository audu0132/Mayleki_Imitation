import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Mayleki Jewellery</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      <div className="min-h-screen bg-cream dark:bg-dark-brown flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          {/* Decorative Gold 404 */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative mb-8"
          >
            <p className="font-playfair font-bold text-[10rem] leading-none text-gold/10 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">💎</span>
            </div>
          </motion.div>

          {/* Content */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-dark-brown dark:text-cream mb-4">
            Page Not Found
          </h1>
          <p className="font-poppins text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
            We couldn't find the jewel you were looking for. It may have been moved, renamed, or never existed.
          </p>
          <div className="gold-divider my-6" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2">
              <FiHome className="w-4 h-4" /> Go to Homepage
            </Link>
            <Link to="/products" className="btn-gold-outline px-8 py-3.5 inline-flex items-center gap-2">
              <FiSearch className="w-4 h-4" /> Browse Collections
            </Link>
          </div>

          {/* Back link */}
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 font-poppins text-sm text-gray-400 hover:text-gold transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Go back
          </button>
        </motion.div>
      </div>
    </>
  );
}
