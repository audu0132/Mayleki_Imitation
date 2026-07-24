import { motion } from "framer-motion";
import { FiInstagram, FiHeart, FiExternalLink } from "react-icons/fi";
import { INSTAGRAM_POSTS } from "../../data/mockData";

export default function InstagramGallery() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#1A1414]">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="section-subtitle">Follow Us</p>
          <h2 className="section-title">
            <span className="text-gold-gradient">@mayleki.jewellery</span>
          </h2>
          <div className="gold-divider" />
          <a
            href="https://www.instagram.com/mayleki.jewellery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-poppins text-sm text-gray-500 hover:text-rose-gold transition-colors mt-2"
          >
            <FiInstagram className="w-4 h-4" />
            Follow us on Instagram for daily inspiration
          </a>
        </motion.div>

        {/* Instagram Grid (gap-4 sm:gap-6 = 16px - 24px) */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {INSTAGRAM_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5 block border border-gold/10"
            >
              <img
                src={post.image}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <FiInstagram className="w-7 h-7 text-white" />
                  <div className="flex items-center gap-1 text-white font-poppins text-sm font-semibold">
                    <FiHeart className="w-4 h-4" />
                    {post.likes}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="https://www.instagram.com/mayleki.jewellery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-poppins font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-rose-gold"
            style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
          >
            <FiInstagram className="w-5 h-5" />
            Follow @mayleki.jewellery
            <FiExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

