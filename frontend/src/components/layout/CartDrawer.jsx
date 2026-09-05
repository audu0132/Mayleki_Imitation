import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/AppContext";

const FREE_SHIPPING_THRESHOLD = 999;

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();

  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="cart-drawer-overlay"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-champagne/15">
              <div>
                <h2 className="font-display text-2xl text-charcoal">Your Bag</h2>
                <span className="font-body text-xs text-text-secondary">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:text-champagne transition-colors"
                aria-label="Close cart"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartCount > 0 && (
              <div className="px-6 py-3 border-b border-champagne/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-champagne">
                    {amountToFreeShipping > 0
                      ? `₹${amountToFreeShipping.toLocaleString("en-IN")} away from free shipping`
                      : "✓ Free shipping unlocked!"}
                  </span>
                </div>
                <div className="shipping-progress-bar">
                  <div
                    className="shipping-progress-fill"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <p className="font-display text-2xl text-charcoal mb-2">Your bag is empty</p>
                  <p className="font-body text-xs text-text-secondary mb-6">
                    Discover our curated collections
                  </p>
                  <button onClick={onClose} className="btn-primary-luxury">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => {
                    const price = item.type === "rental" ? item.rentalPrice : item.sellingPrice;
                    const discounted = price - (price * (item.discount || 0)) / 100;

                    return (
                      <motion.div
                        key={`${item.id}-${item.type}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 pb-4 border-b border-champagne/10 last:border-0"
                      >
                        {/* Product Image */}
                        <Link
                          to={`/products/${item.slug}`}
                          onClick={onClose}
                          className="w-20 h-24 flex-shrink-0 bg-ivory-200 overflow-hidden"
                        >
                          <img
                            src={item.images?.[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/products/${item.slug}`}
                            onClick={onClose}
                            className="font-body text-xs font-medium text-charcoal hover:text-champagne transition-colors line-clamp-2 mb-1"
                          >
                            {item.title}
                          </Link>
                          {item.type === "rental" && (
                            <span className="inline-block font-body text-[9px] font-semibold tracking-wider uppercase text-champagne bg-champagne/10 px-1.5 py-0.5 mb-1">
                              Rental
                            </span>
                          )}
                          <p className="font-body text-sm font-semibold text-charcoal">
                            {formatPrice(discounted)}
                          </p>

                          {/* Quantity + Remove */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-champagne/20">
                              <button
                                onClick={() => updateQty(item.id, item.type, item.qty - 1)}
                                className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-champagne transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-body text-xs font-semibold text-charcoal">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.type, item.qty + 1)}
                                className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-champagne transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, item.type)}
                              className="text-text-muted hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer — Subtotal & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-champagne/15 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-charcoal">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="font-body text-[10px] text-text-secondary">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-primary-luxury w-full text-center"
                >
                  Checkout
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={onClose}
                  className="w-full font-body text-xs font-medium text-text-secondary hover:text-charcoal transition-colors text-center py-2 tracking-wider uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
