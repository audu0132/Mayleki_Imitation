import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BLOG_POSTS } from "../data/mockData";
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiBookOpen,
  FiHeart,
  FiAward,
  FiTrendingUp,
  FiMail
} from "react-icons/fi";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(BLOG_POSTS.map((post) => post.category))];

  const filteredPosts = BLOG_POSTS.filter(
    (post) => activeCategory === "All" || post.category === activeCategory
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case "All":
        return <FiBookOpen className="w-4 h-4" />;
      case "Bridal Guide":
        return <FiHeart className="w-4 h-4" />;
      case "Jewellery Care":
        return <FiAward className="w-4 h-4" />;
      case "Fashion Trends":
        return <FiTrendingUp className="w-4 h-4" />;
      default:
        return <FiBookOpen className="w-4 h-4" />;
    }
  };

  // Find featured post (we'll highlight the first post when "All" is selected)
  const featuredPost = activeCategory === "All" ? BLOG_POSTS[0] : null;
  const gridPosts = activeCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <Helmet>
        <title>Blog | Mayleki Jewellery</title>
        <meta name="description" content="Bridal jewellery tips, styling guides, jewellery care and fashion trends from Mayleki." />
      </Helmet>
      
      <div className="page-wrapper relative min-h-screen bg-cream dark:bg-dark-brown overflow-hidden">
        {/* Decorative Top-Right Jewellery Background Image with Gradient Fade */}
        <div 
          className="absolute right-0 top-0 w-full sm:w-[50%] h-[350px] sm:h-[600px] bg-no-repeat bg-cover sm:bg-contain bg-right pointer-events-none opacity-20 sm:opacity-90 transition-opacity duration-500" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1000')", 
            maskImage: "linear-gradient(to left, black 20%, transparent 85%), linear-gradient(to bottom, black 50%, transparent 100%)", 
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%), linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)" 
          }} 
        />

        {/* Geometric Mandala/Flower line drawing decor - Left */}
        <svg className="absolute -left-20 top-[12%] w-72 h-72 opacity-[0.08] text-gold dark:opacity-[0.15] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx="38"
              ry="14"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="8" strokeDasharray="1 1" />
        </svg>

        {/* Geometric Mandala/Flower line drawing decor - Right Bottom */}
        <svg className="absolute -right-20 bottom-[15%] w-72 h-72 opacity-[0.08] text-gold dark:opacity-[0.15] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx="38"
              ry="14"
              transform={`rotate(${i * 15 + 7.5} 50 50)`}
            />
          ))}
        </svg>

        <div className="container-luxury relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center"
            >
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6.5xl font-semibold text-dark-brown dark:text-cream leading-tight">
                Mayleki <span className="text-[#C9A227] dark:text-gold-light mt-1 block sm:inline-block">Chronicles</span>
              </h1>

              {/* Custom Luxury Divider with Diamond */}
              <div className="flex items-center justify-center gap-3 my-5">
                <div className="w-8 h-px bg-[#C9A227]/40" />
                <div className="w-2.5 h-2.5 rotate-45 border border-[#C9A227] bg-transparent flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#C9A227] rounded-full" />
                </div>
                <div className="w-8 h-px bg-[#C9A227]/40" />
              </div>

              <p className="font-poppins text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Discover styling guides, traditional bridal tips, jewellery care rules, and the latest trends from our experts.
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-poppins text-sm font-medium flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#C9A227] to-[#A8891A] text-white shadow-[0_4px_15px_rgba(201,162,39,0.3)] font-semibold"
                        : "bg-white dark:bg-white/10 text-gray-500 dark:text-gray-300 border border-[#C9A227]/20 dark:border-white/10 hover:border-[#C9A227]/60 hover:text-[#C9A227]"
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Featured Post Spotlight (Only when All is active) */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 bg-white dark:bg-dark-brown-light/30 rounded-3xl border border-[#C9A227]/15 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#C9A227]/40 transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row min-h-[400px]">
                  <div className="lg:w-1/2 relative overflow-hidden aspect-video lg:aspect-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="bg-gradient-to-r from-[#C9A227] to-[#A8891A] text-white text-[10px] uppercase tracking-widest font-semibold px-3.5 py-1.5 rounded-full shadow-[0_4px_10px_rgba(201,162,39,0.25)]">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-xs font-poppins text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3.5 h-3.5 text-[#C9A227]" />
                        {featuredPost.date}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5 text-[#C9A227]" />
                        {featuredPost.readTime} read
                      </span>
                    </div>
                    <h2 className="font-playfair text-2xl sm:text-3.5xl font-medium text-dark-brown dark:text-cream mb-4 group-hover:text-[#C9A227] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="font-poppins text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <a
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-wider font-semibold text-[#C9A227] hover:text-[#A8891A] hover:gap-3.5 transition-all duration-300"
                    >
                      <span>Read Full Article</span>
                      <FiArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid Posts */}
            {gridPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {gridPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-dark-brown-light/30 rounded-2xl overflow-hidden border border-[#C9A227]/10 hover:border-[#C9A227]/30 hover:shadow-[0_8px_30px_rgba(201,162,39,0.06)] transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 dark:bg-dark-brown-light/95 border border-[#C9A227]/25 text-[#C9A227] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-3 text-xs font-poppins text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3 text-[#C9A227]" />
                            {post.date}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3 h-3 text-[#C9A227]" />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="font-playfair text-xl sm:text-2xl font-medium text-dark-brown dark:text-cream mb-3 group-hover:text-[#C9A227] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="font-poppins text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 sm:px-8 pb-6 pt-0">
                      <div className="h-px bg-gradient-to-r from-[#C9A227]/10 to-transparent mb-4" />
                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-wider font-semibold text-[#C9A227] hover:text-[#A8891A] hover:gap-3 transition-all duration-300"
                      >
                        <span>Read Article</span>
                        <FiArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-dark-brown-light/20 rounded-3xl border border-[#C9A227]/15">
                <FiBookOpen className="w-12 h-12 text-[#C9A227]/40 mx-auto mb-4" />
                <p className="font-poppins text-gray-500 dark:text-gray-400">
                  No articles found in this category. Check back soon!
                </p>
              </div>
            )}

            {/* Subscribe newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#FFFBF5] dark:bg-dark-brown-light/20 border border-[#C9A227]/25 shadow-[0_4px_25px_rgba(0,0,0,0.02)] max-w-4xl mx-auto flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

              <div className="w-14 h-14 rounded-full bg-[#FFF8ED] dark:bg-gold/10 flex items-center justify-center text-[#C9A227] border border-[#C9A227]/10 mb-6 flex-shrink-0">
                <FiMail className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-2xl sm:text-3.5xl font-semibold text-dark-brown dark:text-cream mb-3 max-w-md">
                Subscribe to Our Newsletter
              </h3>
              <p className="font-poppins text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed mb-8">
                Receive exclusive jewellery styling guides, traditional Maharashtrian wedding checklists, and priority access to our new rental launches.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3.5 bg-white dark:bg-dark-brown border border-[#C9A227]/20 dark:border-white/10 rounded-xl font-poppins text-sm text-dark-brown dark:text-cream focus:outline-none focus:border-[#C9A227]/60"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#C9A227] hover:bg-[#A8891A] text-white rounded-xl px-6 py-3.5 font-poppins text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(201,162,39,0.25)] cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
