import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import {
  FiX,
  FiSend,
  FiShoppingBag,
  FiRefreshCw,
  FiMaximize2,
  FiUser
} from "react-icons/fi";
import { useCart } from "../../context/AppContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";

const QUICK_SUGGESTIONS = [
  { label: "Bridal Jewellery", prompt: "Recommend bridal jewellery sets for Maharashtrian wedding" },
  { label: "Wedding Guest", prompt: "Subtle Kundan necklace for wedding guest outfit" },
  { label: "Maharashtrian Look", prompt: "Authentic Kolhapuri Saaj and Nath accessories" },
  { label: "Haldi", prompt: "Yellow Haldi ceremony floral or gold plated jewellery" },
  { label: "Mehendi", prompt: "Green & antique jewellery set for Mehendi" },
  { label: "Reception", prompt: "Heavy Royal Kundan bridal set for reception" },
  { label: "Festive Wear", prompt: "Traditional festive wear necklaces and bangles" },
  { label: "Rental Jewellery", prompt: "Show available rental jewellery sets under ₹1000/day" }
];

export default function AIJewelleryStylist() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I am your **Mayleki AI Jewellery Stylist**. Tell me about your outfit (color, occasion, style), and I will recommend perfect jewellery to buy or rent!",
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

    const userMsg = { sender: "user", text: promptToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/stylist`, {
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
            tips: data.stylingTips || []
          }
        ]);
      } else {
        throw new Error(data.message || "AI recommendation error");
      }
    } catch {
      // Fallback response if AI server is offline
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "For a timeless Maharashtrian look, pair vibrant silk sarees with an authentic Kolhapuri Saaj or Royal Kundan choker set. Here are top recommended pieces from our boutique:",
          products: [
            {
              id: 1,
              title: "Royal Kundan Bridal Set",
              slug: "royal-kundan-bridal-set",
              category: "bridal-sets",
              sellingPrice: 4500,
              rentalPrice: 800,
              isRentalAvailable: true,
              image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80"
            },
            {
              id: 2,
              title: "Authentic Kolhapuri Saaj",
              slug: "authentic-kolhapuri-saaj",
              category: "kolhapuri-saaj",
              sellingPrice: 2200,
              rentalPrice: 450,
              isRentalAvailable: true,
              image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80"
            }
          ],
          tips: [
            "Match choker height with saree neckline.",
            "Use rental options for 1-day wedding events to save up to 70%!"
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* AI STYLIST FLOATING PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[160px] right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-180px)] bg-[#FFFDF8] dark:bg-[#111111] border border-[rgba(212,175,55,0.3)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#111111] via-[#1F1B19] to-[#111111] text-[#FFFDF8] border-b border-[rgba(212,175,55,0.2)] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E6B93F] to-[#C88A18] flex items-center justify-center text-[#111111] shadow-sm">
                  <HiSparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-cormorant font-semibold text-lg text-[#FFFDF8] leading-tight flex items-center gap-1.5">
                    ✨ AI Jewellery Stylist
                  </h3>
                  <p className="font-sans text-[11px] text-[#A9A9A9] font-light">
                    Find the perfect jewellery for your occasion
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/ai-stylist"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#D4AF37] hover:text-[#E6C76A] transition-colors"
                  title="Full Screen Stylist Page"
                >
                  <FiMaximize2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#D4AF37] hover:text-[#E6C76A] transition-colors cursor-pointer"
                  aria-label="Close panel"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2.5 bg-[#FFFDF8] dark:bg-[#181818] border-b border-[rgba(212,175,55,0.18)] flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {QUICK_SUGGESTIONS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.prompt)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-sans font-medium bg-[#FFFDF8] dark:bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-[#D4AF37] border border-[rgba(212,175,55,0.3)] transition-all shrink-0 cursor-pointer shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[90%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        msg.sender === "user"
                          ? "bg-[#111111] text-[#FFFDF8]"
                          : "bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]"
                      }`}
                    >
                      {msg.sender === "user" ? <FiUser className="w-3.5 h-3.5" /> : <HiSparkles className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#111111] text-[#FFFDF8] rounded-tr-none shadow-sm"
                          : "bg-[#FAF7F2] dark:bg-[#1C1917] text-[#3B2F2F] dark:text-[#FFFDF8] border border-[rgba(212,175,55,0.2)] rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs leading-relaxed">{msg.text}</p>

                      {/* Product Recommendations */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[rgba(212,175,55,0.2)] space-y-2">
                          <p className="font-sans font-semibold text-[11px] text-[#D4AF37] uppercase tracking-wider">
                            Recommended Pieces:
                          </p>
                          {msg.products.map((prod) => (
                            <div
                              key={prod.id}
                              className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#111111] border border-[rgba(212,175,55,0.2)] gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img
                                  src={prod.image}
                                  alt={prod.title}
                                  className="w-10 h-10 object-cover rounded-md shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="font-medium text-xs text-[#3B2F2F] dark:text-[#FFFDF8] truncate">
                                    {prod.title}
                                  </p>
                                  <p className="text-[10px] text-[#D4AF37] font-bold">
                                    ₹{prod.sellingPrice} {prod.rentalPrice ? `(Rental ₹${prod.rentalPrice}/day)` : ""}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  addToCart(prod, 1);
                                  toast.success(`Added ${prod.title} to cart!`);
                                }}
                                className="p-1.5 rounded-md bg-[#D4AF37] hover:bg-[#E6C76A] text-[#111111] shrink-0 cursor-pointer transition-colors"
                                title="Add to Cart"
                              >
                                <FiShoppingBag className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] bg-[#FAF7F2] dark:bg-[#1C1917] p-3 rounded-2xl w-fit border border-[rgba(212,175,55,0.3)] animate-pulse">
                  <FiRefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                  <span>Styling your bespoke look...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#FFFDF8] dark:bg-[#111111] border-t border-[rgba(212,175,55,0.18)] flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about saree color, outfit, or occasion..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[rgba(212,175,55,0.25)] text-xs text-[#3B2F2F] dark:text-[#FFFDF8] placeholder-[#A9A9A9] focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputPrompt.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#E6B93F] to-[#C88A18] hover:from-[#C88A18] hover:to-[#E6B93F] disabled:opacity-50 text-[#FFFDF8] shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INDEPENDENT FLOATING PILL BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[240px] sm:w-[270px] h-14 rounded-full bg-gradient-to-r from-[#1C1917] via-[#2A2421] to-[#3B1219] text-[#FAF7F2] shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.4)] border border-[#D4AF37]/70 cursor-pointer flex items-center justify-center px-4 transition-all duration-300 group select-none"
        aria-label="Open AI Jewellery Stylist"
      >
        {/* Perfectly Centered Internal Row */}
        <div className="flex items-center justify-center gap-3 w-full h-full">
          {/* Animated Glow Dot */}
          <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          </span>

          {/* Sparkle Icon */}
          <HiSparkles className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300 shrink-0" />

          {/* Centered Button Title */}
          <span className="font-sans font-bold text-sm sm:text-base text-[#FAF7F2] tracking-wider whitespace-nowrap">
            AI Jewellery Stylist
          </span>
        </div>
      </motion.button>
    </>
  );
}
