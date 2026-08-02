import { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FiMail, FiEye, FiEyeOff, FiLock, FiArrowRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaWhatsapp, FaGoogle, FaApple } from "react-icons/fa";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

// === Animations ===
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// === Reusable Components ===

const BrandLogo = () => (
  <Link to="/" className="flex flex-col items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-xl p-2">
    <div className="w-16 h-16 rounded-full overflow-hidden ring-1 ring-[#D4AF37]/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
      <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover bg-white" onError={(e) => e.target.style.display = "none"} />
    </div>
    <div className="text-center">
      <h1 className="font-playfair text-xl font-bold tracking-widest text-[#2D2A26] uppercase">
        Mayleki
      </h1>
      <p className="font-poppins text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">
        Jewellery
      </p>
    </div>
  </Link>
);

const LuxuryInput = forwardRef(({ label, icon: Icon, type = "text", error, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      <div 
        className={`relative flex items-center h-[52px] w-full rounded-xl border bg-white px-4 transition-all duration-300 ${
          error ? "border-red-400 ring-1 ring-red-400" : 
          isFocused ? "border-[#D4AF37] ring-1 ring-[#D4AF37]" : "border-[#E8E2D9] hover:border-[#D4AF37]/50"
        }`}
      >
        <div className={`mr-3 transition-colors duration-300 ${isFocused ? "text-[#D4AF37]" : "text-[#6B7280]"}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="relative flex-1 h-full flex flex-col justify-center pt-2">
          <input
            ref={ref}
            type={currentType}
            className="w-full bg-transparent border-none outline-none text-[#2D2A26] font-poppins text-sm peer relative z-10"
            placeholder=" "
            onFocus={(e) => { setIsFocused(true); if(props.onFocus) props.onFocus(e); }}
            onBlur={(e) => { setIsFocused(false); if(props.onBlur) props.onBlur(e); }}
            onChange={(e) => { setHasValue(e.target.value.length > 0); if(props.onChange) props.onChange(e); }}
            {...props}
          />
          <label className={`absolute left-0 font-poppins transition-all duration-300 pointer-events-none z-0 ${
            isFocused || hasValue || props.value
            ? "-top-0.5 text-[10px] text-[#6B7280]" 
            : "top-1.5 text-sm text-[#6B7280]"
          }`}>
            {label}
          </label>
        </div>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-[#6B7280] hover:text-[#D4AF37] transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="font-poppins text-[11px] text-red-500 mt-1.5 ml-1"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

LuxuryInput.displayName = "LuxuryInput";

const SocialButton = ({ icon: Icon, text, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-[#E8E2D9] bg-white text-[#2D2A26] font-poppins font-medium text-sm hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
  >
    <Icon className="w-5 h-5 text-[#6B7280] group-hover:text-[#D4AF37] transition-colors" />
    <span>{text}</span>
  </button>
);

const Divider = () => (
  <div className="relative flex items-center justify-center py-6">
    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8E2D9] to-transparent"></div>
    <span className="relative bg-white px-4 font-poppins text-[10px] uppercase tracking-[0.2em] text-[#6B7280] font-semibold">
      Or Continue With
    </span>
  </div>
);

const DemoCredentials = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-8 rounded-xl border border-[#E8E2D9] bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-[#FCFAF7] hover:bg-[#F3EFE9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] inset-ring"
      >
        <span className="font-poppins text-xs font-semibold text-[#6B7280] uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          Demo Credentials
        </span>
        {isOpen ? <FiChevronUp className="text-[#6B7280]" /> : <FiChevronDown className="text-[#6B7280]" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2 space-y-3 bg-[#FCFAF7]">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-[#E8E2D9] shadow-sm">
                <span className="font-poppins text-xs font-medium text-[#6B7280]">Admin</span>
                <span className="font-mono text-xs text-[#2D2A26]">admin@mayleki.com / admin123</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-[#E8E2D9] shadow-sm">
                <span className="font-poppins text-xs font-medium text-[#6B7280]">Customer</span>
                <span className="font-mono text-xs text-[#2D2A26]">any@email.com / anypass</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// === Main Page ===

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const emailValue = watch("email");
  const passwordValue = watch("password");

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
      
      <div className="min-h-screen flex bg-[#FCFAF7] overflow-hidden">
        
        {/* Left Section: Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-[40%] lg:w-1/2 relative flex-col justify-end">
          <div className="absolute inset-0 group overflow-hidden">
            <motion.img 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80" 
              alt="Luxury Jewellery" 
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
          </div>
          
          <div className="relative z-10 p-12 lg:p-16 w-full text-white">
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
                <span className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Mayleki Exclusive
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="font-playfair text-4xl lg:text-5xl font-medium leading-tight">
                Discover Timeless <br/>
                <span className="italic text-[#D4AF37]">Luxury Jewellery</span>
              </motion.h2>
              
              <motion.p variants={fadeUp} className="font-poppins text-sm text-white/80 leading-relaxed max-w-sm">
                Crafted for every celebration, designed to make every woman shine. Sign in to access curated collections.
              </motion.p>
              
              <motion.div variants={fadeUp} className="pt-4">
                <Link to="/products" className="inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1 focus:outline-none focus:border-[#D4AF37]">
                  Explore Collections <FiArrowRight />
                </Link>
              </motion.div>
              
              <motion.div variants={fadeUp} className="pt-12 grid grid-cols-3 gap-6 border-t border-white/20">
                <div>
                  <p className="font-playfair text-xl text-white mb-1">5000+</p>
                  <p className="font-poppins text-[9px] uppercase tracking-widest text-white/50">Happy Customers</p>
                </div>
                <div>
                  <p className="font-playfair text-xl text-white mb-1">1000+</p>
                  <p className="font-poppins text-[9px] uppercase tracking-widest text-white/50">Designs</p>
                </div>
                <div>
                  <p className="font-playfair text-xl text-white mb-1">500+</p>
                  <p className="font-poppins text-[9px] uppercase tracking-widest text-white/50">Rentals</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-[60%] lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={staggerContainer}
            className="w-full max-w-[480px] bg-white rounded-2xl shadow-2xl shadow-[#D4AF37]/5 border border-[#E8E2D9] p-8 sm:p-12"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-10">
              <BrandLogo />
            </motion.div>
            
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="font-playfair text-3xl font-semibold text-[#2D2A26] mb-3">
                Welcome Back
              </h2>
              <p className="font-poppins text-sm text-[#6B7280]">
                Sign in to continue your luxury shopping experience.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div variants={fadeUp}>
                <LuxuryInput
                  label="Email Address"
                  icon={FiMail}
                  type="email"
                  error={errors.email}
                  value={emailValue}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
                  })}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <LuxuryInput
                  label="Password"
                  icon={FiLock}
                  type="password"
                  error={errors.password}
                  value={passwordValue}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" },
                  })}
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-4 h-4 border border-[#E8E2D9] rounded bg-[#FCFAF7] checked:bg-[#D4AF37] checked:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-poppins text-xs text-[#6B7280] group-hover:text-[#2D2A26] transition-colors">
                    Remember Me
                  </span>
                </label>
                
                <Link to="/forgot-password" className="font-poppins text-xs text-[#6B7280] hover:text-[#D4AF37] transition-colors focus:outline-none focus:underline underline-offset-4">
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[52px] rounded-xl bg-[#D4AF37] hover:bg-[#C89B2C] text-white font-poppins font-semibold uppercase tracking-[0.1em] text-xs transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:opacity-70 group shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            <motion.div variants={fadeUp}>
              <Divider />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <SocialButton icon={FaGoogle} text="Continue with Google" onClick={() => toast("Google login not implemented")} />
              <SocialButton icon={FaApple} text="Continue with Apple" onClick={() => toast("Apple login not implemented")} />
              <SocialButton icon={FaWhatsapp} text="Continue with WhatsApp" onClick={() => toast("WhatsApp login not implemented")} />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 text-center">
              <p className="font-poppins text-sm text-[#6B7280]">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-[#D4AF37] hover:text-[#C89B2C] hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded px-1">
                  Create Account
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <DemoCredentials />
            </motion.div>
            
          </motion.div>
        </div>
        
      </div>
    </>
  );
}
