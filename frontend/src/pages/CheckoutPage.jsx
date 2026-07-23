import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/AppContext";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    addressLine1: "",
    city: "",
    pincode: "",
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Cart is empty");
    
    setLoading(true);
    try {
      const amount = getCartTotal();

      // 1. Create Order on Backend
      const orderRes = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ amount }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.message);

      // 2. Init Razorpay
      const options = {
        key: "rzp_test_key", // Replace with actual key or fetch from backend
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: "Mayleki Imitation Jewellery",
        description: "Purchase Order",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment & Create Real Order in DB
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success("Payment Successful!");
              navigate("/order-success");
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: address.name,
          contact: address.phone,
        },
        theme: { color: "#D4AF37" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-wrapper py-20 text-center">
        <h2 className="font-playfair text-2xl mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-gold-outline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Checkout | Mayleki Jewellery</title></Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-12">
          <div className="container-luxury">
            <h1 className="font-playfair text-4xl font-bold text-cream">Checkout</h1>
          </div>
        </div>
        
        <div className="container-luxury py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Delivery Form */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl font-bold mb-6">Delivery Details</h2>
              <form id="checkout-form" onSubmit={handlePayment} className="grid sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" value={address.name} onChange={(e)=>setAddress({...address, name: e.target.value})} className="input-luxury" />
                <input required type="tel" placeholder="Phone Number" value={address.phone} onChange={(e)=>setAddress({...address, phone: e.target.value})} className="input-luxury" />
                <input required type="text" placeholder="Address Line 1" value={address.addressLine1} onChange={(e)=>setAddress({...address, addressLine1: e.target.value})} className="input-luxury sm:col-span-2" />
                <input required type="text" placeholder="City" value={address.city} onChange={(e)=>setAddress({...address, city: e.target.value})} className="input-luxury" />
                <input required type="text" placeholder="PIN Code" value={address.pincode} onChange={(e)=>setAddress({...address, pincode: e.target.value})} className="input-luxury" />
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-dark-brown-light p-6 rounded-2xl h-fit border border-gold/20">
              <h2 className="font-playfair text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={`${item.id}-${item.type}`} className="flex gap-4 items-center">
                    <img src={item.images && item.images.length > 0 ? item.images[0] : ""} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-poppins text-xs text-gray-500">Qty: {item.qty}</p>
                        <span className={`text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full ${
                          item.type === "rental" ? "bg-rose-gold/10 text-rose-gold" : "bg-gold/10 text-gold"
                        }`}>
                          {item.type === "rental" ? "Rental" : "Purchase"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gold/20 flex justify-between font-bold">
                <span>Total Amount</span>
                <span>₹{getCartTotal().toLocaleString("en-IN")}</span>
              </div>
              <button form="checkout-form" type="submit" disabled={loading} className="btn-gold w-full mt-6 py-4 text-sm uppercase tracking-widest">
                {loading ? "Processing..." : `Pay ₹${getCartTotal().toLocaleString("en-IN")}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
