import { motion } from "framer-motion";

const STATS = [
  { value: "10+", label: "Years of Elegance" },
  { value: "500+", label: "Happy Customers" },
  { value: "1000+", label: "Jewellery Pieces" },
  { value: "Premium", label: "Craftsmanship" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 border-y border-[#C5A059]/25 py-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-normal text-[#1C1917] dark:text-[#FAF7F2] group-hover:text-[#C5A059] transition-colors leading-none tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A059] block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
