import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { CATEGORIES } from "../../data/mockData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CategoryGrid() {
  return (
    <section className="w-full relative py-20 sm:py-24 lg:py-28 bg-cream dark:bg-dark-brown scroll-mt-24 overflow-hidden" id="collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header - Centered Horizontally & Vertically */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <p className="section-subtitle text-center mb-2.5">Browse By</p>
          <h2 className="section-title text-center mb-4">
            Our <span className="text-gold-gradient">Collections</span>
          </h2>
          <div className="gold-divider my-4 mx-auto" />
          <p className="section-description text-center max-w-2xl mx-auto mt-4 mb-0 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            From traditional Maharashtrian jewellery to modern American Diamond sets,
            explore our wide range of premium imitation jewellery.
          </p>
        </motion.div>

        {/* Collection Grid (Centered & Evenly Distributed) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 justify-items-center justify-center items-stretch"
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={itemVariants} className="w-full h-full flex justify-center">
              <Link
                to={`/category/${category.slug}`}
                className="group block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white dark:bg-dark-brown-light shadow-card hover:shadow-gold border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between">
                  {/* Image Container with fixed 1:1 Aspect Ratio */}
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-dark-brown">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient Overlay for high text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 via-dark-brown/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Top-Right Icon Badge (equal 14px top and right insets) */}
                  <div
                    aria-hidden="true"
                    className="absolute top-3.5 right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/90 text-dark-brown font-semibold flex items-center justify-center text-sm sm:text-base shadow-gold z-10 pointer-events-none transition-transform duration-300 group-hover:scale-110"
                  >
                    {category.icon}
                  </div>

                  {/* Content Overlay at bottom with consistent bottom padding */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-center z-10 pointer-events-none flex flex-col justify-end min-h-[4.5rem]">
                    <h3 className="font-poppins font-semibold text-cream text-sm sm:text-base leading-tight mb-1 drop-shadow-sm truncate">
                      {category.name}
                    </h3>
                    <p className="font-poppins text-xs font-medium text-gold/90 group-hover:text-gold transition-colors tracking-wide uppercase">
                      {category.count} designs
                    </p>
                  </div>

                  {/* Subtle Gold Shimmer on hover */}
                  <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center items-center text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <Link
            to="/products"
            className="btn-gold-outline text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 inline-flex items-center gap-2.5 transition-all duration-300 hover:shadow-gold group"
          >
            View All Collections <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


