import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ScrollReveal from "../common/ScrollReveal";

const SHOWCASE_COLLECTIONS = [
  {
    eyebrow: "Collection 01",
    title: "The Royal Saaj & Heritage Sets",
    description:
      "Hand-crafted Kolhapuri saaj, Thushi, and pearl nath sets designed to give every bride an unforgettable royal Maharashtrian presence.",
    link: "/category/maharashtrian",
    images: [
      "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=800&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
    ],
    alignLeft: true,
  },
  {
    eyebrow: "Collection 02",
    title: "Kundan & Meenakari Masterpieces",
    description:
      "Intricate Kundan work embedded with pearls and vibrant meenakari detailing, ideal for weddings, sangeet, and grand receptions.",
    link: "/category/kundan",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80",
    ],
    alignLeft: false,
  },
];

export default function EditorialShowcase() {
  return (
    <section className="py-section bg-ivory">
      <div className="container-luxury space-y-16 lg:space-y-20">
        {SHOWCASE_COLLECTIONS.map((item) => (
          <div
            key={item.eyebrow}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center`}
          >
            {/* IMAGE COLUMN — Asymmetric layout */}
            <div
              className={`lg:col-span-7 ${
                item.alignLeft ? "order-1" : "order-1 lg:order-2"
              }`}
            >
              <ScrollReveal variant="scale">
                <div className="relative">
                  {/* Large Main Image */}
                  <div
                    className="aspect-editorial overflow-hidden bg-cream group"
                    data-cursor="view"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-luxury"
                      loading="lazy"
                    />
                  </div>

                  {/* Smaller Supporting Images */}
                  {item.images.length > 2 && (
                    <div className="hidden md:grid grid-cols-2 gap-3 mt-3">
                      {item.images.slice(1, 3).map((img, i) => (
                        <div
                          key={i}
                          className="aspect-square overflow-hidden bg-cream group"
                          data-cursor="view"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-luxury"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* CONTENT COLUMN */}
            <div
              className={`lg:col-span-5 ${
                item.alignLeft ? "order-2" : "order-2 lg:order-1"
              }`}
            >
              <ScrollReveal delay={150}>
                <span className="section-eyebrow">{item.eyebrow}</span>

                <h3 className="section-heading section-heading-md mb-5">
                  {item.title}
                </h3>

                <p className="font-body text-body-sm text-text-secondary font-light leading-relaxed mb-8 max-w-md">
                  {item.description}
                </p>

                <Link to={item.link} className="btn-ghost-luxury group">
                  <span>View Collection</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
