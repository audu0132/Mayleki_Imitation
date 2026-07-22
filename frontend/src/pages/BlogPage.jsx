import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BLOG_POSTS } from "../data/mockData";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog | Mayleki Jewellery</title>
        <meta name="description" content="Bridal jewellery tips, styling guides, jewellery care and fashion trends from Mayleki." />
      </Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative text-center">
            <p className="section-subtitle mb-3">Our Stories</p>
            <h1 className="font-playfair text-5xl font-bold text-cream">
              Jewellery <span className="text-gold-gradient">Blog</span>
            </h1>
            <div className="gold-divider mt-4" />
          </div>
        </div>
        <div className="container-luxury py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-brown-light rounded-3xl overflow-hidden shadow-card hover:shadow-gold border border-transparent hover:border-gold/20 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="badge-gold">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-xs font-poppins text-gray-400">
                    <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{post.readTime} read</span>
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-dark-brown dark:text-cream mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h2>
                  <p className="font-poppins text-sm text-gray-500 line-clamp-3 mb-4">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-gold hover:gap-3 transition-all duration-200">
                    Read More <FiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
