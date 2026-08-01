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
    <section className="py-24 bg-white" onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)}>
      <div className="container-luxury">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-medium text-[#111111] leading-tight mb-4">
              Client Stories
            </h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto" />
          </div>

          {/* Carousel */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center px-4 md:px-12"
              >
                <div className="text-[#D4AF37] text-4xl font-serif mb-6 opacity-40">"</div>
                <p className="font-playfair text-xl md:text-3xl text-[#111111] leading-relaxed mb-8 italic">
                  {TESTIMONIALS[current].review}
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                    <img
                      src={TESTIMONIALS[current].image}
                      alt={TESTIMONIALS[current].name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="font-poppins text-xs font-medium uppercase tracking-widest text-[#111111]">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="font-poppins text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">
                      {TESTIMONIALS[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#111111] transition-colors p-2"
            >
              <FiChevronLeft strokeWidth={1} className="w-8 h-8" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#111111] transition-colors p-2"
            >
              <FiChevronRight strokeWidth={1} className="w-8 h-8" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-500 rounded-none ${
                  i === current ? "w-8 h-[1px] bg-[#111111]" : "w-4 h-[1px] bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

