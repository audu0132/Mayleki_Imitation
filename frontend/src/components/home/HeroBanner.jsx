import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HERO_SLIDES } from "../../data/mockData";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#111111] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}>
      
      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover opacity-80"
            loading="eager"
          />
          {/* Subtle gradient to ensure text readability */}
          <div className="absolute inset-0 bg-hero-gradient" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 container-luxury flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Subtitle */}
            <p className="font-poppins text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-6">
              {slide.subtitle}
            </p>

            {/* Title */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[80px] font-normal text-white leading-[1.1] mb-8 text-shadow-luxury">
              {slide.title}
            </h1>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <Link to={slide.ctaLink} className="btn-gold group relative overflow-hidden">
                <span className="relative z-10">{slide.cta || "Explore Collection"}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury" />
              </Link>
              <Link to="/category/bridal-sets" className="btn-gold-outline group relative overflow-hidden">
                <span className="relative z-10">Shop Bridal</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Indicators */}
      <div className="absolute bottom-12 left-0 right-0">
        <div className="container-luxury flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-white/30 rounded-full text-white hover:bg-white hover:text-[#111111] transition-all duration-300"
            >
              <FiChevronLeft strokeWidth={1} className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-white/30 rounded-full text-white hover:bg-white hover:text-[#111111] transition-all duration-300"
            >
              <FiChevronRight strokeWidth={1} className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-500 rounded-none ${
                  i === current
                    ? "w-12 h-[2px] bg-gold"
                    : "w-6 h-[1px] bg-white/40 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
