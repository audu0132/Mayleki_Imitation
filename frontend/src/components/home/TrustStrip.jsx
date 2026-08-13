import { motion } from "framer-motion";
import { FiPackage, FiRefreshCw, FiTruck, FiShield } from "react-icons/fi";

const TRUST_ITEMS = [
  {
    icon: FiShield,
    title: "100% Authentic Quality",
    desc: "Premium gold-plated finish",
  },
  {
    icon: FiTruck,
    title: "Free Express Shipping",
    desc: "On orders above ₹999",
  },
  {
    icon: FiRefreshCw,
    title: "Hassle-Free Returns",
    desc: "7-day easy return policy",
  },
  {
    icon: FiPackage,
    title: "Boutique Packaging",
    desc: "Safe & luxury gift box",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#4A0E17] text-[#FAF7F2] border-y border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#C5A059]/20">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-4 px-6 py-7 text-center sm:text-left hover:bg-white/5 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-none bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#E5C88A]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans text-xs font-semibold text-[#FAF7F2] mb-0.5 tracking-wider uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-[11px] text-[#E5C88A]/80 leading-snug">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
