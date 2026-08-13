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
      className="relative w-full overflow-hidden bg-[#1C1917]"
      style={{ height: "min(88vh, 760px)" }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Rich luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/90 via-[#4A0E17]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Badge top-left */}
      <div className="absolute top-8 left-6 sm:left-12 z-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-block font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[#E5C88A] bg-[#4A0E17]/70 backdrop-blur-md border border-[#C5A059]/40 px-4 py-1.5 rounded-none"
          >
            {slide.badge || "Heritage Collection"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Content — bottom-left aligned */}
      <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#C5A059] mb-3 font-semibold flex items-center gap-2">
              <span className="w-6 h-px bg-[#C5A059]"></span>
              {slide.subtitle || "Authentic Maharashtrian Craftsmanship"}
            </p>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] leading-[1.08] mb-5 tracking-wide">
              {slide.title}
            </h1>
            <p className="font-sans text-sm text-[#FAF7F2]/80 leading-relaxed mb-8 max-w-md hidden sm:block">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to={slide.ctaLink || "/products"}
                className="btn-gold text-xs px-8 py-4 flex items-center gap-2 group"
              >
                <span>{slide.cta || "Explore Collection"}</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/rental-booking"
                className="btn-wine text-xs px-8 py-4 border border-[#C5A059]/40"
              >
                Book Rental
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar: progress + navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Thin gold progress bar */}
        <div className="h-[2px] bg-white/10 w-full">
          <div
            className="h-full bg-[#C5A059] transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Slide counter */}
          <span className="font-sans text-[10px] text-white/50 tracking-widest uppercase font-semibold">
            {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
          
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setProgress(0); }}
                className={`rounded-none transition-all duration-500 ${
                  i === current ? "w-10 h-[2px] bg-[#C5A059]" : "w-3 h-[1px] bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow navigation */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 flex items-center justify-center border border-[#C5A059]/30 text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#1C1917] transition-all duration-200 rounded-none"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 flex items-center justify-center border border-[#C5A059]/30 text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#1C1917] transition-all duration-200 rounded-none"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

