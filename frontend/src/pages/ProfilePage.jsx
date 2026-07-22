import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiPackage, FiHeart, FiCalendar, FiEdit } from "react-icons/fi";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <Helmet><title>My Profile | Mayleki Jewellery</title></Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-12">
          <div className="container-luxury flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-dark-brown font-playfair font-bold text-2xl">
              {user?.name?.[0]}
            </div>
            <div>
              <h1 className="font-playfair text-3xl font-bold text-cream">{user?.name}</h1>
              <p className="font-poppins text-sm text-gray-400">{user?.email}</p>
              <span className="badge-gold capitalize mt-1 inline-flex">{user?.role}</span>
            </div>
          </div>
        </div>
        <div className="container-luxury py-10">
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: FiPackage, label: "My Orders", value: "5", link: "/profile/orders" },
              { icon: FiHeart, label: "Wishlist", value: "12", link: "/wishlist" },
              { icon: FiCalendar, label: "Rentals", value: "2", link: "/profile/rentals" },
              { icon: FiEdit, label: "Edit Profile", value: "→", link: "/profile/edit" },
            ].map(({ icon: Icon, label, value, link }) => (
              <a key={label} href={link} className="card-luxury p-6 text-center hover:border-gold/30 hover:shadow-gold border border-transparent transition-all">
                <Icon className="w-7 h-7 text-gold mx-auto mb-3" />
                <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">{value}</p>
                <p className="font-poppins text-sm text-gray-400">{label}</p>
              </a>
            ))}
          </div>
          <div className="bg-white dark:bg-dark-brown-light rounded-2xl p-6 border border-gold/10">
            <h2 className="font-playfair text-xl font-bold text-dark-brown dark:text-cream mb-4">Account Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[{ label: "Full Name", value: user?.name }, { label: "Email", value: user?.email }, { label: "Phone", value: user?.phone || "+91 ----" }, { label: "Location", value: "Rahuri, Maharashtra" }].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-gold/10 p-4">
                  <p className="font-poppins text-xs text-gray-400 mb-1">{label}</p>
                  <p className="font-poppins font-semibold text-dark-brown dark:text-cream">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
