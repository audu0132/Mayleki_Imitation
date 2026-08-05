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
    <footer className="bg-[#111111] text-white pt-20 pb-10 text-center ">
      <div className="container-luxury">
        
        {/* Newsletter Section - Editorial Style */}
        <motion.div 
          className="flex flex-col items-center justify-center text-center border-b border-gold/20 pb-16 mb-16 w-full max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-playfair text-3xl md:text-4xl font-medium text-white mb-4 leading-tight">
              Join the Mayleki Society
            </h3>
            <p className="font-poppins text-sm text-gray-400 font-light tracking-wide max-w-md">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-md relative"
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="w-full bg-transparent border-b border-white/30 text-white font-poppins text-xs tracking-widest py-3 focus:outline-none focus:border-white transition-colors uppercase placeholder:text-gray-500 text-center"
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-2">
              <FiArrowRight strokeWidth={1} className="w-5 h-5" />
            </button>
          </form>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 w-full">
          
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-playfair text-2xl font-medium tracking-widest text-white mb-6 uppercase">Mayleki</h2>
            <p className="font-poppins text-xs text-gray-400 font-light leading-loose max-w-xs mb-8">
              Premium imitation & 1GM gold jewellery. Specializing in bridal sets, Maharashtrian traditional jewellery, and affordable rental services in Rahuri, Maharashtra.
            </p>
            <div className="flex items-center gap-6">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/919139236500" },
                { icon: FiInstagram, href: "#" },
                { icon: FaFacebook, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-poppins text-[10px] font-medium tracking-[0.2em] text-white mb-8 uppercase">
              Collections
            </h4>
            <ul className="flex flex-col items-center md:items-start space-y-4">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-poppins text-xs text-gray-400 font-light hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-poppins text-[10px] font-medium tracking-[0.2em] text-white mb-8 uppercase">
              Company
            </h4>
            <ul className="flex flex-col items-center md:items-start space-y-4">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-poppins text-xs text-gray-400 font-light hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Client Services */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-poppins text-[10px] font-medium tracking-[0.2em] text-white mb-8 uppercase">
              Client Services
            </h4>
            <ul className="flex flex-col items-center md:items-start space-y-4 mb-8">
              {FOOTER_LINKS.policies.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-poppins text-xs text-gray-400 font-light hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <p className="font-poppins text-xs text-gray-400 font-light mb-2">
              <a href="mailto:hello@mayleki.com" className="hover:text-gold transition-colors">hello@mayleki.com</a>
            </p>
            <p className="font-poppins text-xs text-gray-400 font-light">
              <a href="tel:+919139236500" className="hover:text-gold transition-colors">+91 91392 36500</a>
            </p>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col items-center justify-center gap-6 border-t border-gold/20 text-center">
          <p className="font-poppins text-[10px] text-gray-500 tracking-widest uppercase">
            © {new Date().getFullYear()} MAYLEKI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            {["UPI", "VISA", "MASTERCARD"].map((m) => (
              <span key={m} className="font-poppins text-[9px] tracking-widest uppercase border border-gray-700 px-2 py-1">
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
