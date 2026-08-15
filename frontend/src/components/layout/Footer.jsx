import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiInstagram, FiPhone, FiMail, FiMapPin,
  FiArrowRight, FiHeart, FiClock, FiStar,
} from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";

const FOOTER_LINKS = {
  collections: [
    { label: "Bridal Sets", href: "/category/bridal-sets" },
    { label: "Kolhapuri Saaj", href: "/category/kolhapuri-saaj" },
    { label: "Nath & Accessories", href: "/category/nath" },
    { label: "Rental Jewellery", href: "/rental-booking" },
    { label: "Temple Jewellery", href: "/category/temple-jewellery" },
    { label: "Kundan Sets", href: "/category/kundan" },
    { label: "1GM Gold Collection", href: "/category/1gm-gold" },
    { label: "Bangles & Jhumkas", href: "/category/bangles" },
  ],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog & Articles", href: "/blog" },
    { label: "Offers & Discounts", href: "/offers" },
    { label: "FAQ & Help", href: "/faq" },
    { label: "Contact Boutique", href: "/contact" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Rental Terms", href: "/faq#rental" },
    { label: "Return & Replacement", href: "/faq#returns" },
    { label: "Damage & Security Deposit", href: "/faq#damage" },
    { label: "Shipping & Delivery", href: "/faq#shipping" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#181214] text-[#FAF7F2] pt-20 pb-12 border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <motion.div 
          className="flex flex-col items-center justify-center text-center border-b border-[#C5A059]/20 pb-16 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-2">
            𑁍 Join the Mayleki Circle
          </p>
          <h3 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#FAF7F2] mb-3 leading-tight">
            Subscribe for Private Offers & New Collections
          </h3>
          <p className="font-sans text-xs text-gray-400 font-light tracking-wide max-w-md mb-8">
            Be the first to receive updates on new bridal launches, rental collection restocks, and boutique events in Rahuri.
          </p>
          
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-md relative flex items-center border-b border-[#C5A059]/50 focus-within:border-[#C5A059] transition-colors"
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL ADDRESS"
              className="w-full bg-transparent text-[#FAF7F2] font-sans text-xs tracking-widest py-3 focus:outline-none uppercase placeholder:text-gray-500 pr-10"
            />
            <button type="submit" className="text-[#C5A059] hover:text-[#E5C88A] transition-colors p-2" aria-label="Subscribe">
              <FiArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <h2 className="font-cormorant text-3xl font-semibold tracking-wide text-[#FAF7F2] mb-1">Mayleki</h2>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-4">Imitation Jewellery</p>
            <p className="font-sans text-xs text-gray-400 font-light leading-relaxed mb-6">
              Rahuri's premier boutique for Maharashtrian imitation jewellery, bridal sets, and affordable rental jewellery crafted for your special moments.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/919139236500" },
                { icon: FiInstagram, href: "https://instagram.com" },
                { icon: FaFacebook, href: "https://facebook.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#C5A059]/30 text-[#E5C88A] hover:bg-[#C5A059] hover:text-[#1C1917] flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C5A059] mb-6 uppercase">
              Collections
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-gray-400 hover:text-[#C5A059] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C5A059] mb-6 uppercase">
              Boutique & Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-gray-400 hover:text-[#C5A059] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C5A059] mb-6 uppercase">
              Boutique Location
            </h4>
            <div className="space-y-3 font-sans text-xs text-gray-400 font-light">
              <p className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Mayleki Jewellery Studio, Main Market Road, Rahuri, Ahmednagar, Maharashtra 413706</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <a href="tel:+919139236500" className="hover:text-[#C5A059] transition-colors">+91 91392 36500</a>
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <a href="mailto:hello@mayleki.com" className="hover:text-[#C5A059] transition-colors">hello@mayleki.com</a>
              </p>
              <p className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-sans text-[10px] text-gray-400 tracking-widest uppercase">
            © {new Date().getFullYear()} MAYLEKI IMITATION JEWELLERY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            {["UPI", "RAZORPAY", "VISA", "COD"].map((m) => (
              <span key={m} className="font-sans text-[9px] tracking-widest uppercase border border-[#C5A059]/30 text-[#C5A059] px-2 py-0.5">
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
