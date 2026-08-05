import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiChevronDown, FiSun, FiMoon, FiLogOut, FiPackage,
  FiSettings, FiPhone,
} from "react-icons/fi";
import { useCart } from "../../context/AppContext";
import { useWishlist } from "../../context/AppContext";
import { useAuth } from "../../context/AppContext";
import { useDarkMode } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import Logo from "../../assets/logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/products", hasDropdown: true },
  { label: "Bridal", href: "/category/bridal-sets" },
  { label: "Rental", href: "/category/rental" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggleDark } = useDarkMode();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Focus search input
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-dark-brown text-cream py-2.5 text-center text-xs font-poppins tracking-widest uppercase overflow-hidden border-b border-white/5">
        <div className="animate-marquee inline-flex gap-16 whitespace-nowrap">
          {[
            "✨ Free Delivery on Orders Above ₹999",
            "👑 Premium Bridal Rentals Available",
            "💍 New Arrivals Every Week",
            "🎁 Wedding Season Special — Use Code: WEDDING25",
            "📞 Call: +91 91392 36500",
            "✨ Free Delivery on Orders Above ₹999",
            "👑 Premium Bridal Rentals Available",
            "💍 New Arrivals Every Week",
            "🎁 Wedding Season Special — Use Code: WEDDING25",
            "📞 Call: +91 91392 36500",
          ].map((text, i) => (
            <span key={i} className="text-gold-light">{text}</span>
          ))}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? "glass dark:glass-dark shadow-luxury border-b border-gold/20"
          : "bg-transparent border-b border-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container-luxury">
          <div className="flex items-center h-25 md:h-30">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold transition-all duration-500 shadow-sm bg-white">
                <img
                  src={Logo}
                  alt="Mayleki"
                  className="w-full h-full object-contain p-0.5"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="w-full h-full bg-gold/10 hidden items-center justify-center text-gold font-playfair font-bold text-base">
                  M
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-playfair text-xl font-bold text-dark-brown dark:text-cream leading-none">
                  Mayleki
                </h1>
                <p className="font-poppins text-[10px] tracking-[0.15em] text-gold font-semibold uppercase">
                  Imitation Jewellery
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV (gap-8) */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">

              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onMouseLeave={() => setCollectionsOpen(false)}
                  >
                    <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium font-poppins transition-colors duration-200 ${isActive(link.href) ? "text-gold" : "text-dark-brown dark:text-cream hover:text-gold"
                      }`}>
                      {link.label}
                      <FiChevronDown className={`w-3 h-3 transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {collectionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] glass dark:glass-dark rounded-2xl shadow-luxury border border-gold/20 p-8 z-50"
                        >
                          <div className="grid grid-cols-3 gap-4">
                            {CATEGORIES.slice(0, 16).map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gold/5 hover:text-gold transition-all duration-200 group"
                              >
                                <span className="text-xl">{cat.icon}</span>
                                <span className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream group-hover:text-gold tracking-wide uppercase truncate">
                                  {cat.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gold/10 flex items-center justify-between">
                            <span className="font-poppins text-xs text-gray-400">
                              {CATEGORIES.length} categories available
                            </span>
                            <Link
                              to="/products"
                              className="font-poppins text-xs font-semibold text-gold tracking-widest uppercase hover:text-gold-dark transition-colors"
                            >
                              View All Collections →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-2 py-4 rounded-lg text-sm font-medium font-poppins transition-colors duration-200 ${isActive(link.href)
                      ? "text-gold"
                      : "text-dark-brown dark:text-cream hover:text-gold"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="ml-auto flex items-center gap-[18px]">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-3 rounded-full text-dark-brown dark:text-cream hover:bg-gold/5 hover:text-gold transition-all duration-300"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Dark Mode */}
              <button
                onClick={toggleDark}
                className="p-3 rounded-full text-dark-brown dark:text-cream hover:bg-gold/5 hover:text-gold transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-3 rounded-full text-dark-brown dark:text-cream hover:bg-gold/5 hover:text-gold transition-all duration-300"
                aria-label="Wishlist"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-3 rounded-full text-dark-brown dark:text-cream hover:bg-gold/5 hover:text-gold transition-all duration-300"
                aria-label="Cart"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-dark-brown text-[10px] font-bold rounded-full flex justify-center items-center"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full text-dark-brown dark:text-cream hover:bg-gold/5 hover:text-gold transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
                    {user ? (
                      <span className="text-dark-brown font-bold text-sm">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    ) : (
                      <FiUser className="w-4 h-4 text-dark-brown" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-4 w-56 bg-white dark:bg-dark-brown-light rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gold/10 py-3 z-50"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-gold/10">
                            <p className="font-poppins font-semibold text-dark-brown dark:text-cream text-sm">{user.name}</p>
                            <p className="font-poppins text-xs text-gray-400 truncate">{user.email}</p>
                          </div>
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-sm font-poppins text-dark-brown dark:text-cream hover:text-gold transition-colors">
                            <FiUser className="w-4 h-4" /> My Profile
                          </Link>
                          <Link to="/profile/orders" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-sm font-poppins text-dark-brown dark:text-cream hover:text-gold transition-colors">
                            <FiPackage className="w-4 h-4" /> My Orders
                          </Link>
                          <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-sm font-poppins text-dark-brown dark:text-cream hover:text-gold transition-colors">
                            <FiHeart className="w-4 h-4" /> Wishlist
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-sm font-poppins text-gold transition-colors">
                              <FiSettings className="w-4 h-4" /> Admin Panel
                            </Link>
                          )}
                          <div className="border-t border-gold/10 mt-2">
                            <button
                              onClick={logout}
                              className="flex items-center gap-3 px-4 py-2.5 w-full text-left hover:bg-red-50 text-sm font-poppins text-red-500 transition-colors"
                            >
                              <FiLogOut className="w-4 h-4" /> Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="flex items-center gap-3 px-4 py-3 hover:bg-gold/5 text-sm font-poppins font-semibold text-dark-brown dark:text-cream hover:text-gold transition-colors">
                            <FiUser className="w-4 h-4" /> Login
                          </Link>
                          <Link to="/register" className="mx-3 mb-2 btn-gold text-xs flex items-center justify-center">
                            Create Account
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl text-dark-brown dark:text-cream hover:bg-gold/10 transition-all duration-200"
              >
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-dark-brown border-t border-gold/10"
            >
              <div className="container-luxury py-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl font-poppins text-sm font-medium transition-colors ${isActive(link.href)
                      ? "bg-gold/10 text-gold"
                      : "text-dark-brown dark:text-cream hover:bg-gold/5 hover:text-gold"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Categories in mobile */}
                <div className="pt-2 border-t border-gold/10">
                  <p className="px-4 py-2 text-xs font-semibold text-gold tracking-wider uppercase font-poppins">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {CATEGORIES.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gold/5 text-sm font-poppins text-dark-brown dark:text-cream hover:text-gold transition-colors"
                      >
                        <span>{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Auth buttons mobile */}
                {!user && (
                  <div className="flex gap-3 pt-4 border-t border-gold/10">
                    <Link to="/login" className="flex-1 btn-gold-outline text-center py-3">Login</Link>
                    <Link to="/register" className="flex-1 btn-gold text-center py-3">Register</Link>
                  </div>
                )}
                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919139236500?text=Hi, I'm interested in your jewellery collection!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-poppins font-semibold text-sm hover:bg-green-600 transition-colors mt-2"
                >
                  <FiPhone className="w-4 h-4" /> WhatsApp Inquiry
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark-brown/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="w-full max-w-2xl bg-white dark:bg-dark-brown-light rounded-3xl shadow-luxury overflow-hidden"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-4 p-6">
                <FiSearch className="w-6 h-6 text-gold flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewellery, bridal sets, necklaces..."
                  className="flex-1 bg-transparent text-dark-brown dark:text-cream text-lg font-poppins outline-none placeholder:text-gray-400"
                />
                <button type="submit" className="btn-gold text-sm px-5 py-2.5">Search</button>
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <FiX className="w-5 h-5 text-gray-400 hover:text-dark-brown" />
                </button>
              </form>
              {/* Quick search suggestions */}
              <div className="px-6 pb-6">
                <p className="text-xs font-poppins font-semibold text-gray-400 mb-3 tracking-wider uppercase">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Bridal Set", "Kundan", "Kolhapuri Saaj", "Rental Jewellery", "Nath", "Jhumka"].map((term) => (
                    <button
                      key={term}
                      onClick={() => { setSearchQuery(term); navigate(`/search?q=${encodeURIComponent(term)}`); setSearchOpen(false); }}
                      className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-poppins hover:bg-gold hover:text-dark-brown transition-all duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
