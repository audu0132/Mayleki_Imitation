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
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "min(680px, 90vh)" }}
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
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/90 via-dark-brown/60 to-dark-brown/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative h-full container-luxury flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="badge-gold mb-4 inline-flex"
            >
              ✨ {slide.badge}
            </motion.div>

            {/* Subtitle */}
            <p className="section-subtitle text-gold mb-3">
              {slide.subtitle}
            </p>

            {/* Title */}
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6 text-shadow-luxury">
              {slide.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="inline-block mr-3"
                >
                  {i === 0 ? <span className="text-gold-gradient">{word}</span> : word}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-poppins text-base text-cream/80 leading-relaxed mb-8 max-w-lg"
            >
              {slide.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={slide.ctaLink} className="btn-gold text-base px-8 py-4">
                {slide.cta} <FiArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi! I'm interested in the ${slide.title} collection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-cream font-poppins font-semibold text-base hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                <FaWhatsapp className="w-5 h-5 text-green-400" />
                WhatsApp Inquiry
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-8 mt-10"
            >
              {[
                { value: "1000+", label: "Designs" },
                { value: "5000+", label: "Happy Brides" },
                { value: "₹150", label: "Rental From" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-playfair text-2xl font-bold text-gold">{value}</p>
                  <p className="font-poppins text-xs text-cream/60 tracking-wide">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Right side floating image */}
        <motion.div
          className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-72 h-80">
            <div className="absolute inset-0 rounded-3xl bg-gold/20 backdrop-blur-sm border border-gold/30 -rotate-6" />
            <img
              src={HERO_SLIDES[(current + 1) % HERO_SLIDES.length].bgImage}
              alt="Preview"
              className="relative w-full h-full object-cover rounded-3xl rotate-3 shadow-luxury"
            />
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-gold/50 flex items-center justify-center text-cream hover:text-gold transition-all duration-200 backdrop-blur-sm"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-gold/50 flex items-center justify-center text-cream hover:text-gold transition-all duration-200 backdrop-blur-sm"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-gold"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Bottom decorative divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#FFFDF8" />
        </svg>
      </div>
    </section>
  );
}
