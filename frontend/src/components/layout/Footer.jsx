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
    <footer className="bg-[#111111] text-[#FFFDF8] pt-16 pb-10 border-t border-[rgba(212,175,55,0.18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="flex flex-col items-center justify-center text-center pb-12 mb-12 border-b border-[rgba(212,175,55,0.18)] max-w-3xl mx-auto">
          <span className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.25)] px-3 py-1 rounded-full mb-3">
            𑁍 Join the Mayleki Circle
          </span>
          <h3 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#FFFDF8] mb-2 leading-tight">
            Subscribe for Private Offers & New Collections
          </h3>
          <p className="font-sans text-xs text-[#A9A9A9] font-light tracking-wide max-w-md mb-6">
            Be the first to receive updates on new bridal launches, rental collection restocks, and boutique events in Rahuri.
          </p>
          
          <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md flex items-center bg-[#1F1B19] border border-[rgba(212,175,55,0.3)] p-1 rounded-lg">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL ADDRESS"
              className="w-full bg-transparent text-[#FFFDF8] font-sans text-xs tracking-widest px-3 py-2.5 focus:outline-none uppercase placeholder:text-[#A9A9A9]"
            />
            <button type="submit" className="bg-[#D4AF37] hover:bg-[#E6C76A] text-[#111111] font-semibold px-4 py-2.5 rounded transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Subscribe">
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <h2 className="font-cormorant text-3xl font-semibold tracking-wide text-[#FFFDF8] mb-1">Mayleki</h2>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">Imitation Jewellery</p>
            <p className="font-sans text-xs text-[#A9A9A9] font-light leading-relaxed mb-5">
              Rahuri's premier boutique for Maharashtrian imitation jewellery, bridal sets, and affordable rental jewellery crafted for your special moments.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/919139236500" },
                { icon: FiInstagram, href: "https://www.instagram.com/mayleki_imitation/?hl=en" },
                { icon: FaFacebook, href: "https://facebook.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#3B2F2F] rounded-md flex items-center justify-center transition-all duration-300 shadow-2xs"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#D4AF37] mb-5 uppercase">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold transition-colors block w-fit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#D4AF37] mb-5 uppercase">
              Boutique & Links
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold transition-colors block w-fit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#D4AF37] mb-5 uppercase">
              Boutique Location
            </h4>
            <div className="space-y-3 font-sans text-xs text-[#A9A9A9] font-light">
              <p className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Mayleki Jewellery Studio, Main Market Road, Rahuri, Ahmednagar, Maharashtra 413706</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+919139236500" className="text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold transition-colors">+91 91392 36500</a>
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:hello@mayleki.com" className="text-[#D4AF37] hover:text-[#E6C76A] hover-underline-gold transition-colors">hello@mayleki.com</a>
              </p>
              <p className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[rgba(212,175,55,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-sans text-[10px] text-[#A9A9A9] tracking-widest uppercase">
            © {new Date().getFullYear()} MAYLEKI IMITATION JEWELLERY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            {["UPI", "RAZORPAY", "VISA", "COD"].map((m) => (
              <span key={m} className="font-sans text-[9px] tracking-widest uppercase border border-[rgba(212,175,55,0.25)] text-[#D4AF37] px-2 py-0.5 rounded-sm">
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
