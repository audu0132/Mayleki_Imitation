import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    login({ name: data.name, email: data.email, phone: data.phone, role: "customer" });
    toast.success("Account created successfully! Welcome to Mayleki! 🎉");
    navigate("/");
    setIsLoading(false);
  };

  const benefits = [
    "Exclusive member discounts",
    "Early access to new collections",
    "Track orders & rentals",
    "Personalized recommendations",
  ];

  return (
    <>
      <Helmet><title>Create Account | Mayleki Jewellery</title></Helmet>
      <div className="min-h-screen bg-cream dark:bg-dark-brown flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-2/5 bg-dark-brown flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="relative text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gold/30 mx-auto mb-6">
              <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover" onError={(e) => e.target.style.display = "none"} />
            </div>
            <h2 className="font-playfair text-4xl font-bold text-cream mb-4">
              Join <span className="text-gold-gradient">Mayleki</span>
            </h2>
            <p className="font-poppins text-sm text-cream/70 mb-8 leading-relaxed">
              Create your account and unlock exclusive benefits for Mayleki members.
            </p>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="font-poppins text-sm text-cream/80">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white dark:bg-dark-brown-light p-8 sm:p-10 rounded-2xl shadow-card border border-gold/10"
          >
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">
                Create Account
              </h1>
              <p className="font-poppins text-sm text-gray-500 mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-gold font-semibold hover:underline">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">Full Name *</label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    placeholder="Your full name"
                    className={`input-luxury pl-11 ${errors.name ? "border-red-400" : ""}`}
                    {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })}
                  />
                </div>
                {errors.name && <p className="font-poppins text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input-luxury pl-11 ${errors.email ? "border-red-400" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                    })}
                  />
                </div>
                {errors.email && <p className="font-poppins text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <span className="font-poppins text-sm text-gray-500">+91</span>
                    <FiPhone className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    className={`input-luxury pl-16 ${errors.phone ? "border-red-400" : ""}`}
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: { value: /^[6-9]\d{9}$/, message: "Invalid phone number" },
                    })}
                  />
                </div>
                {errors.phone && <p className="font-poppins text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min 8 characters"
                    className={`input-luxury pl-11 pr-12 ${errors.password ? "border-red-400" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Min 8 characters" },
                      pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: "Must include uppercase and number" },
                    })}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="font-poppins text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-2 block uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className={`input-luxury pl-11 ${errors.confirmPassword ? "border-red-400" : ""}`}
                    {...register("confirmPassword", {
                      required: "Please confirm password",
                      validate: (val) => val === password || "Passwords do not match",
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="font-poppins text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-gold rounded"
                  {...register("terms", { required: "Please accept terms" })}
                />
                <span className="font-poppins text-sm text-gray-500">
                  I agree to the{" "}
                  <Link to="/terms" className="text-gold hover:underline">Terms & Conditions</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p className="font-poppins text-xs text-red-500">{errors.terms.message}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold w-full py-4 text-base disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-dark-brown border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : "Create Account 🎉"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
