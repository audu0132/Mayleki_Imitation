import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiChevronDown, FiSun, FiMoon, FiLogOut, FiPackage,
  FiSettings, FiPhone, FiStar, FiArrowRight
} from "react-icons/fi";
import { useCart } from "../../context/AppContext";
import { useWishlist } from "../../context/AppContext";
import { useAuth } from "../../context/AppContext";
import { useDarkMode } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import Logo from "../../assets/logo.jpeg";

const CENTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/products" },
  { label: "AI Stylist ✨", href: "/ai-stylist" },
  { label: "Bridal", href: "/category/bridal-sets" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      {/* MAIN LUXURY NAVBAR */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-header gold-glow-sm py-4"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* LEFT: BRAND LOGO */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-all duration-500 bg-white p-0.5">
              <img
                src={Logo}
                alt="Mayleki"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-full h-full bg-[#1C1917] hidden items-center justify-center text-[#C5A059] font-cormorant font-bold text-base">
                M
              </div>
            </div>
            <div>
              <span className="font-cormorant text-2xl font-semibold tracking-widest text-[#1C1917] dark:text-[#FAF7F2] uppercase group-hover:text-[#C5A059] transition-colors leading-none block">
                Mayleki
              </span>
              <span className="font-sans text-[8px] tracking-[0.3em] text-[#C5A059] uppercase font-semibold block mt-0.5">
                Boutique
              </span>
            </div>
          </Link>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-10">
            {CENTER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`relative font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 py-1 group ${
                  isActive(link.href)
                    ? "text-[#C5A059]"
                    : "text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* RIGHT: SEARCH / ACCOUNT / CART / BOOKING */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors p-1"
              aria-label="Search"
            >
              <FiSearch className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors p-1 hidden sm:block"
              aria-label="Wishlist"
            >
              <FiHeart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4A0E17] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors p-1"
              aria-label="Cart"
            >
              <FiShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C5A059] text-[#1C1917] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors p-1"
                aria-label="User Account"
              >
                <FiUser className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-52 bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#C5A059]/30 shadow-xl py-2 z-50 rounded-none"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2.5 border-b border-[#C5A059]/20">
                          <p className="font-sans font-semibold text-[#1C1917] dark:text-[#FAF7F2] text-xs">{user.name}</p>
                          <p className="font-sans text-[10px] text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]">
                          <FiUser className="w-3.5 h-3.5 text-[#C5A059]" /> My Profile
                        </Link>
                        <Link to="/rental-booking" className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]">
                          <FiPackage className="w-3.5 h-3.5 text-[#C5A059]" /> Book Rental
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#C5A059]/10 text-xs font-sans uppercase tracking-wider text-[#C5A059]">
                            <FiSettings className="w-3.5 h-3.5" /> Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-[#C5A059]/20 mt-1 pt-1">
                          <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-xs font-sans uppercase text-red-600">
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-2 text-xs font-sans uppercase font-semibold text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059]">
                          Sign In
                        </Link>
                        <Link to="/register" className="block px-4 py-2 text-xs font-sans uppercase text-[#C5A059]">
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Rental CTA Button */}
            <Link
              to="/rental-booking"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 border border-[#C5A059] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#1C1917] dark:text-[#FAF7F2] hover:bg-[#C5A059] hover:text-white transition-all duration-300"
            >
              Book Rental
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1 text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
              aria-label="Open luxury mobile menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.header>

      {/* FULL-SCREEN LUXURY MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#1C1917] text-[#FAF7F2] flex flex-col justify-between p-8 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-cormorant text-2xl font-semibold tracking-widest uppercase text-[#FAF7F2]">Mayleki</span>
                <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-[#C5A059]">Boutique</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full border border-[#C5A059]/40 text-[#FAF7F2] hover:text-[#C5A059] flex items-center justify-center transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Animated Links */}
            <div className="my-auto py-8 space-y-6">
              {[
                { label: "Home", href: "/" },
                { label: "The Collection", href: "/products" },
                { label: "Bridal Sets", href: "/category/bridal-sets" },
                { label: "Maharashtrian", href: "/category/maharashtrian" },
                { label: "Jewellery Rental", href: "/rental-booking" },
                { label: "Our Story", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-cormorant text-3xl sm:text-4xl text-[#FAF7F2] hover:text-[#C5A059] transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <FiArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[#C5A059]" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer / Contact in Mobile Menu */}
            <div className="border-t border-[#C5A059]/30 pt-6 space-y-4">
              <div className="flex justify-between items-center text-xs font-sans text-gray-400">
                <span>Rahuri, Maharashtra</span>
                <a href="tel:+919139236500" className="text-[#C5A059] hover:underline">+91 91392 36500</a>
              </div>
              <a
                href="https://wa.me/919139236500"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-gold py-3.5 text-xs flex items-center justify-center gap-2"
              >
                WhatsApp Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#C5A059]/40 shadow-2xl p-8 rounded-none"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-4 pb-4 border-b border-[#C5A059]/30">
                <FiSearch className="w-6 h-6 text-[#C5A059]" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bridal sets, Kolhapuri saaj, nath, rental..."
                  className="flex-1 bg-transparent text-[#1C1917] dark:text-[#FAF7F2] text-xl font-cormorant outline-none placeholder:text-gray-400"
                />
                <button type="submit" className="btn-gold text-xs px-5 py-2.5">Search</button>
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <FiX className="w-5 h-5 text-gray-400 hover:text-[#1C1917]" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
