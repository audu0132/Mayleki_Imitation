import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "../../data/mockData";

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center w-full mb-16">
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A059] mb-2">
            𑁍 Heritage & Quality
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2] leading-tight mb-4">
            The Mayleki Guarantee
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
            Born in Rahuri, Maharashtra, Mayleki Jewellery delivers timeless bridal craftsmanship, 100% authentic polish, and seamless jewellery rental services.
          </p>

          {/* Stats Bar */}
          <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-[#C5A059]/25 py-8 bg-white/50 dark:bg-[#1C1917]/50 backdrop-blur-xs">
            {[
              { value: "5,000+", label: "Happy Brides" },
              { value: "1,000+", label: "Authentic Designs" },
              { value: "500+",  label: "Successful Rentals" },
              { value: "4.9 ★", label: "Customer Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <p className="font-cormorant text-3xl md:text-4xl font-semibold text-[#4A0E17] dark:text-[#E88090]">{value}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white dark:bg-[#1C1917] p-8 border border-[#C5A059]/20 hover:border-[#C5A059] transition-all duration-300 flex flex-col items-center text-center gap-4 group"
            >
              <span className="font-cormorant text-3xl text-[#C5A059] font-bold group-hover:scale-110 transition-transform">
                0{i + 1}
              </span>
              <h3 className="font-cormorant text-2xl font-medium text-[#1C1917] dark:text-[#FAF7F2] group-hover:text-[#C5A059] transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-xs">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
