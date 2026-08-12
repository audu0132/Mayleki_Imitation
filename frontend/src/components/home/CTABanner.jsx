import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const PANELS = [
  {
    id: "rent",
    label: "Jewellery Rental",
    heading: "Rent for\nYour Special Day",
    subtext: "Premium bridal jewellery rental starting from Rs.150. Look like royalty without the price tag.",
    cta: "Browse Rentals",
    ctaLink: "/category/rental",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
    badge: "From Rs.150 / day",
  },
  {
    id: "buy",
    label: "Shop Collection",
    heading: "Own Timeless\nPieces Forever",
    subtext: "Discover our exquisite collection of imitation jewellery crafted to perfection for every occasion.",
    cta: "Shop Now",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80",
    badge: "New Arrivals",
  },
];

export default function CTABanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {PANELS.map((panel, i) => (
        <motion.div
          key={panel.id}
          className="relative overflow-hidden group"
          style={{ minHeight: "480px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.15 }}
        >
          <img
            src={panel.image}
            alt={panel.heading}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 via-dark-brown/50 to-dark-brown/20" />
          <div className="relative z-10 flex flex-col justify-end h-full p-8 sm:p-12 min-h-[480px]">
            <span className="inline-block mb-4 self-start font-poppins text-[10px] font-semibold tracking-[0.2em] uppercase text-white bg-[#C9A227] px-3 py-1">
              {panel.badge}
            </span>
            <p className="font-poppins text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2">
              {panel.label}
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl text-white font-normal leading-[1.15] mb-4 whitespace-pre-line">
              {panel.heading}
            </h2>
            <p className="font-poppins text-sm text-white/70 leading-relaxed mb-8 max-w-sm">
              {panel.subtext}
            </p>
            <Link
              to={panel.ctaLink}
              className="self-start inline-flex items-center gap-3 bg-white text-dark-brown font-poppins text-[11px] font-semibold tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-[#C9A227] hover:text-white transition-all duration-300 group/btn"
            >
              <span>{panel.cta}</span>
              <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
