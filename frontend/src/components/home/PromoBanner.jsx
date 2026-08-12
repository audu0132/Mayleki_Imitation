import { motion } from "framer-motion";

const PROMO_ITEMS = [
  "Bridal Collection 2025",
  "Rental From ₹150",
  "Free Delivery on ₹999+",
  "Easy 7-Day Returns",
  "100% Authentic Designs",
  "Traditional & Modern Jewellery",
  "Kolhapuri Saaj Collection",
  "American Diamond Sets",
  "Bridal Collection 2025",
  "Rental From ₹150",
  "Free Delivery on ₹999+",
  "Easy 7-Day Returns",
  "100% Authentic Designs",
  "Traditional & Modern Jewellery",
  "Kolhapuri Saaj Collection",
  "American Diamond Sets",
];

export default function PromoBanner() {
  return (
    <div className="overflow-hidden bg-[#1a1410] py-4 border-y border-gold/10">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {PROMO_ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 font-poppins text-[11px] font-semibold tracking-[0.2em] uppercase"
          >
            <span className="text-[#C9A227]">{item}</span>
            <span className="text-[#C9A227]/30 text-[8px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
