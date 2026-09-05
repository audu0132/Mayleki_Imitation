import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function HeroBanner() {
  const imageRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.addEventListener("mousemove", handleMouse, { passive: true });
    }
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const textReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 0.5 + i * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const ctaReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1100px] overflow-hidden bg-charcoal">
      {/* Background Image with parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          ref={imageRef}
          className="absolute inset-[-20px] transition-transform duration-[2s] ease-out"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=85"
            alt="Premium jewellery editorial"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
        <div className="container-luxury">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block font-body text-[10px] font-semibold tracking-[0.4em] uppercase text-champagne mb-6"
            >
              Mayleki Jewellery
            </motion.span>

            {/* Display Heading — Line by Line */}
            <h1 className="mb-6">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textReveal}
                className="block font-display text-display-xl text-ivory leading-none"
              >
                Timeless
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textReveal}
                className="block font-display text-display-xl text-ivory italic leading-none"
              >
                Elegance
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="font-body text-sm sm:text-base text-ivory/70 font-light max-w-lg mb-10 leading-relaxed"
            >
              Jewellery designed to make every moment unforgettable.
              Premium Maharashtrian bridal sets crafted for your story.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={ctaReveal}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/products" className="btn-primary-luxury bg-ivory !text-charcoal border-ivory hover:bg-champagne hover:border-champagne hover:!text-charcoal">
                Shop Collection
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/category/bridal-sets" className="btn-outline-luxury border-ivory/40 !text-ivory hover:bg-ivory hover:!text-charcoal">
                Explore New Arrivals
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Right — Floating Detail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 right-8 hidden lg:block z-10"
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-ivory/40">
          Rahuri, Maharashtra
        </span>
      </motion.div>
    </section>
  );
}
