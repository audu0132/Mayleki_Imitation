import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AppContext";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiPackage, FiHeart, FiCalendar, FiEdit, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  const STATS = [
    { icon: FiPackage, label: "My Orders", value: "5", link: "/profile" },
    { icon: FiHeart, label: "Wishlist", value: "12", link: "/wishlist" },
    { icon: FiCalendar, label: "Rentals", value: "2", link: "/rental-booking" },
    { icon: FiEdit, label: "Edit Profile", value: "→", link: "/profile" },
  ];

  const DETAILS = [
    { label: "Full Name", value: user?.name, icon: FiUser },
    { label: "Email Address", value: user?.email, icon: FiMail },
    { label: "Phone Number", value: user?.phone || "+91 91392 36500", icon: FiPhone },
    { label: "Primary Boutique", value: "Rahuri, Maharashtra — 413706", icon: FiMapPin },
  ];

  return (
    <>
      <Helmet>
        <title>My Profile | Mayleki Jewellery</title>
        <meta name="description" content="Manage your Mayleki account, view previous jewellery orders, bridal rentals, and saved wishlist." />
      </Helmet>

      <div className="page-wrapper bg-ivory">
        {/* Luxury Page Header */}
        <div className="page-header">
          <div className="container-luxury flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              {/* Monogram Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-champagne via-champagne-light to-champagne-dark text-charcoal font-display font-semibold text-2xl sm:text-3xl flex items-center justify-center shadow-elevated border-2 border-ivory/20 flex-shrink-0">
                {initial}
              </div>
              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-champagne block mb-1">
                  Customer Account
                </span>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-ivory">
                  {user?.name || "Admin"}
                </h1>
                <p className="font-body text-xs sm:text-sm text-ivory/70 mt-0.5">
                  {user?.email || "admin@mayleki.com"}
                </p>
              </div>
            </div>

            <span className="self-start sm:self-center px-3.5 py-1 rounded-full bg-champagne/15 border border-champagne/30 text-champagne font-body text-[11px] uppercase tracking-[0.2em] font-medium">
              {user?.role || "VIP Customer"}
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="container-luxury py-10 sm:py-14 lg:py-16">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {STATS.map(({ icon: Icon, label, value, link }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={link}
                  className="block bg-white p-6 sm:p-7 border border-champagne/20 shadow-subtle hover:border-champagne hover:shadow-elevated transition-all duration-300 group text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-champagne/10 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-charcoal transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-medium text-charcoal mb-1">
                    {value}
                  </p>
                  <p className="font-body text-xs text-text-secondary uppercase tracking-wider">
                    {label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Account Details Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white border border-champagne/20 p-6 sm:p-8 lg:p-10 shadow-subtle"
          >
            <div className="flex items-center justify-between border-b border-champagne/15 pb-4 mb-6">
              <h2 className="font-display text-xl sm:text-2xl text-charcoal font-normal">
                Account Details
              </h2>
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-champagne font-semibold">
                Verified Profile
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {DETAILS.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="p-4 sm:p-5 bg-ivory/60 border border-champagne/15 rounded-none flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-champagne/15 flex items-center justify-center text-champagne flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-body text-[11px] uppercase tracking-wider text-text-muted mb-1">
                      {label}
                    </p>
                    <p className="font-body font-medium text-sm text-charcoal">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
