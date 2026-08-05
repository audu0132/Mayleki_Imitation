import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { CATEGORIES } from "../../data/mockData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CategoryGrid() {
  return (
    <section id="collections" className="py-24 bg-white ">
      <div className="container-luxury ">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center mb-16 gap-6 justify-items-center"
        >
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-items-center">
            <h2 className="section-title text-center mb-2">
              Explore Collections
            </h2>
            <p className="section-description text-center ">
              Curated selections of fine imitation jewellery, crafted with precision for your most memorable moments.
            </p>
          </div>
          <Link
            to="/products"
            className="font-poppins text-xs font-medium uppercase tracking-widest text-[#111111] hover:text-gold transition-colors border-b border-[#111111] hover:border-gold pb-1 whitespace-nowrap mt-2"
          >
            View All Collections
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 md:gap-6 w-full justify-center"
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={itemVariants} className="group cursor-pointer">
              <Link to={`/category/${category.slug}`} className="block h-full card-gold-border !p-4 !pb-6 border-transparent hover:border-gold shadow-card hover:shadow-card-hover overflow-hidden rounded-2xl bg-white relative">
                <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-gray-100 rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="btn-gold !bg-white/90 !text-dark-brown !py-2 !px-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                       View Collection
                     </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-serif text-lg font-normal text-dark-brown mb-1 group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="font-poppins text-[10px] uppercase tracking-widest text-gray-400">
                    Explore
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
