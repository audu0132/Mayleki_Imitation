import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TESTIMONIALS } from "../../data/mockData";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  const getVisible = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (current + i + TESTIMONIALS.length) % TESTIMONIALS.length;
      items.push({ ...TESTIMONIALS[idx], position: i });
    }
    return items;
  };

  return (
    <section
      className="py-24 md:py-32 bg-cream dark:bg-dark-brown overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="section-subtitle">Happy Brides</p>
          <h2 className="section-title">
            What Our <span className="text-gold-gradient">Customers Say</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 min-h-[340px]">
            <AnimatePresence mode="popLayout">
              {getVisible().map(({ position, ...testimonial }) => {
                const isCenter = position === 0;
                const isLeft = position === -1;
                const isRight = position === 1;

                return (
                  <motion.div
                    key={`${testimonial.id}-${position}`}
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      x: position > 0 ? 100 : -100,
                    }}
                    animate={{
                      opacity: isCenter ? 1 : 0.5,
                      scale: isCenter ? 1 : 0.82,
                      x: isLeft ? -20 : isRight ? 20 : 0,
                      zIndex: isCenter ? 10 : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                      x: position > 0 ? -100 : 100,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`relative flex-shrink-0 ${
                      isCenter ? "w-full max-w-2xl" : "hidden md:block w-72"
                    }`}
                    onClick={!isCenter ? (isLeft ? prev : next) : undefined}
                    style={{ cursor: !isCenter ? "pointer" : "default" }}
                  >
                    <div className={`bg-white dark:bg-dark-brown-light rounded-2xl p-6 sm:p-8 shadow-card ${
                      isCenter ? "border border-gold/30 shadow-gold-lg" : "border border-gold/10"
                    }`}>
                      {/* Quote icon */}
                      <div className="text-gold text-5xl font-playfair leading-none mb-3 opacity-40">"</div>

                      {/* Review */}
                      <p className={`font-poppins text-dark-brown dark:text-cream leading-relaxed mb-6 ${
                        isCenter ? "text-base" : "text-sm line-clamp-3"
                      }`}>
                        {testimonial.review}
                      </p>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-sm ${i < testimonial.rating ? "text-gold" : "text-gray-300"}`}>★</span>
                        ))}
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/30"
                        />
                        <div>
                          <p className="font-playfair font-bold text-dark-brown dark:text-cream">
                            {testimonial.name}
                          </p>
                          <p className="font-poppins text-xs text-gray-400">
                            {testimonial.location} · {testimonial.date}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span className="badge-gold text-[10px]">{testimonial.occasion}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center text-gold transition-all duration-200"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-6 h-2.5 bg-gold" : "w-2.5 h-2.5 bg-gold/30 hover:bg-gold/60"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center text-gold transition-all duration-200"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

