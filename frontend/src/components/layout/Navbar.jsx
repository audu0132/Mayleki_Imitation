import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiChevronDown, FiSun, FiMoon, FiLogOut, FiPackage,
  FiSettings, FiPhone, FiSparkles,
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
  { label: "Maharashtrian", href: "/category/maharashtrian" },
  { label: "Rental", href: "/rental-booking" },
  { label: "Gallery", href: "/gallery" },
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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
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
      {/* TOP LUXURY ANNOUNCEMENT BAR */}
      <div className="bg-[#4A0E17] text-[#FAF7F2] py-2 text-center text-[11px] font-sans tracking-[0.2em] uppercase overflow-hidden border-b border-[#C5A059]/30">
        <div className="animate-marquee inline-flex gap-12 whitespace-nowrap">
          {[
            "✦ Timeless Maharashtrian Craftsmanship",
            "Free Express Delivery on Orders Above ₹999",
            "Exclusive Bridal Rentals from ₹150/Day",
            "Boutique Store in Rahuri, Maharashtra",
            "100% Premium Quality Guarantee",
            "✦ Timeless Maharashtrian Craftsmanship",
            "Free Express Delivery on Orders Above ₹999",
            "Exclusive Bridal Rentals from ₹150/Day",
            "Boutique Store in Rahuri, Maharashtra",
            "100% Premium Quality Guarantee",
          ].map((text, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="text-[#E5C88A] font-medium">{text}</span>
              <span className="text-[#C5A059]/60 text-[9px]">𑁍</span>
            </span>
          ))}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/95 dark:bg-[#1C1917]/95 backdrop-blur-md shadow-md border-b border-[#C5A059]/25"
            : "bg-[#FAF7F2]/80 dark:bg-[#1C1917]/80 backdrop-blur-sm border-b border-[#C5A059]/10"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#C5A059]/40 group-hover:border-[#C5A059] transition-all duration-500 shadow-sm bg-white p-0.5">
                <img
                  src={Logo}
                  alt="Mayleki Imitation Jewellery"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="w-full h-full bg-[#4A0E17] hidden items-center justify-center text-[#C5A059] font-cormorant font-bold text-xl">
                  M
                </div>
              </div>
              <div>
                <h1 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-wide text-[#1C1917] dark:text-[#FAF7F2] leading-none group-hover:text-[#C5A059] transition-colors">
                  Mayleki
                </h1>
                <p className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-[#C5A059] font-semibold uppercase mt-0.5">
                  Imitation Jewellery
                </p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center justify-center gap-7 flex-1">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onMouseLeave={() => setCollectionsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] font-sans transition-all duration-200 ${
                        isActive(link.href)
                          ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                          : "text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]"
                      }`}
                    >
                      {link.label}
                      <FiChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          collectionsOpen ? "rotate-180 text-[#C5A059]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {collectionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] bg-[#FAF7F2] dark:bg-[#1C1917] shadow-xl border border-[#C5A059]/30 p-6 z-50 rounded-none"
                        >
                          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#C5A059]/20">
                            <FiSparkles className="w-4 h-4 text-[#C5A059]" />
                            <span className="font-cormorant text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F2]">
                              Traditional & Modern Collections
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {CATEGORIES.slice(0, 12).map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="flex items-center gap-2.5 p-2.5 border border-transparent hover:border-[#C5A059]/30 hover:bg-[#C5A059]/5 transition-all duration-200 group"
                              >
                                <span className="text-lg">{cat.icon}</span>
                                <span className="font-sans text-xs font-medium text-[#1C1917] dark:text-[#FAF7F2] group-hover:text-[#C5A059] tracking-wider uppercase truncate">
                                  {cat.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-5 pt-3 border-t border-[#C5A059]/20 flex items-center justify-between">
                            <span className="font-sans text-xs text-gray-500 dark:text-gray-400">
                              {CATEGORIES.length} curated jewellery collections
                            </span>
                            <Link
                              to="/products"
                              className="font-sans text-xs font-semibold text-[#C5A059] tracking-widest uppercase hover:text-[#9E7B32] transition-colors"
                            >
                              Explore All →
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
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] font-sans transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-[#C5A059] border-b-2 border-[#C5A059]"
                        : "text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-none text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Dark Mode */}
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-none text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                aria-label="Wishlist"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#4A0E17] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[#C5A059]">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C5A059] text-[#1C1917] text-[10px] font-bold rounded-full flex justify-center items-center"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#4A0E17] border border-[#C5A059] flex items-center justify-center text-white">
                    {user ? (
                      <span className="font-bold text-xs">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    ) : (
                      <FiUser className="w-4 h-4 text-[#C5A059]" />
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
                      className="absolute right-0 top-full mt-3 w-56 bg-[#FAF7F2] dark:bg-[#1C1917] shadow-xl border border-[#C5A059]/30 py-2 z-50 rounded-none"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-[#C5A059]/20">
                            <p className="font-sans font-semibold text-[#1C1917] dark:text-[#FAF7F2] text-sm">{user.name}</p>
                            <p className="font-sans text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors">
                            <FiUser className="w-4 h-4 text-[#C5A059]" /> My Profile
                          </Link>
                          <Link to="/profile/orders" className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors">
                            <FiPackage className="w-4 h-4 text-[#C5A059]" /> My Orders
                          </Link>
                          <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors">
                            <FiHeart className="w-4 h-4 text-[#C5A059]" /> Wishlist
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#C5A059] transition-colors font-semibold">
                              <FiSettings className="w-4 h-4" /> Admin Panel
                            </Link>
                          )}
                          <div className="border-t border-[#C5A059]/20 mt-2 pt-2">
                            <button
                              onClick={logout}
                              className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-sans uppercase tracking-wider text-red-600 transition-colors"
                            >
                              <FiLogOut className="w-4 h-4" /> Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="flex items-center gap-3 px-4 py-3 hover:bg-[#C5A059]/10 text-xs font-sans font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors">
                            <FiUser className="w-4 h-4 text-[#C5A059]" /> Sign In
                          </Link>
                          <div className="px-3 pb-2">
                            <Link to="/register" className="btn-gold text-[10px] w-full py-2.5 flex items-center justify-center">
                              Create Account
                            </Link>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-[#FAF7F2] dark:bg-[#1C1917] border-t border-[#C5A059]/30"
            >
              <div className="px-4 py-6 space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] font-sans transition-colors ${
                      isActive(link.href)
                        ? "bg-[#C5A059]/15 text-[#C5A059] border-l-2 border-[#C5A059]"
                        : "text-[#1C1917] dark:text-[#FAF7F2] hover:bg-[#C5A059]/5 hover:text-[#C5A059]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Categories grid */}
                <div className="pt-4 border-t border-[#C5A059]/20">
                  <p className="px-4 py-2 text-[10px] font-semibold text-[#C5A059] tracking-[0.2em] uppercase font-sans">
                    Popular Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CATEGORIES.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 border border-[#C5A059]/10 hover:border-[#C5A059]/40 text-xs font-sans text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors truncate"
                      >
                        <span>{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Auth buttons mobile */}
                {!user ? (
                  <div className="flex gap-3 pt-4 border-t border-[#C5A059]/20">
                    <Link to="/login" className="flex-1 btn-gold-outline text-center py-3">Login</Link>
                    <Link to="/register" className="flex-1 btn-gold text-center py-3">Register</Link>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-between px-2">
                    <span className="text-xs font-sans text-gray-500">Logged in as {user.name}</span>
                    <button onClick={logout} className="text-xs text-red-600 uppercase font-semibold">Logout</button>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919139236500?text=Hi, I'm interested in your imitation jewellery collection!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#4A0E17] text-white font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#6B1D2F] transition-colors mt-4 border border-[#C5A059]"
                >
                  <FiPhone className="w-4 h-4 text-[#C5A059]" /> WhatsApp Consultation
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
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#FAF7F2] dark:bg-[#1C1917] shadow-2xl border border-[#C5A059]/40 overflow-hidden rounded-none"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-4 p-6 border-b border-[#C5A059]/20">
                <FiSearch className="w-6 h-6 text-[#C5A059] flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bridal sets, Kolhapuri saaj, nath, rental..."
                  className="flex-1 bg-transparent text-[#1C1917] dark:text-[#FAF7F2] text-lg font-sans outline-none placeholder:text-gray-400"
                />
                <button type="submit" className="btn-gold text-xs px-5 py-2.5">Search</button>
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <FiX className="w-5 h-5 text-gray-400 hover:text-[#1C1917]" />
                </button>
              </form>
              
              <div className="p-6">
                <p className="text-[10px] font-sans font-semibold text-[#C5A059] mb-3 tracking-[0.2em] uppercase">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Bridal Set", "Kolhapuri Saaj", "Nath", "Kundan", "Temple Jewellery", "Rental Jewellery"].map((term) => (
                    <button
                      key={term}
                      onClick={() => { setSearchQuery(term); navigate(`/search?q=${encodeURIComponent(term)}`); setSearchOpen(false); }}
                      className="px-4 py-2 border border-[#C5A059]/30 text-[#1C1917] dark:text-[#FAF7F2] text-xs font-sans hover:bg-[#C5A059] hover:text-white transition-all duration-200"
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
