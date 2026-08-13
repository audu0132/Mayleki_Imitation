import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const PANELS = [
  {
    id: "rent",
    label: "Bridal & Event Rental",
    heading: "Rent Royalty for\nYour Wedding Day",
    subtext: "Experience lavish Maharashtrian bridal sets from just ₹150/day. Professional cleaning, free local pickup, fully refundable deposit.",
    cta: "Browse Bridal Rentals",
    ctaLink: "/rental-booking",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
    badge: "Rental from ₹150 / day",
  },
  {
    id: "buy",
    label: "Boutique Collection",
    heading: "Own Timeless\nTraditional Pieces",
    subtext: "Explore authentic Kolhapuri saaj, nath, Kundan necklaces, and temple jewellery designed to elevate every celebratory look.",
    cta: "Shop Full Catalogue",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80",
    badge: "Exclusive 1GM Gold",
  },
];

export default function CTABanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {PANELS.map((panel, i) => (
        <motion.div
          key={panel.id}
          className="relative overflow-hidden group border-b md:border-b-0 md:border-r border-[#C5A059]/20"
          style={{ minHeight: "500px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.15 }}
        >
          <img
            src={panel.image}
            alt={panel.heading}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#4A0E17]/50 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-8 sm:p-14 min-h-[500px]">
            <span className="inline-block mb-3 self-start font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1C1917] bg-[#C5A059] px-3.5 py-1 shadow-sm">
              {panel.badge}
            </span>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#E5C88A] mb-2 font-semibold">
              𑁍 {panel.label}
            </p>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-normal leading-[1.1] mb-4 whitespace-pre-line">
              {panel.heading}
            </h2>
            <p className="font-sans text-sm text-[#FAF7F2]/80 leading-relaxed mb-8 max-w-md">
              {panel.subtext}
            </p>
            <Link
              to={panel.ctaLink}
              className="self-start inline-flex items-center gap-3 bg-[#FAF7F2] text-[#1C1917] font-sans text-xs font-semibold tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#C5A059] hover:text-white transition-all duration-300 group/btn border border-[#C5A059]"
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
