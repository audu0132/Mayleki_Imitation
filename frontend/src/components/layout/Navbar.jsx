import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiArrowRight
} from "react-icons/fi";
import { useCart } from "../../context/AppContext";
import { useWishlist } from "../../context/AppContext";
import { useAuth } from "../../context/AppContext";

const LEFT_LINKS = [
  { label: "Collections", href: "/products" },
  { label: "New Arrivals", href: "/category/bridal-sets" },
  { label: "Best Sellers", href: "/category/maharashtrian" },
];

const MOBILE_LINKS = [
  { label: "Home", href: "/" },
  { label: "The Collection", href: "/products" },
  { label: "Bridal Sets", href: "/category/bridal-sets" },
  { label: "Maharashtrian", href: "/category/maharashtrian" },
  { label: "Rental Jewellery", href: "/rental-booking" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onSearchOpen, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAdmin } = useAuth();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href) => location.pathname === href;

  const navClasses = `navbar-luxury ${scrolled ? "scrolled" : ""} ${
    isHome && !scrolled ? "transparent" : ""
  }`;

  return (
    <>
      <header className={navClasses}>
        <div className="container-luxury">
          <div className="flex items-center justify-between">

            {/* LEFT — Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {LEFT_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`nav-link-luxury ${isActive(link.href) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CENTER — Brand Wordmark */}
            <Link
              to="/"
              className="flex-shrink-0 text-center group"
            >
              <span className="brand-wordmark font-display text-2xl lg:text-[1.75rem] font-medium tracking-[0.25em] uppercase transition-colors duration-300">
                Mayleki
              </span>
            </Link>

            {/* RIGHT — Icons */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
              {/* Search */}
              <button
                onClick={onSearchOpen}
                className="nav-icon text-inherit hover:text-champagne transition-colors"
                aria-label="Search"
              >
                <FiSearch className="w-[18px] h-[18px]" />
              </button>

              {/* Account */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="nav-icon text-inherit hover:text-champagne transition-colors"
                  aria-label="Account"
                >
                  <FiUser className="w-[18px] h-[18px]" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-52 bg-ivory border border-champagne/15 shadow-elevated py-2 z-50"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-2.5 border-b border-champagne/15">
                            <p className="font-body font-semibold text-xs text-charcoal">{user.name}</p>
                            <p className="font-body text-[10px] text-text-secondary truncate">{user.email}</p>
                          </div>
                          <Link to="/profile" className="block px-4 py-2 font-body text-xs text-charcoal hover:text-champagne hover:bg-champagne/5 transition-colors uppercase tracking-wider">
                            My Profile
                          </Link>
                          <Link to="/rental-booking" className="block px-4 py-2 font-body text-xs text-charcoal hover:text-champagne hover:bg-champagne/5 transition-colors uppercase tracking-wider">
                            Book Rental
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" className="block px-4 py-2 font-body text-xs text-champagne hover:bg-champagne/5 transition-colors uppercase tracking-wider">
                              Admin Panel
                            </Link>
                          )}
                          <div className="border-t border-champagne/15 mt-1 pt-1">
                            <button onClick={logout} className="w-full text-left px-4 py-2 font-body text-xs text-red-600 hover:bg-red-50 transition-colors uppercase tracking-wider">
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="block px-4 py-2.5 font-body text-xs font-semibold text-charcoal hover:text-champagne transition-colors uppercase tracking-wider">
                            Sign In
                          </Link>
                          <Link to="/register" className="block px-4 py-2.5 font-body text-xs text-champagne hover:bg-champagne/5 transition-colors uppercase tracking-wider">
                            Create Account
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="nav-icon relative text-inherit hover:text-champagne transition-colors"
                aria-label="Wishlist"
              >
                <FiHeart className="w-[18px] h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal text-ivory text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={onCartOpen}
                className="nav-icon relative text-inherit hover:text-champagne transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal text-ivory text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* MOBILE — Right Icons */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={onSearchOpen}
                className="text-inherit hover:text-champagne transition-colors"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              <button
                onClick={onCartOpen}
                className="relative text-inherit hover:text-champagne transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal text-ivory text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="text-inherit hover:text-champagne transition-colors"
                aria-label="Menu"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-charcoal flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-champagne/15">
              <span className="font-display text-xl font-medium tracking-[0.2em] uppercase text-ivory">
                Mayleki
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-ivory hover:text-champagne transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-5">
                {MOBILE_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between group py-1"
                    >
                      <span className="font-display text-2xl sm:text-3xl text-ivory group-hover:text-champagne transition-colors">
                        {link.label}
                      </span>
                      <FiArrowRight className="w-4 h-4 text-champagne opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth Section */}
              <div className="mt-10 pt-8 border-t border-champagne/15">
                {user ? (
                  <div className="space-y-3">
                    <p className="font-body text-sm text-ivory">{user.name}</p>
                    <div className="flex gap-3">
                      <Link to="/profile" onClick={() => setMobileOpen(false)}
                        className="px-4 py-2 border border-champagne/30 font-body text-xs text-champagne uppercase tracking-wider hover:bg-champagne hover:text-charcoal transition-all">
                        Profile
                      </Link>
                      <Link to="/wishlist" onClick={() => setMobileOpen(false)}
                        className="px-4 py-2 border border-champagne/30 font-body text-xs text-champagne uppercase tracking-wider hover:bg-champagne hover:text-charcoal transition-all">
                        Wishlist
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-3 bg-champagne text-charcoal font-body text-xs font-semibold uppercase tracking-wider text-center">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-3 border border-champagne/30 text-champagne font-body text-xs font-semibold uppercase tracking-wider text-center">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="px-6 py-5 border-t border-champagne/15">
              <div className="flex justify-between items-center font-body text-xs text-text-secondary">
                <span>Rahuri, Maharashtra</span>
                <a href="tel:+919139236500" className="text-champagne">+91 91392 36500</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
