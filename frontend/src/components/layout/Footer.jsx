import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiInstagram, FiPhone, FiMail, FiMapPin,
  FiArrowRight, FiHeart, FiClock,
} from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";

const FOOTER_LINKS = {
  collections: [
    { label: "Bridal Sets", href: "/category/bridal-sets" },
    { label: "Necklace Sets", href: "/category/necklace-sets" },
    { label: "Temple Jewellery", href: "/category/temple-jewellery" },
    { label: "Rental Jewellery", href: "/category/rental" },
    { label: "Jhumkas", href: "/category/jhumkas" },
    { label: "Kundan", href: "/category/kundan" },
    { label: "American Diamond", href: "/category/american-diamond" },
    { label: "Oxidised", href: "/category/oxidised" },
  ],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Offers", href: "/offers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Rental Policy", href: "/faq#rental" },
    { label: "Return Policy", href: "/faq#returns" },
    { label: "Damage Policy", href: "/faq#damage" },
    { label: "Shipping Policy", href: "/faq#shipping" },
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-cream relative overflow-hidden mt-16 md:mt-24">

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <motion.div 
          className="container-luxury py-12 md:py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-cream">
                Stay Updated with <span className="text-gold-gradient">New Collections</span>
              </h3>
              <p className="font-poppins text-sm text-gray-400 mt-1.5 max-w-lg">
                Subscribe for exclusive offers, new arrivals, and bridal styling tips.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-72 px-4 py-3 h-[44px] rounded-xl bg-white/10 border border-white/20 text-cream placeholder:text-gray-500 font-poppins text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="btn-gold h-[44px] whitespace-nowrap w-full sm:w-auto">
                Subscribe <FiArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="container-luxury pt-20 md:pt-24 pb-12 md:pb-16">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >

          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/30 flex-shrink-0">
                <img src="/logo.png" alt="Mayleki" className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display="none"; }} />
              </div>
              <div>
                <h2 className="font-playfair text-2xl font-bold text-cream">Mayleki</h2>
                <p className="font-poppins text-xs tracking-widest text-gold uppercase font-semibold">
                  Imitation Jewellery
                </p>
              </div>
            </div>
            <p className="font-poppins text-sm text-gray-400 leading-relaxed">
              Premium imitation & 1GM gold jewellery for every occasion. Specializing in
              bridal sets, Maharashtrian traditional jewellery, and affordable rental services
              in Rahuri, Maharashtra.
            </p>

            {/* Contact Info */}
            <div className="space-y-3.5">
              <a href="https://wa.me/919876543210" className="flex items-center gap-3 text-sm font-poppins text-gray-400 hover:text-gold transition-colors group">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 flex-shrink-0">
                  <FaWhatsapp className="w-4 h-4 text-green-400" />
                </div>
                +91 98765 43210
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm font-poppins text-gray-400 hover:text-gold transition-colors group">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 flex-shrink-0">
                  <FiPhone className="w-4 h-4 text-gold" />
                </div>
                +91 98765 43210
              </a>
              <a href="mailto:hello@mayleki.com" className="flex items-center gap-3 text-sm font-poppins text-gray-400 hover:text-gold transition-colors group">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 flex-shrink-0">
                  <FiMail className="w-4 h-4 text-gold" />
                </div>
                hello@mayleki.com
              </a>
              <div className="flex items-start gap-3 text-sm font-poppins text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin className="w-4 h-4 text-gold" />
                </div>
                Rahuri, Ahmednagar District,<br />Maharashtra — 413706
              </div>
              <div className="flex items-center gap-3 text-sm font-poppins text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <FiClock className="w-4 h-4 text-gold" />
                </div>
                Mon–Sat: 10:00 AM – 8:00 PM
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/919876543210", bg: "bg-green-500", label: "WhatsApp" },
                { icon: FiInstagram, href: "#", bg: "bg-gradient-to-br from-purple-500 to-rose-500", label: "Instagram" },
                { icon: FaFacebook, href: "#", bg: "bg-blue-600", label: "Facebook" },
                { icon: FaYoutube, href: "#", bg: "bg-red-600", label: "YouTube" },
              ].map(({ icon: Icon, href, bg, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-200`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-playfair text-lg font-bold text-cream mb-6 relative inline-block">
              Collections
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gold-gradient rounded-full" />
            </h4>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-poppins text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-playfair text-lg font-bold text-cream mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gold-gradient rounded-full" />
            </h4>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-poppins text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policies + Badges */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-playfair text-lg font-bold text-cream mb-6 relative inline-block">
              Policies
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gold-gradient rounded-full" />
            </h4>
            <ul className="space-y-3.5 mb-8">
              {FOOTER_LINKS.policies.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-poppins text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <div className="space-y-3">
              <p className="font-poppins text-xs font-semibold text-gold tracking-wider uppercase">
                We Accept
              </p>
              <div className="flex flex-wrap gap-2">
                {["UPI", "VISA", "Mastercard", "Razorpay", "COD"].map((m) => (
                  <span key={m} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-poppins text-gray-300 border border-white/10">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Mayleki Imitation Jewellery. All rights reserved. Rahuri, Maharashtra.
          </p>
          <p className="font-poppins text-xs text-gray-500 flex items-center gap-1">
            Made with <FiHeart className="w-3.5 h-3.5 text-rose-gold" /> for beautiful brides
          </p>
        </div>
      </div>

    </footer>
  );
}
