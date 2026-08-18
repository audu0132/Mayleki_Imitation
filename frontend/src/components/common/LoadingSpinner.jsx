import { HiSparkles } from "react-icons/hi2";
import Logo from "../../assets/logo.jpeg";

export default function LoadingSpinner({ fullScreen = true, text = "Crafting Royal Experience..." }) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]/90 dark:bg-[#0E0C0B]/90 backdrop-blur-md transition-all duration-300 select-none"
    : "flex items-center justify-center min-h-[350px] w-full py-12 select-none";

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl">
        {/* Glowing Background Radial Aura */}
        <div className="absolute w-48 h-48 bg-gradient-to-tr from-[#D4AF37]/25 via-[#C5A059]/15 to-transparent rounded-full blur-3xl animate-pulse" />

        {/* Multi-layered Animated Spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer Smooth Rotating Gold Ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D4AF37] border-r-[#F3E5AB]/60 border-b-[#996515]/20 animate-spin" 
            style={{ animationDuration: '1.4s' }}
          />

          {/* Outer Glowing Dot Orbiting Accent */}
          <div 
            className="absolute inset-0 rounded-full animate-spin"
            style={{ animationDuration: '1.4s' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#FAF7F2] shadow-[0_0_12px_#D4AF37] border border-[#D4AF37] absolute -top-1 left-1/2 -translate-x-1/2" />
          </div>

          {/* Middle Counter-Spinning Dashed Ring */}
          <div className="absolute inset-3 rounded-full border border-dashed border-[#D4AF37]/50 animate-spin-reverse" />

          {/* Inner Pulsing Glass Core */}
          <div className="absolute inset-5 rounded-full bg-gradient-to-br from-[#D4AF37]/15 via-transparent to-black/20 border border-[#D4AF37]/30 backdrop-blur-xs animate-pulse" />

          {/* Center Mayleki Boutique Logo */}
          <div className="relative z-10 w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/80 shadow-[0_0_20px_rgba(212,175,55,0.4)] p-0.5 bg-[#1F1B19] flex items-center justify-center shrink-0">
            <img src={Logo} alt="Mayleki" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        {/* Royal Brand & Status Header */}
        <div className="mt-7 flex flex-col items-center gap-2 text-center z-10">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.4em] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#C5A059]">
              MAYLEKI
            </span>
            <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="font-poppins text-xs font-medium text-stone-500 dark:text-stone-400 tracking-widest uppercase flex items-center gap-1.5">
            <span>{text}</span>
          </p>

          {/* Shimmering Loading Dots Bar */}
          <div className="flex gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
