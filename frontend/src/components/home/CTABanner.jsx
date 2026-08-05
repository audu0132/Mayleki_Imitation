import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
export default function CTABanner() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-[#111111] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=2000&q=80"
          alt="Luxury Jewellery"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <p className="font-poppins text-xs font-medium uppercase tracking-[0.3em] text-white/80 mb-6">
          Book Your Bridal Look
        </p>
        
        <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-8 text-shadow-luxury">
          Make Your Wedding Day <br className="hidden md:block" />
          <span className="italic font-light">Unforgettable</span>
        </h2>
        
        <p className="font-poppins text-sm text-white/70 font-light max-w-lg mx-auto mb-12 leading-relaxed">
          Discover elegant bridal jewellery crafted to make your special moments unforgettable. Choose from premium rental collections or purchase timeless designs.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            to="/category/bridal-sets"
            className="btn-gold group relative overflow-hidden"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury" />
          </Link>
          <Link
            to="/rental-booking"
            className="btn-gold-outline group relative overflow-hidden bg-white !text-dark-brown !border-white hover:!bg-transparent hover:!text-white"
          >
            <span className="relative z-10">Book Rental</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury" />
          </Link>
        </div>
      </div>
    </section>
  );
}
