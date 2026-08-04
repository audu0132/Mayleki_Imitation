import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "../../data/mockData";

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream w-full flex justify-center">
      {/* inner wrapper — centered by the flex parent, not mx-auto */}
      <div className="w-full max-w-5xl px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center w-full mb-16">
          <p className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
            Why Us
          </p>
          <h2 className="w-full font-playfair text-4xl md:text-5xl lg:text-6xl font-normal text-dark-brown leading-tight text-center mb-4">
            The Mayleki Difference
          </h2>
          <p className="font-poppins text-sm md:text-base text-gray-500 leading-relaxed text-center max-w-xl">
            We are passionate about making every woman feel like royalty on her
            special day. Our dedication to craftsmanship and quality sets us apart.
          </p>

          {/* Stats bar */}
          <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-200 py-8">
            {[
              { value: "5000+", label: "Happy Customers" },
              { value: "1000+", label: "Exclusive Designs" },
              { value: "500+",  label: "Rentals Completed" },
              { value: "4.9/5", label: "Average Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <p className="font-playfair text-3xl font-normal text-dark-brown">{value}</p>
                <p className="font-poppins text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center text-center gap-3"
            >
              <span className="font-playfair text-3xl text-gold opacity-60">
                0{i + 1}
              </span>
              <h3 className="font-playfair text-xl font-normal text-dark-brown">
                {item.title}
              </h3>
              <p className="font-poppins text-sm text-gray-500 font-light leading-relaxed max-w-xs">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
