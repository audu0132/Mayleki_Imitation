import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { CATEGORIES } from "../../data/mockData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-cream dark:bg-dark-brown">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-subtitle mb-3">Browse By</p>
          <h2 className="section-title mb-4">
            Our <span className="text-gold-gradient">Collections</span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="section-description mx-auto">
            From traditional Maharashtrian jewellery to modern American Diamond sets,
            explore our wide range of premium imitation jewellery.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={`/category/${category.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-brown-light shadow-card hover:shadow-gold border border-transparent hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                      loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-dark-brown/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gold/90 flex items-center justify-center text-sm shadow-gold">
                    {category.icon}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <h3 className="font-poppins font-semibold text-cream text-sm leading-tight mb-1">
                      {category.name}
                    </h3>
                    <p className="font-poppins text-xs text-gold/80 group-hover:text-gold transition-colors">
                      {category.count} designs
                    </p>
                  </div>

                  {/* Gold shimmer on hover */}
                  <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/products" className="btn-gold-outline text-base px-10 py-4 inline-flex items-center gap-2">
            View All Collections <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
