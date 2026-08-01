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
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 container-luxury flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Subtitle */}
            <p className="font-poppins text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">
              {slide.subtitle}
            </p>

            {/* Title */}
            <h1 className="font-playfair text-5xl sm:text-7xl lg:text-[80px] font-medium text-white leading-[1.1] mb-8">
              {slide.title}
            </h1>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <Link to={slide.ctaLink} className="btn-gold">
                {slide.cta}
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi! I'm interested in the ${slide.title} collection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-xs font-medium uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors border-b border-white hover:border-[#D4AF37] pb-1"
              >
                Inquire Now
              </a>
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
                    ? "w-12 h-[2px] bg-[#D4AF37]"
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
