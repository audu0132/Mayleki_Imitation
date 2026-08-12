import { motion } from "framer-motion";
import { FiPackage, FiRefreshCw, FiTruck, FiShield } from "react-icons/fi";

const TRUST_ITEMS = [
  {
    icon: FiShield,
    title: "100% Authentic",
    desc: "Premium quality guaranteed",
  },
  {
    icon: FiTruck,
    title: "Free Delivery",
    desc: "On orders above Rs.999",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    desc: "7-day hassle-free returns",
  },
  {
    icon: FiPackage,
    title: "Secure Packaging",
    desc: "Safe & gift-ready delivery",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#faf8f5] border-y border-gray-100">
      <div className="container-luxury">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-4 px-6 py-8 text-center sm:text-left group hover:bg-white transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center group-hover:bg-[#C9A227]/20 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-[#C9A227]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-poppins text-xs font-semibold text-dark-brown mb-0.5 tracking-wide">
                  {item.title}
                </h3>
                <p className="font-poppins text-[10px] text-gray-500 leading-snug">
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
