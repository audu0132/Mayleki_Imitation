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
    <section className="relative overflow-hidden py-24 lg:py-32">

      {/* Background */}

      <motion.img
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.08 }}
        transition={{ duration: 12 }}
        viewport={{ once: true }}
        src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=2000&q=80"
        alt="Luxury Jewellery"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />

      {/* Gold Pattern */}

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#D4AF37 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Decorative Blur */}

      <div className="absolute -top-32 left-0 h-72 w-72 rounded-full bg-gold/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl lg:p-16 text-center shadow-[0_30px_80px_rgba(0,0,0,.35)]"
        >

          <p className="section-subtitle mb-4">
            Book Your Bridal Look
          </p>

          <h2 className="font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Make Your{" "}
            <span className="text-gold-gradient">
              Wedding Day
            </span>{" "}
            Unforgettable
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75">
            Discover elegant bridal jewellery crafted to make your special
            moments unforgettable. Choose from premium rental collections
            or purchase timeless designs for every celebration.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

            <Link
              to="/category/bridal-sets"
              className="group btn-gold px-10 py-4 text-base"
            >
              Explore Collection

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>

            <Link
              to="/rental-booking"
              className="rounded-full border border-white/20 bg-white/5 px-10 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-white/10 hover:shadow-lg"
            >
              Book Rental
            </Link>

          </div>

          {/* Contact */}

          <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8">

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 transition hover:text-green-400"
            >
              <FaWhatsapp size={20} />
              WhatsApp
            </a>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-white/70 transition hover:text-gold"
            >
              <FiPhone size={20} />
              Call Now
            </a>

            <div className="flex items-center gap-2 text-white/70">
              📍 Rahuri, Maharashtra
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}