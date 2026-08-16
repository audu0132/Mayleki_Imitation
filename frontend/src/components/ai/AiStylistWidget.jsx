import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import {
  FiX,
  FiSend,
  FiShoppingBag,
  FiCalendar,
  FiRefreshCw,
  FiChevronRight,
  FiMaximize2,
  FiUser
} from "react-icons/fi";
import { useCart } from "../../context/AppContext";
import toast from "react-hot-toast";

const QUICK_PROMPTS = [
  "👑 Jewellery for Maroon Bridal Lehenga",
  "📿 Haldi ceremony set under ₹1000",
  "✨ Best rental jewellery for Reception",
  "🌿 Oxidised Silver Jhumkas for Garba"
];

export default function AiStylistWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I am your **Mayleki AI Royal Stylist**. Tell me about your outfit (color, style, occasion), and I'll recommend the perfect jewellery sets to buy or rent!",
      products: [],
      tips: []
    }
  ]);

  const { addToCart } = useCart();
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt) => {
    const promptToSend = customPrompt || inputPrompt;
    if (!promptToSend.trim() || isLoading) return;

    // Append user message
    const userMsg = { sender: "user", text: promptToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      // Call backend API
      const res = await fetch("http://localhost:5000/api/ai/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend })
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.advice,
            products: data.recommendedProducts || [],
            tips: data.stylingTips || [],
            source: data.source
          }
        ]);
      } else {
        throw new Error(data.message || "Failed to fetch AI recommendations");
      }
    } catch (err) {
      console.warn("AI fallback connection notice:", err.message);
      // Client-side fallback if backend API is not reachable
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "For a majestic look, contrast rich attire like Maroon/Red with Kundan Gold or Antique Temple jewellery! Here are top curated items from our collection:",
          products: [
            {
              id: 1,
              title: "Royal Kundan Bridal Set",
              slug: "royal-kundan-bridal-set",
              category: "bridal-sets",
              sellingPrice: 4500,
              rentalPrice: 800,
              isRentalAvailable: true,
              color: "Gold",
              images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"]
            },
            {
              id: 2,
              title: "Traditional Kolhapuri Saaj",
              slug: "traditional-kolhapuri-saaj",
              category: "kolhapuri-saaj",
              sellingPrice: 2800,
              rentalPrice: 500,
              isRentalAvailable: true,
              color: "Gold",
              images: ["https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600"]
            }
          ],
          tips: [
            "Heavy necklines pair best with drop earrings & maang tikka.",
            "Renting gives you royal luxury at 80% savings."
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product, type = "purchase") => {
    addToCart(product, 1, type);
    toast.success(`Added ${product.title} (${type}) to Cart! 🛍️`);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? "hidden" : "flex"
        } bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-white font-medium shadow-amber-900/30 border border-amber-300/40`}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-100"></span>
        </span>
        <HiSparkles className="w-5 h-5 text-amber-100 animate-pulse" />
        <span className="font-poppins text-sm tracking-wide font-semibold">
          AI Jewellery Stylist
        </span>
      </motion.button>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-stone-900/95 backdrop-blur-xl border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden font-poppins text-gray-100"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
                  <HiSparkles className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-amber-200 text-base tracking-wide">
                      Mayleki AI Stylist
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-sans border border-amber-400/20">
                      LIVE
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/70">
                    Personalized Outfit & Jewellery Matcher
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  to="/ai-stylist"
                  title="Open Full Page Stylist"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-amber-200/70 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
                >
                  <FiMaximize2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-amber-200/70 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[88%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        msg.sender === "user"
                          ? "bg-amber-600 text-white"
                          : "bg-amber-500/20 border border-amber-400/30 text-amber-300"
                      }`}
                    >
                      {msg.sender === "user" ? <FiUser className="w-3.5 h-3.5" /> : <HiSparkles className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-tr-none shadow-md"
                          : "bg-stone-800/90 border border-stone-700/80 text-gray-200 rounded-tl-none shadow-sm"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Recommended Products Carousel / Grid */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-stone-700/60 space-y-2.5">
                          <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                            <HiSparkles className="w-3.5 h-3.5 text-amber-400" />
                            Curated Recommendations ({msg.products.length}):
                          </p>
                          <div className="grid grid-cols-1 gap-2.5">
                            {msg.products.map((prod, pIdx) => (
                              <div
                                key={prod._id || prod.id || pIdx}
                                className="flex items-center gap-3 p-2 rounded-xl bg-stone-900/90 border border-amber-500/20 hover:border-amber-500/40 transition-all"
                              >
                                <img
                                  src={
                                    prod.images && prod.images.length > 0
                                      ? prod.images[0]
                                      : "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"
                                  }
                                  alt={prod.title}
                                  className="w-14 h-14 rounded-lg object-cover border border-amber-500/20 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-medium text-amber-100 truncate">
                                    {prod.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold text-amber-400">
                                      ₹{prod.sellingPrice?.toLocaleString()}
                                    </span>
                                    {prod.isRentalAvailable && prod.rentalPrice && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                                        Rent: ₹{prod.rentalPrice}/2d
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1 shrink-0">
                                  <button
                                    onClick={() => handleAddToCart(prod, "purchase")}
                                    className="p-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] flex items-center justify-center transition-colors"
                                    title="Add to Cart"
                                  >
                                    <FiShoppingBag className="w-3.5 h-3.5" />
                                  </button>
                                  {prod.isRentalAvailable && (
                                    <button
                                      onClick={() => handleAddToCart(prod, "rental")}
                                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 text-[11px] flex items-center justify-center transition-colors"
                                      title="Book Rental"
                                    >
                                      <FiCalendar className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Styling Tips */}
                      {msg.tips && msg.tips.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-stone-700/60 text-[11px] text-amber-200/80 space-y-1">
                          <span className="font-semibold text-amber-300">Styling Advice:</span>
                          {msg.tips.map((tip, tIdx) => (
                            <p key={tIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-400">•</span>
                              <span>{tip}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-amber-300/80 bg-stone-800/60 p-3 rounded-2xl w-fit border border-amber-500/20 animate-pulse">
                  <FiRefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Curating royal jewellery pairings...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Pills */}
            <div className="px-4 py-2 bg-stone-950/60 border-t border-stone-800 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] bg-stone-800 hover:bg-amber-900/40 text-amber-200/90 border border-amber-500/20 transition-all hover:border-amber-400/40 shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-stone-950 border-t border-amber-500/20 flex items-center gap-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe outfit color, dress type, or occasion..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-700/80 text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputPrompt.trim()}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-white shadow-md transition-all shrink-0"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
