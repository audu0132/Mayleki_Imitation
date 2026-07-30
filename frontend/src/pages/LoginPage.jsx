import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FiMail, FiEye, FiEyeOff, FiLock, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

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
      
      <div className="min-h-screen bg-cream dark:bg-dark-brown flex relative overflow-hidden">
        {/* Background Decorative Elements for the Form Side */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none hidden lg:block">
          <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-rose-gold/5 rounded-full blur-3xl"></div>
        </div>

        {/* Left: Image Side */}
        <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden group">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80"
            alt="Luxury Jewellery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-dark-brown/40 to-transparent" />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-12 lg:p-16">
            <Link to="/" className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold/30 shadow-gold glow-effect block hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover" onError={(e) => e.target.style.display = "none"} />
            </Link>
            
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-12 bg-gold"></span>
                  <span className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-gold">Mayleki Exclusive</span>
                </div>
                <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Discover the <br/>
                  <span className="text-transparent bg-clip-text bg-gold-gradient italic">Art of Fine</span> <br/>
                  Jewellery
                </h2>
                <p className="font-poppins text-sm text-white/70 leading-relaxed max-w-sm">
                  Sign in to access your curated collections, track your bespoke orders, and enjoy exclusive member privileges.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: Form Side */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-10">
              <Link to="/" className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold/30 shadow-gold block">
                <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover" onError={(e) => e.target.style.display = "none"} />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="card-luxury relative bg-white/95 dark:bg-dark-brown-light/95 backdrop-blur-xl"
            >
              {/* Form Header */}
              <motion.div variants={fadeUp} className="text-center mb-8">
                <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream mb-2">
                  Welcome Back
                </h1>
                <p className="font-poppins text-sm text-gray-500">
                  Enter your details to access your account.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Input */}
                <motion.div variants={fadeUp}>
                  <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream mb-1.5 block uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={`input-luxury pl-11 w-full ${errors.email ? "border-red-400 focus:ring-red-200" : ""}`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
                      })}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="font-poppins text-xs text-red-500 mt-1.5"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password Input */}
                <motion.div variants={fadeUp}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream block uppercase tracking-wider">
                      Password
                    </label>
                    <Link to="/forgot-password" className="font-poppins text-xs text-gold hover:text-gold-dark hover:underline transition-colors">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors">
                      <FiLock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      className={`input-luxury pl-11 pr-12 w-full ${errors.password ? "border-red-400 focus:ring-red-200" : ""}`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters required" },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gold transition-colors focus:outline-none"
                    >
                      {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="font-poppins text-xs text-red-500 mt-1.5"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Remember Me */}
                <motion.div variants={fadeUp} className="flex items-center pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-4 h-4 border border-gray-300 dark:border-gray-600 rounded checked:bg-gold checked:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all cursor-pointer"
                      />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-poppins text-sm text-gray-500 group-hover:text-dark-brown dark:group-hover:text-cream transition-colors">Remember me</span>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fadeUp} className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-gold w-full flex justify-center items-center group overflow-hidden relative"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                    <span className="relative flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-dark-brown/20 border-t-dark-brown rounded-full animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        <>
                          Sign In <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>
              </form>

              {/* Divider */}
              <motion.div variants={fadeUp} className="mt-8 relative flex items-center justify-center">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
                <span className="relative bg-white dark:bg-dark-brown-light px-4 font-poppins text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                  Or Continue With
                </span>
              </motion.div>

              {/* WhatsApp Login */}
              <motion.div variants={fadeUp} className="mt-6">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-brown text-dark-brown dark:text-cream font-poppins font-medium text-sm hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-500/10 transition-all duration-300 py-3 shadow-sm hover:shadow-md"
                >
                  <FaWhatsapp className="w-5 h-5 text-green-500" /> 
                  <span>Login via WhatsApp</span>
                </a>
              </motion.div>

              {/* Sign Up Link */}
              <motion.div variants={fadeUp} className="mt-8 text-center">
                <p className="font-poppins text-sm text-gray-500">
                  New to Mayleki?{" "}
                  <Link to="/register" className="font-semibold text-gold hover:text-gold-dark transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gold after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300">
                    Create an account
                  </Link>
                </p>
              </motion.div>

              {/* Demo accounts - subtly integrated */}
              <motion.div variants={fadeUp} className="mt-10 p-5 rounded-xl bg-gray-50/50 dark:bg-black/10 border border-gray-100 dark:border-white/5 backdrop-blur-sm">
                <p className="font-poppins text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold/50 animate-pulse"></span>
                  Demo Credentials
                </p>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-white dark:bg-dark-brown-light px-3 py-2 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
                    <span className="font-poppins text-xs text-gray-500">Admin</span>
                    <span className="font-mono text-xs text-dark-brown dark:text-cream bg-gray-50 dark:bg-black/20 px-2 py-1 rounded">admin@mayleki.com / admin123</span>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-dark-brown-light px-3 py-2 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
                    <span className="font-poppins text-xs text-gray-500">User</span>
                    <span className="font-mono text-xs text-dark-brown dark:text-cream bg-gray-50 dark:bg-black/20 px-2 py-1 rounded">any@email.com / anypass</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
