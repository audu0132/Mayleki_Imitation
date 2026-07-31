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
    <section
      id="collections"
      className="relative overflow-hidden bg-cream dark:bg-dark-brown py-16 lg:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="section-subtitle mb-3">
            Browse By
          </p>

          <h2 className="section-title">
            Our <span className="text-gold-gradient">Collections</span>
          </h2>

          <div className="gold-divider mx-auto my-5" />

          <p className="section-description text-gray-600 dark:text-gray-400">
            Discover premium imitation jewellery crafted for every occasion,
            from traditional Maharashtrian bridal sets to elegant American
            Diamond collections.
          </p>
        </motion.div>

        {/* Grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="h-full"
            >
              <Link
                to={`/category/${category.slug}`}
                className="group block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-gold dark:bg-dark-brown-light">

                  {/* Image */}

                  <div className="relative aspect-square overflow-hidden">

                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  </div>

                  {/* Badge */}

                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 10,
                    }}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-dark-brown shadow-lg"
                  >
                    {category.icon}
                  </motion.div>

                  {/* Content */}

                  <div className="absolute bottom-0 w-full p-5 text-center">

                    <h3 className="mb-1 truncate font-poppins text-base font-semibold text-white">
                      {category.name}
                    </h3>

                    <p className="text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-yellow-300">
                      {category.count} Designs
                    </p>

                  </div>

                  {/* Hover Shine */}

                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

                    <div className="absolute -left-40 top-0 h-full w-20 rotate-12 bg-white/20 blur-xl transition-all duration-700 group-hover:left-[120%]" />

                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: .2,
            duration: .6,
          }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/products"
            className="btn-gold-outline group inline-flex items-center gap-3"
          >
            View All Collections
            <FiArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}