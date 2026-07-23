import { useState } from "react";
import { Link, useLocation, Outlet, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiPackage, FiShoppingCart, FiUsers, FiCalendar,
  FiImage, FiMessageSquare, FiStar, FiTag, FiFileText,
  FiSettings, FiBarChart2, FiHelpCircle, FiChevronLeft,
  FiChevronRight, FiBell, FiSearch, FiMenu, FiLogOut,
  FiHome,
} from "react-icons/fi";
import { useAuth } from "../../context/AppContext";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: FiGrid, badge: null },
  { label: "Products", href: "/admin/products", icon: FiPackage, badge: "248" },
  { label: "Categories", href: "/admin/categories", icon: FiTag, badge: null },
  { label: "Orders", href: "/admin/orders", icon: FiShoppingCart, badge: "23" },
  { label: "Rental Bookings", href: "/admin/rentals", icon: FiCalendar, badge: "12" },
  { label: "Customers", href: "/admin/customers", icon: FiUsers, badge: null },
  { label: "Testimonials", href: "/admin/testimonials", icon: FiStar, badge: "5" },
  { label: "Banners", href: "/admin/banners", icon: FiImage, badge: null },
  { label: "Coupons", href: "/admin/coupons", icon: FiTag, badge: null },
  { label: "Blog", href: "/admin/blog", icon: FiFileText, badge: null },
  { label: "FAQs", href: "/admin/faqs", icon: FiHelpCircle, badge: null },
  { label: "Contact Requests", href: "/admin/contacts", icon: FiMessageSquare, badge: "8" },
  { label: "Reports", href: "/admin/reports", icon: FiBarChart2, badge: null },
  { label: "SEO Settings", href: "/admin/seo", icon: FiSettings, badge: null },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const isActive = (href) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-playfair font-bold text-dark-brown text-sm">M</span>
        </div>
        <AnimatePresence>
          {(sidebarOpen || mobileSidebarOpen) && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
            >
              <p className="font-playfair font-bold text-cream text-sm whitespace-nowrap">Mayleki Admin</p>
              <p className="font-poppins text-[10px] text-gold whitespace-nowrap">Control Panel</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <div className="space-y-1 px-3">
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive(href)
                  ? "bg-gold text-dark-brown font-semibold"
                  : "text-gray-400 hover:bg-white/10 hover:text-cream"
              }`}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <AnimatePresence>
                {(sidebarOpen || mobileSidebarOpen) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-poppins text-sm whitespace-nowrap flex-1"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {badge && (sidebarOpen || mobileSidebarOpen) && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive(href) ? "bg-dark-brown/30 text-dark-brown" : "bg-gold/20 text-gold"
                }`}>
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom links */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-cream transition-all"
        >
          <FiHome className="w-4 h-4 flex-shrink-0" />
          {(sidebarOpen || mobileSidebarOpen) && (
            <span className="font-poppins text-sm">View Website</span>
          )}
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
        >
          <FiLogOut className="w-4 h-4 flex-shrink-0" />
          {(sidebarOpen || mobileSidebarOpen) && (
            <span className="font-poppins text-sm">Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-brown overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex flex-col bg-dark-brown border-r border-white/10 overflow-hidden flex-shrink-0 relative"
      >
        <SidebarContent />
        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gold text-dark-brown flex items-center justify-center shadow-gold hover:bg-gold-light transition-colors z-10"
        >
          {sidebarOpen ? <FiChevronLeft className="w-3 h-3" /> : <FiChevronRight className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-brown/80 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-60 bg-dark-brown z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-dark-brown-light border-b border-gold/10 px-4 lg:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-dark-brown hover:bg-gold/10 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search admin..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border-none font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-gold/10 text-dark-brown dark:text-cream transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
                <span className="font-bold text-dark-brown text-sm">
                  {user?.name?.[0] || "A"}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="font-poppins font-semibold text-dark-brown dark:text-cream text-sm">{user?.name}</p>
                <p className="font-poppins text-xs text-gold capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
