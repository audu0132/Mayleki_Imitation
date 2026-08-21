import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HiSparkles } from "react-icons/hi2";
import {
  FiShoppingBag,
  FiCalendar,
  FiRefreshCw,
  FiCheckCircle,
  FiTag,
  FiSliders,
  FiArrowRight,
  FiHeart
} from "react-icons/fi";
import { useCart, useWishlist } from "../context/AppContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";

const OCCASIONS = [
  { id: "Wedding", label: "Wedding", icon: "👑" },
  { id: "Sangeet", label: "Sangeet / Garba", icon: "💃" },
  { id: "Haldi", label: "Haldi / Mehendi", icon: "🌼" },
  { id: "Reception", label: "Reception / Party", icon: "✨" },
  { id: "Festival", label: "Festival / Puja", icon: "🛕" },
  { id: "Casual", label: "Casual & Everyday", icon: "🌿" }
];

const OUTFIT_TYPES = [
  "Bridal Lehenga",
  "Silk / Designer Saree",
  "Anarkali Suit",
  "Indo-Western Gown",
  "Sharara / Gharara",
  "Casual Kurti"
];

const COLORS = [
  { name: "Maroon / Deep Red", hex: "#7F1D1D" },
  { name: "Royal Blue", hex: "#1E3A8A" },
  { name: "Emerald Green", hex: "#065F46" },
  { name: "Pastel Pink", hex: "#F472B6" },
  { name: "Gold / Yellow", hex: "#D97706" },
  { name: "Silver / Grey", hex: "#6B7280" },
  { name: "White / Off-White", hex: "#F3F4F6" },
  { name: "Black / Midnight", hex: "#111827" }
];

export default function AiStylistPage() {
  const [occasion, setOccasion] = useState("Wedding");
  const [outfitType, setOutfitType] = useState("Bridal Lehenga");
  const [outfitColor, setOutfitColor] = useState("Maroon / Deep Red");
  const [lookingFor, setLookingFor] = useState("all");
  const [budget, setBudget] = useState(5000);
  const [customPrompt, setCustomPrompt] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const payload = {
        occasion,
        outfitType,
        outfitColor,
        budget,
        lookingFor,
        prompt: customPrompt || `I need jewellery recommendations for a ${outfitColor} ${outfitType} for a ${occasion}. My budget is ₹${budget}.`
      };

      const res = await fetch(`${API_BASE_URL}/api/ai/stylist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setResult(data);
        toast.success("AI Styling Plan Generated! ✨");
      } else {
        throw new Error(data.message || "Failed to generate styling plan");
      }
    } catch (err) {
      console.warn("Using offline rule engine fallback:", err.message);
      setResult({
        advice: `For a ${occasion} featuring a ${outfitColor} ${outfitType}, contrast and metallic harmony are essential! Antique Temple or Royal Kundan sets create a majestic heritage aesthetic, while pearl accents highlight subtle elegance.`,
        recommendedProducts: [
          {
            _id: "1",
            title: "Royal Kundan Bridal Set",
            slug: "royal-kundan-bridal-set",
            category: "bridal-sets",
            sellingPrice: 4500,
            rentalPrice: 800,
            isRentalAvailable: true,
            color: "Gold",
            material: "Kundan with Meenakari",
            rating: 4.9,
            images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"]
          },
          {
            _id: "3",
            title: "Antique Temple Nakshi Necklace",
            slug: "antique-temple-nakshi-necklace",
            category: "temple-jewellery",
            sellingPrice: 3800,
            rentalPrice: 650,
            isRentalAvailable: true,
            color: "Antique Gold",
            material: "Brass with 24K Antique Plating",
            rating: 4.95,
            images: ["https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600"]
          },
          {
            _id: "5",
            title: "Maharashtrian Pearl & Ruby Nath",
            slug: "maharashtrian-pearl-ruby-nath",
            category: "nath",
            sellingPrice: 750,
            rentalPrice: 150,
            isRentalAvailable: true,
            color: "Pearl & Pink",
            material: "Basra Pearls & CZ",
            rating: 4.9,
            images: ["https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600"]
          }
        ],
        stylingTips: [
          "Match deep necklines with choker sets, and high necklines with long haar.",
          "Keep metal finishes consistent across earrings, nath, and bangles.",
          "Renting heavy bridal sets offers 80% cost savings for single-day wedding events."
        ],
        source: "Mayleki Rule Stylist"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product, type = "purchase") => {
    addToCart(product, 1, type);
    toast.success(`Added ${product.title} (${type}) to Cart! 🛍️`);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-gray-100 font-poppins pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>AI Jewellery Stylist & Outfit Matcher | Mayleki Imitation</title>
        <meta
          name="description"
          content="Get personalized AI jewellery styling advice and match your wedding, sangeet, or reception outfit with Mayleki's premium imitation and 1GM jewellery collection."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-4">
          <HiSparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Powered by Mayleki AI & Gemini Intelligence</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent mb-3">
          AI Jewellery Stylist & Outfit Matcher
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Tell us about your occasion, outfit color, and dress style. Our AI Stylist will curate perfect jewellery pairings to buy or rent from Mayleki's catalog.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-500/20 shadow-2xl backdrop-blur-xl space-y-6">
            <h2 className="text-lg font-serif font-semibold text-amber-200 flex items-center gap-2">
              <FiSliders className="w-5 h-5 text-amber-400" />
              1. Your Outfit & Event Details
            </h2>

            {/* Occasion Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                Occasion
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`p-3 rounded-2xl text-left text-xs font-medium border flex items-center gap-2 transition-all ${
                      occasion === occ.id
                        ? "bg-amber-600/30 border-amber-400 text-amber-200 shadow-md"
                        : "bg-stone-800/60 border-stone-700/80 text-gray-400 hover:border-amber-500/40"
                    }`}
                  >
                    <span className="text-base">{occ.icon}</span>
                    <span>{occ.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Outfit Style
              </label>
              <select
                value={outfitType}
                onChange={(e) => setOutfitType(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-stone-800 border border-stone-700 text-sm text-gray-200 focus:outline-none focus:border-amber-500"
              >
                {OUTFIT_TYPES.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Outfit Color */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Primary Outfit Color
              </label>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setOutfitColor(c.name)}
                    className={`p-2 rounded-xl text-[11px] font-medium border flex flex-col items-center gap-1.5 transition-all ${
                      outfitColor === c.name
                        ? "border-amber-400 bg-amber-500/20 text-amber-200"
                        : "border-stone-800 bg-stone-800/60 text-gray-400 hover:border-stone-700"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate w-full text-center">{c.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction Preference (Buy / Rent) */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                I am looking to:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "Buy or Rent" },
                  { id: "buy", label: "Purchase Only" },
                  { id: "rent", label: "Rent Only 🎁" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLookingFor(opt.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-center ${
                      lookingFor === opt.id
                        ? "bg-amber-600/30 border-amber-400 text-amber-200"
                        : "bg-stone-800/60 border-stone-700 text-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-sm font-bold text-amber-400">
                  ₹{budget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={15000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Custom Instructions */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Additional Preferences (Optional)
              </label>
              <textarea
                rows={2}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Prefer heavy chokers, need matching nath, avoid oxidised silver..."
                className="w-full p-3 rounded-2xl bg-stone-800 border border-stone-700 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-400 text-white font-semibold text-sm tracking-wide shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              {isLoading ? (
                <>
                  <FiRefreshCw className="w-5 h-5 animate-spin" />
                  <span>Analyzing Royal Styling Pairings...</span>
                </>
              ) : (
                <>
                  <HiSparkles className="w-5 h-5 text-amber-200" />
                  <span>Get AI Styling Recommendations</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !isLoading && (
            <div className="h-full min-h-[450px] rounded-3xl bg-stone-900/50 border border-dashed border-stone-800 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl">
                ✨
              </div>
              <div>
                <h3 className="font-serif text-xl text-amber-200 font-semibold mb-1">
                  Ready to Style Your Royal Outfit
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                  Select your occasion and outfit details on the left, then tap "Get AI Styling Recommendations" to generate your custom jewellery plan.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="h-full min-h-[450px] rounded-3xl bg-stone-900/80 border border-amber-500/20 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
              <p className="font-serif text-amber-300 text-base">
                Curating exquisite jewellery sets for your {outfitColor} {outfitType}...
              </p>
            </div>
          )}

          {result && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* AI Advice Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-amber-500/30 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-400/30 flex items-center gap-1.5">
                    <HiSparkles className="w-3.5 h-3.5" />
                    AI Styling Report
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {result.source || "Gemini AI"}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-gray-200 font-sans">
                  {result.advice}
                </p>

                {/* Styling Tips */}
                {result.stylingTips && result.stylingTips.length > 0 && (
                  <div className="pt-4 border-t border-stone-800 space-y-2">
                    <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      Stylist Secrets:
                    </h4>
                    <div className="space-y-1.5">
                      {result.stylingTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <FiCheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recommended Products Header */}
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200 mb-4 flex items-center gap-2">
                  <FiTag className="w-5 h-5 text-amber-400" />
                  Recommended Products from Mayleki Catalog
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.recommendedProducts?.map((product) => (
                    <motion.div
                      key={product._id || product.id}
                      whileHover={{ y: -4 }}
                      className="rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 overflow-hidden shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
                        <img
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"
                          }
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/70 text-gray-300 hover:text-amber-400 transition-colors"
                        >
                          <FiHeart
                            className={`w-4 h-4 ${
                              isInWishlist(product._id || product.id)
                                ? "fill-amber-400 text-amber-400"
                                : ""
                            }`}
                          />
                        </button>
                        {product.isRentalAvailable && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-600/90 text-white text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md">
                            Rental Available
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-amber-400/80 font-mono uppercase tracking-wider">
                            {product.category}
                          </span>
                          <h4 className="font-serif font-semibold text-gray-100 text-sm line-clamp-1 mt-0.5">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-800/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-gray-400 block">Buy Price</span>
                              <span className="text-base font-bold text-amber-300">
                                ₹{product.sellingPrice?.toLocaleString()}
                              </span>
                            </div>
                            {product.isRentalAvailable && product.rentalPrice && (
                              <div className="text-right">
                                <span className="text-[10px] text-gray-400 block">Rent / 2 Days</span>
                                <span className="text-sm font-semibold text-amber-400 font-mono">
                                  ₹{product.rentalPrice?.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleAddToCart(product, "purchase")}
                              className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <FiShoppingBag className="w-3.5 h-3.5" />
                              <span>Buy Now</span>
                            </button>

                            {product.isRentalAvailable ? (
                              <button
                                onClick={() => handleAddToCart(product, "rental")}
                                className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <FiCalendar className="w-3.5 h-3.5" />
                                <span>Rent Set</span>
                              </button>
                            ) : (
                              <Link
                                to={`/products/${product.slug}`}
                                className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-gray-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                              >
                                <span>Details</span>
                                <FiArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
