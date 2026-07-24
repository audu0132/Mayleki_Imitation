import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "../../data/mockData";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-dark-brown relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-gold/5 rounded-full translate-x-48 translate-y-48 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container-luxury relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="section-subtitle">Our Promise</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-3">
            Why Choose <span className="text-gold-gradient">Mayleki?</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-poppins text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            We are passionate about making every woman feel like royalty on her special day.
            Here's why thousands of brides trust us.
          </p>
        </motion.div>

        {/* Features Grid (gap-6 lg:gap-8 = 24px - 32px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 hover:border-gold/40 hover:bg-white/10 transition-all duration-500 cursor-default"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/5 transition-all duration-500" />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <span className="text-2xl">{item.icon}</span>
                {/* Corner accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-300" />
              </div>

              <h3 className="font-playfair text-xl font-bold text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-poppins text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "5000+", label: "Happy Customers", icon: "😊" },
            { value: "1000+", label: "Jewellery Designs", icon: "💎" },
            { value: "500+", label: "Rentals Completed", icon: "🎁" },
            { value: "4.9/5", label: "Average Rating", icon: "⭐" },
          ].map(({ value, label, icon }) => (
            <div
              key={label}
              className="text-center p-6 rounded-2xl bg-gold/5 border border-gold/20 hover:border-gold/40 hover:bg-gold/10 transition-all duration-300"
            >
              <span className="text-3xl mb-2 block">{icon}</span>
              <p className="font-playfair text-3xl font-bold text-gold mb-1">{value}</p>
              <p className="font-poppins text-xs text-gray-400 tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

