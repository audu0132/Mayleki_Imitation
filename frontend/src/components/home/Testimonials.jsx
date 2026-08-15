import { motion } from "framer-motion";

const EDITORIAL_TESTIMONIALS = [
  {
    quote: "Every piece looked even more beautiful in person. The Kolhapuri saaj set made my special bridal day feel truly memorable and royal.",
    name: "Priyanka Deshmukh",
    role: "Bridal Client, Rahuri",
  },
  {
    quote: "The rental process was seamless. The Kundan necklace was pristine, sanitised, and received endless compliments at my reception.",
    name: "Ananya Patil",
    role: "Event Client, Ahmednagar",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-2">
            𑁍 BRIDAL TESTIMONIALS
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2]">
            Words from Our Brides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {EDITORIAL_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-white dark:bg-[#1C1917] p-10 border border-[#C5A059]/20 relative flex flex-col justify-between"
            >
              <span className="font-cormorant text-7xl text-[#C5A059]/30 leading-none absolute top-4 left-6 pointer-events-none select-none">
                “
              </span>
              <p className="font-cormorant text-2xl sm:text-3xl text-[#1C1917] dark:text-[#FAF7F2] font-normal leading-snug mb-8 relative z-10 pt-4 italic">
                "{t.quote}"
              </p>

              <div className="border-t border-[#C5A059]/20 pt-4">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917] dark:text-[#FAF7F2]">
                  {t.name}
                </h4>
                <p className="font-sans text-[10px] text-[#C5A059] uppercase tracking-wider font-medium mt-0.5">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
