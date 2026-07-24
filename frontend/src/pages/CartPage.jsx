import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiTag } from "react-icons/fi";
import { useCart } from "../context/AppContext";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  const VALID_COUPONS = { WEDDING25: 25, FESTIVAL3: 10, FIRSTRENT: 0 };

  const applyCoupon = () => {
    const code = coupon.toUpperCase();
    if (VALID_COUPONS[code] !== undefined) {
      setDiscount(VALID_COUPONS[code]);
      setCouponApplied(true);
      toast.success(`Coupon "${code}" applied! ${VALID_COUPONS[code]}% discount`, {
        style: { background: "#3B2F2F", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
      });
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const discountedTotal = cartTotal - (cartTotal * discount) / 100;
  const deliveryCharge = discountedTotal > 999 ? 0 : 99;
  const finalTotal = discountedTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <>
        <Helmet><title>Cart | Mayleki Jewellery</title></Helmet>
        <div className="page-wrapper flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🛒
            </motion.div>
            <h2 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream mb-3">
              Your cart is empty
            </h2>
            <p className="font-poppins text-gray-500 mb-8">
              Discover our stunning jewellery collection and add your favorites!
            </p>
            <Link to="/products" className="btn-gold text-base px-8 py-4">
              <FiShoppingBag className="w-5 h-5" /> Explore Collections
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>{`Cart (${cart.length}) | Mayleki Jewellery`}</title></Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative">
            <h1 className="font-playfair text-4xl font-bold text-cream">Shopping Cart</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>
          </div>
        </div>

        <div className="container-luxury py-10 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/products" className="flex items-center gap-2 text-sm font-poppins text-gold hover:underline mb-4 inline-flex">
                <FiArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>

              {cart.map((item) => {
                const price = item.type === "rental" ? item.rentalPrice : item.sellingPrice;
                const discounted = price - (price * (item.discount || 0)) / 100;
                return (
                  <motion.div
                    key={`${item.id}-${item.type}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-dark-brown-light rounded-2xl p-6 flex gap-4 border border-gold/10 hover:border-gold/30 transition-colors shadow-card"
                  >

                    <Link to={`/products/${item.slug}`} className="flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full ${
                            item.type === "rental" ? "bg-rose-gold/10 text-rose-gold" : "bg-gold/10 text-gold"
                          }`}>
                            {item.type === "rental" ? "🎁 RENTAL" : "💳 PURCHASE"}
                          </span>
                          <Link to={`/products/${item.slug}`}>
                            <h3 className="font-playfair font-bold text-dark-brown dark:text-cream mt-1 hover:text-gold transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="font-poppins text-xs text-gray-400">{item.category.replace(/-/g, " ")}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.type)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        {/* Qty */}
                        <div className="flex items-center border border-gold/20 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, item.type, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gold/10 transition-colors text-dark-brown dark:text-cream"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-poppins font-semibold text-sm text-dark-brown dark:text-cream">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.type, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gold/10 transition-colors text-dark-brown dark:text-cream"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <p className="font-playfair text-xl font-bold text-dark-brown dark:text-cream">
                            ₹{(discounted * item.qty).toLocaleString("en-IN")}
                            {item.type === "rental" && <span className="text-sm font-poppins font-normal text-gray-400">/day</span>}
                          </p>
                          {item.discount > 0 && (
                            <p className="font-poppins text-xs text-gray-400 line-through">
                              ₹{(price * item.qty).toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-dark-brown-light rounded-3xl border border-gold/10 p-6 sticky top-24">
                <h3 className="font-playfair text-xl font-bold text-dark-brown dark:text-cream mb-6">
                  Order Summary
                </h3>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-2 block">
                    <FiTag className="w-4 h-4 inline mr-1" /> Apply Coupon
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      disabled={couponApplied}
                      className="input-luxury flex-1 text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponApplied}
                      className="btn-gold px-4 py-2 text-sm disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="font-poppins text-xs text-green-500 mt-1">
                      ✓ {discount}% discount applied!
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between font-poppins text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-poppins text-sm text-green-500">
                      <span>Coupon Discount</span>
                      <span>-₹{(cartTotal * discount / 100).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-poppins text-sm text-gray-500">
                    <span>Delivery</span>
                    <span>{deliveryCharge === 0 ? <span className="text-green-500">FREE</span> : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="h-px bg-gold/20" />
                  <div className="flex justify-between font-playfair text-xl font-bold text-dark-brown dark:text-cream">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="btn-gold w-full py-4 text-base"
                >
                  Proceed to Checkout →
                </button>

                <div className="mt-4 text-center">
                  <p className="font-poppins text-xs text-gray-400">
                    🔒 Secure checkout via Razorpay
                  </p>
                </div>

                {/* Available coupons */}
                {!couponApplied && (
                  <div className="mt-5 pt-5 border-t border-gold/10">
                    <p className="font-poppins text-xs font-semibold text-gold mb-3">Available Offers:</p>
                    <div className="space-y-2">
                      {[
                        { code: "WEDDING25", label: "25% off on bridal" },
                        { code: "FESTIVAL3", label: "10% off festival" },
                      ].map(({ code, label }) => (
                        <button
                          key={code}
                          onClick={() => { setCoupon(code); }}
                          className="w-full text-left flex items-center justify-between p-2 rounded-lg border border-dashed border-gold/30 hover:border-gold hover:bg-gold/5 transition-all"
                        >
                          <div>
                            <span className="font-poppins font-bold text-xs text-gold">{code}</span>
                            <span className="font-poppins text-xs text-gray-400 ml-2">{label}</span>
                          </div>
                          <span className="font-poppins text-xs text-gold">Apply</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
