import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/logo.jpeg";

export default function LuxuryLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    // Smooth simulated progress from 0% to 100% over ~1.1s
    const startTime = Date.now();
    const duration = 1100; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Brief pause at 100% before curtain lifts
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 650); // Matches curtain slide duration
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="luxury-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1], // Luxury cubic bezier curtain lift
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F4] overflow-hidden select-none"
          aria-label="Loading Mayleki"
          role="status"
        >
          {/* Subtle background ambient luxury vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,95,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm">
            {/* Logo Emblem Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5"
            >
              {/* Gold glowing halo behind emblem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.08, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B8975F]/30 to-[#D4BC8A]/20 blur-md"
              />
              <img
                src={Logo}
                alt="Mayleki Emblem"
                className="relative w-full h-full object-cover rounded-full shadow-[0_4px_20px_rgba(184,151,95,0.25)] border border-[#B8975F]/30"
              />
            </motion.div>

            {/* Brand Wordmark with elegant letter-spacing expansion */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.18em", y: 8 }}
              animate={{ opacity: 1, letterSpacing: "0.28em", y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-display text-2xl sm:text-3xl text-[#1A1816] uppercase font-medium tracking-[0.28em] mb-2"
            >
              Mayleki
            </motion.h1>

            {/* Subtitle / Heritage Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: "easeOut",
              }}
              className="font-body text-[9px] sm:text-[10px] tracking-[0.35em] text-[#B8975F] uppercase font-semibold mb-8"
            >
              Fine Imitation & Bridal Jewellery
            </motion.p>

            {/* Hairline Luxury Progress Bar */}
            <div className="w-36 sm:w-44 h-[1.5px] bg-[#B8975F]/15 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B8975F] via-[#D4BC8A] to-[#B8975F] origin-left"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Subtle percentage counter */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4 }}
              className="font-body text-[9px] tracking-[0.2em] text-[#8A857D] mt-2.5 tabular-nums"
            >
              {progress}%
            </motion.span>
          </div>

          {/* Bottom decorative trademark */}
          <div className="absolute bottom-6 font-body text-[8px] tracking-[0.3em] uppercase text-[#B8975F]/50">
            Maharashtra &middot; Heritage Craft
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
