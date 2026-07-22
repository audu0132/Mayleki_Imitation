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
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900"
            alt="Jewellery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 to-dark-brown/40" />
          <div className="absolute bottom-16 left-12 right-12">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30 mb-4">
              <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover" onError={(e) => e.target.style.display = "none"} />
            </div>
            <h2 className="font-playfair text-4xl font-bold text-cream mb-3">
              Welcome back to <span className="text-gold-gradient">Mayleki</span>
            </h2>
            <p className="font-poppins text-sm text-cream/70 leading-relaxed">
              Login to access your orders, wishlist, rental history and exclusive offers.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input-luxury pl-11 ${errors.email ? "border-red-400 focus:ring-red-200" : ""}`}
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
                <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className={`input-luxury pl-11 pr-12 ${errors.password ? "border-red-400 focus:ring-red-200" : ""}`}
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
                <label className="flex items-center gap-2 cursor-pointer">
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
                className="btn-gold w-full py-4 text-base disabled:opacity-60"
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
            <div className="mt-6 p-4 rounded-2xl bg-gold/5 border border-gold/20">
              <p className="font-poppins text-xs font-semibold text-gold mb-2">Demo Accounts:</p>
              <div className="space-y-1">
                <p className="font-poppins text-xs text-gray-500">Admin: admin@mayleki.com / admin123</p>
                <p className="font-poppins text-xs text-gray-500">Customer: any@email.com / any password</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-poppins text-sm text-gray-400 mb-4">Or contact us directly</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-poppins font-semibold text-sm hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" /> Login via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
