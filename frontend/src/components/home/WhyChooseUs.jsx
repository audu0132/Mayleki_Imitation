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
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container-luxury">
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl font-medium text-[#111111] leading-tight mb-6 text-center">
            The Mayleki Difference
          </h2>
          <p className="font-poppins text-sm text-gray-500 font-light leading-relaxed max-w-xl text-center mx-auto">
            We are passionate about making every woman feel like royalty on her special day. Our dedication to craftsmanship and quality sets us apart.
          </p>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-b border-gray-200 py-8">
            {[
              { value: "5000+", label: "Happy Customers" },
              { value: "1000+", label: "Exclusive Designs" },
              { value: "500+", label: "Rentals Completed" },
              { value: "4.9/5", label: "Average Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center flex flex-col items-center justify-center">
                <p className="font-playfair text-3xl font-medium text-[#111111] mb-2">{value}</p>
                <p className="font-poppins text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="w-full mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 justify-center">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center text-center gap-4"
              >
                <span className="font-playfair text-3xl text-[#D4AF37] opacity-60 mb-1">0{i + 1}</span>
                <div>
                  <h3 className="font-playfair text-xl font-medium text-[#111111] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm text-gray-500 font-light leading-relaxed max-w-sm mx-auto">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

