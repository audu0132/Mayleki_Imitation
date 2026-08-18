import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login({ name: data.name, email: data.email, phone: data.phone, role: "customer" });
    toast.success("Account created successfully! Welcome to Mayleki! 🎉");
    navigate("/");
    setIsLoading(false);
  };

  const benefits = [
    "Exclusive member discounts & royal pricing",
    "Early access to new Maharashtrian collections",
    "Seamless order tracking & 2-day rental bookings",
    "Bespoke AI Jewellery Stylist recommendations"
  ];

  return (
    <>
      <Helmet>
        <title>Create Your Account | Mayleki Imitation Jewellery</title>
        <meta
          name="description"
          content="Register for an exclusive Mayleki account to enjoy bridal imitation jewellery rentals, personalized AI styling, and member offers."
        />
      </Helmet>

      <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#111111] flex flex-col lg:flex-row w-full overflow-x-hidden">
        
        {/* LEFT BRAND PANEL (45% Width on Desktop) */}
        <div className="hidden lg:flex lg:w-[45%] bg-[#111111] text-[#FFFDF8] border-r border-[rgba(212,175,55,0.2)] flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden min-h-screen select-none">
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
              backgroundSize: "36px 36px"
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Centered Content Block */}
          <div className="relative text-center max-w-[420px] w-full my-auto py-8 z-10">
            {/* Logo / Emblem */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[rgba(212,175,55,0.5)] shadow-lg mx-auto mb-4 bg-[#1F1B19] flex items-center justify-center p-0.5">
              <img
                src="/logo.png"
                alt="Mayleki"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="font-cormorant text-xl font-bold text-[#D4AF37] fallback-logo">M</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
              <HiSparkles className="w-3 h-3 text-[#D4AF37]" />
              Welcome to Mayleki
            </span>

            <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#FFFDF8] mb-3 leading-snug">
              Imitation Jewellery <span className="text-[#D4AF37]">Boutique</span>
            </h2>

            <p className="font-sans text-xs text-[#A9A9A9] mb-8 leading-relaxed font-light">
              Create your account to unlock private collection launches, priority rental bookings, and personalized AI styling in Rahuri & nationwide.
            </p>

            {/* Benefits List */}
            <div className="space-y-3.5 text-left bg-[#1F1B19]/60 p-5 rounded-2xl border border-[rgba(212,175,55,0.2)] shadow-sm">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                    <FiCheck className="w-3 h-3 text-[#D4AF37]" />
                  </div>
                  <span className="font-sans text-xs text-[#FFFDF8] font-light leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT REGISTRATION FORM PANEL (55% Width on Desktop) */}
        <div className="flex-1 w-full lg:w-[55%] bg-[#FFFDF8] dark:bg-[#181818] flex items-center justify-center p-4 sm:p-6 lg:p-10 min-h-screen py-8 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[480px] bg-white dark:bg-[#111111] rounded-2xl shadow-xl border border-[rgba(212,175,55,0.25)] p-6 sm:p-8 lg:p-9 my-auto"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#111111] dark:text-[#FFFDF8]">
                Create Your Account
              </h1>
              <p className="font-sans text-xs text-[#A9A9A9] mt-1.5">
                Join Mayleki and unlock exclusive jewellery benefits.
              </p>
              <p className="font-sans text-xs text-[#A9A9A9] mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block font-sans text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    className={`h-11 sm:h-12 w-full rounded-xl border ${
                      errors.name ? "border-red-400 focus:border-red-500" : "border-stone-300 dark:border-stone-700 focus:border-[#D4AF37]"
                    } bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] pl-11 pr-4 transition-all`}
                    {...register("name", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "Minimum 2 characters" }
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="font-sans text-[11px] text-red-500 mt-1 pl-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-sans text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative flex items-center">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`h-11 sm:h-12 w-full rounded-xl border ${
                      errors.email ? "border-red-400 focus:border-red-500" : "border-stone-300 dark:border-stone-700 focus:border-[#D4AF37]"
                    } bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] pl-11 pr-4 transition-all`}
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="font-sans text-[11px] text-red-500 mt-1 pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-sans text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                    <span className="font-sans text-xs font-semibold text-[#D4AF37]">+91</span>
                    <FiPhone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <input
                    type="tel"
                    placeholder="91392 36500"
                    className={`h-11 sm:h-12 w-full rounded-xl border ${
                      errors.phone ? "border-red-400 focus:border-red-500" : "border-stone-300 dark:border-stone-700 focus:border-[#D4AF37]"
                    } bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] pl-16 pr-4 transition-all`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter 10-digit Indian mobile number"
                      }
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="font-sans text-[11px] text-red-500 mt-1 pl-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-sans text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min 8 characters"
                    className={`h-11 sm:h-12 w-full rounded-xl border ${
                      errors.password ? "border-red-400 focus:border-red-500" : "border-stone-300 dark:border-stone-700 focus:border-[#D4AF37]"
                    } bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] pl-11 pr-12 transition-all`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[0-9])/,
                        message: "Must include 1 uppercase letter and 1 number"
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="font-sans text-[11px] text-red-500 mt-1 pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-sans text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`h-11 sm:h-12 w-full rounded-xl border ${
                      errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-stone-300 dark:border-stone-700 focus:border-[#D4AF37]"
                    } bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] pl-11 pr-12 transition-all`}
                    {...register("confirmPassword", {
                      required: "Please confirm password",
                      validate: (val) => val === password || "Passwords do not match"
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    aria-label={showConfirmPass ? "Hide password" : "Show password"}
                  >
                    {showConfirmPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="font-sans text-[11px] text-red-500 mt-1 pl-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox Row */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#D4AF37] rounded border-stone-300 cursor-pointer shrink-0"
                    {...register("terms", { required: "Please accept terms & conditions" })}
                  />
                  <span className="font-sans text-xs text-stone-600 dark:text-stone-400 leading-normal">
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold font-medium">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="font-sans text-[11px] text-red-500 mt-1 pl-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#E6B93F] to-[#C88A18] hover:from-[#C88A18] hover:to-[#E6B93F] text-[#FFFDF8] font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)] transition-all duration-300 cursor-pointer flex items-center justify-center mt-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "CREATE ACCOUNT 🎉"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
