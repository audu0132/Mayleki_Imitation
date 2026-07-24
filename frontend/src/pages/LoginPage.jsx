import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    // Mock login - in production, call backend API
    if (data.email === "admin@mayleki.com" && data.password === "admin123") {
      login({ name: "Admin", email: data.email, role: "admin" });
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } else {
      login({ name: "Customer", email: data.email, role: "customer" });
      toast.success("Logged in successfully!");
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet><title>Login | Mayleki Jewellery</title></Helmet>
      <div className="min-h-screen bg-cream dark:bg-dark-brown flex">
        {/* Left: Image */}
        <div className="hidden lg:block lg:w-[40%] relative">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900"
            alt="Jewellery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 to-dark-brown/40" />
          <div className="absolute bottom-24 left-12 right-12 lg:left-16 lg:right-16">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30 mb-6">
              <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover" onError={(e) => e.target.style.display = "none"} />
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-cream mb-6">
              Welcome back to <br/><span className="text-gold-gradient">Mayleki</span>
            </h2>
            <p className="font-poppins text-base text-cream/70 leading-relaxed pb-12">
              Login to access your orders, wishlist, rental history and exclusive offers.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[500px] bg-white dark:bg-dark-brown-light p-10 sm:p-12 rounded-2xl shadow-card border border-gold/10"
          >
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">
                Sign In
              </h1>
              <p className="font-poppins text-sm text-gray-500 mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-gold font-semibold hover:underline">
                  Create one
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">
                  Email Address *
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input-luxury h-[56px] pl-11 ${errors.email ? "border-red-400 focus:ring-red-200" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                    })}
                  />
                </div>
                {errors.email && <p className="font-poppins text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className={`input-luxury h-[56px] pl-11 pr-12 ${errors.password ? "border-red-400 focus:ring-red-200" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-brown"
                  >
                    {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="font-poppins text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-gold rounded" />
                  <span className="font-poppins text-sm text-gray-500">Remember me</span>
                </label>
                <Link to="/forgot-password" className="font-poppins text-sm text-gold hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold w-full h-[56px] text-base font-semibold disabled:opacity-60 flex justify-center items-center"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-dark-brown border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-8 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <p className="font-poppins text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Demo Accounts</p>
              <div className="space-y-2">
                <p className="font-poppins text-sm text-gray-600 dark:text-gray-300">
                  Admin: <span className="font-medium text-dark-brown dark:text-cream">admin@mayleki.com</span> / admin123
                </p>
                <p className="font-poppins text-sm text-gray-600 dark:text-gray-300">
                  Customer: <span className="font-medium text-dark-brown dark:text-cream">any@email.com</span> / any password
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="flex-shrink-0 mx-4 font-poppins text-xs text-gray-400 uppercase tracking-wider">Or contact us</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full h-[56px] rounded-xl border border-green-500/30 bg-green-50/50 dark:bg-green-500/5 text-green-600 dark:text-green-500 font-poppins font-semibold text-sm hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" /> Login via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
