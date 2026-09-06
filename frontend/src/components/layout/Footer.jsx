import { Link } from "react-router-dom";
import { FiInstagram, FiPhone, FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const FOOTER_LINKS = {
  collections: [
    { label: "Bridal Sets", href: "/category/bridal-sets" },
    { label: "Kolhapuri Saaj", href: "/category/kolhapuri-saaj" },
    { label: "Nath & Accessories", href: "/category/nath" },
    { label: "Temple Jewellery", href: "/category/temple-jewellery" },
    { label: "Kundan Sets", href: "/category/kundan" },
    { label: "Rental Jewellery", href: "/rental-booking" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="container-luxury">

        {/* Newsletter Section */}
        <div className="max-w-xl mx-auto text-center mb-14 sm:mb-16">
          <span className="font-body text-eyebrow font-semibold uppercase text-champagne tracking-widest block mb-3">
            Join the Circle
          </span>
          <h3 className="font-display text-display-sm text-ivory mb-3">
            Stay in the know
          </h3>
          <p className="font-body text-xs text-text-secondary mb-6 leading-relaxed">
            New collections, private offers, and boutique events delivered to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-champagne/30 pb-1 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent text-ivory font-body text-sm tracking-wide outline-none placeholder:text-text-secondary py-2"
            />
            <button
              type="submit"
              className="text-champagne hover:text-ivory transition-colors p-2"
              aria-label="Subscribe"
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">

          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-medium tracking-[0.15em] uppercase text-ivory mb-1.5">
              Mayleki
            </h2>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-champagne font-semibold mb-4">
              Jewellery Boutique
            </p>
            <p className="font-body text-xs text-text-secondary leading-relaxed mb-6">
              Rahuri's premier boutique for Maharashtrian imitation jewellery, bridal sets, and luxury rental jewellery crafted for your special moments.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/919139236500", label: "WhatsApp" },
                { icon: FiInstagram, href: "https://www.instagram.com/mayleki_imitation/?hl=en", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-champagne/25 text-champagne hover:bg-champagne hover:text-charcoal flex items-center justify-center transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-champagne mb-5">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-xs text-text-secondary hover:text-champagne transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-champagne mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-xs text-text-secondary hover:text-champagne transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-champagne mb-5">
              Visit Us
            </h4>
            <div className="space-y-3 font-body text-xs text-text-secondary">
              <p className="flex items-start gap-2.5">
                <FiMapPin className="w-3.5 h-3.5 text-champagne flex-shrink-0 mt-0.5" />
                <span>Main Market Road, Rahuri,<br />Ahmednagar, Maharashtra 413706</span>
              </p>
              <p className="flex items-center gap-2.5">
                <FiPhone className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                <a href="tel:+919139236500" className="hover:text-champagne transition-colors">
                  +91 91392 36500
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <FiMail className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                <a href="mailto:hello@mayleki.com" className="hover:text-champagne transition-colors">
                  hello@mayleki.com
                </a>
              </p>
              <p className="text-text-secondary mt-2">
                Mon – Sat: 10 AM – 8 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-champagne/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[10px] text-text-secondary tracking-widest uppercase">
            © {new Date().getFullYear()} Mayleki. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="font-body text-[10px] text-text-secondary hover:text-champagne transition-colors tracking-wider uppercase">
              Privacy
            </Link>
            <Link to="/terms" className="font-body text-[10px] text-text-secondary hover:text-champagne transition-colors tracking-wider uppercase">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
