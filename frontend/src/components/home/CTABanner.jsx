import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function CTABanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/95 via-dark-brown/80 to-dark-brown/60" />
      </div>

      {/* Gold pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative container-luxury">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle">Book Your Bridal Look</p>
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-cream mb-6 leading-tight">
              Make Your <span className="text-gold-gradient">Wedding Day</span> Unforgettable
            </h2>
            <p className="font-poppins text-sm md:text-base text-cream/80 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto">
              From traditional Maharashtrian jewellery to modern bridal sets,
              we have everything to make you shine on your special day.
              Rental and purchase options available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/category/bridal-sets"
                className="btn-gold text-base px-10 py-4 w-full sm:w-auto"
              >
                Explore Bridal Collection <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/rental-booking"
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-full border-2 border-white/30 text-cream font-poppins font-semibold text-base hover:border-gold/60 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
              >
                Book Rental
              </Link>
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/70 hover:text-green-400 transition-colors font-poppins text-sm"
              >
                <FaWhatsapp className="w-4 h-4" />
                +91 98765 43210
              </a>
              <div className="hidden sm:block w-px h-4 bg-white/30" />
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors font-poppins text-sm"
              >
                <FiPhone className="w-4 h-4" />
                Call Us
              </a>
              <div className="hidden sm:block w-px h-4 bg-white/30" />
              <span className="font-poppins text-sm text-cream/70">
                📍 Rahuri, Maharashtra
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

