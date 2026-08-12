import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HERO_SLIDES } from "../../data/mockData";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  // Auto-advance with progress
  useEffect(() => {
    if (!isPlaying) return;
    setProgress(0);
    const duration = 5000;
    const interval = 50;
    const step = (interval / duration) * 100;
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + step;
      });
    }, interval);
    return () => clearInterval(progressRef.current);
  }, [isPlaying, next, current]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#111]"
      style={{ height: "min(90vh, 800px)" }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Gradient: strong on left for text, fades out to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 via-dark-brown/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Badge top-left */}
      <div className="absolute top-8 left-8 z-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-block font-poppins text-[10px] font-semibold tracking-[0.25em] uppercase text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full"
          >
            {slide.badge}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Content — bottom-left aligned (Kushals style) */}
      <div className="absolute inset-0 flex items-end container-luxury pb-24 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <p className="font-poppins text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4 font-semibold">
              {slide.subtitle}
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.1] mb-6">
              {slide.title}
            </h1>
            <p className="font-poppins text-sm text-white/70 leading-relaxed mb-8 max-w-md hidden sm:block">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#A8891A] text-white font-poppins text-xs font-semibold tracking-wider uppercase px-8 py-4 transition-all duration-300 group"
              >
                <span>{slide.cta || "Explore Collection"}</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/rental-booking"
                className="inline-flex items-center gap-2 border border-white/50 hover:border-white text-white font-poppins text-xs font-semibold tracking-wider uppercase px-8 py-4 transition-all duration-300 hover:bg-white/10"
              >
                Book Rental
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar: progress + navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Thin progress bar */}
        <div className="h-[2px] bg-white/10 w-full">
          <div
            className="h-full bg-[#C9A227] transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="container-luxury py-5 flex items-center justify-between">
          {/* Slide counter */}
          <span className="font-poppins text-[10px] text-white/40 tracking-widest uppercase">
            {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
          
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setProgress(0); }}
                className={`rounded-none transition-all duration-500 ${
                  i === current ? "w-10 h-[2px] bg-gold" : "w-3 h-[1px] bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          
          {/* Arrow nav */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-dark-brown transition-all duration-200 rounded-none"
            >
              <FiChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-dark-brown transition-all duration-200 rounded-none"
            >
              <FiChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

