import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiPackage, FiHome } from "react-icons/fi";

export default function OrderSuccessPage() {
  const orderNum = `#MK-${Math.floor(Math.random() * 9000) + 1000}`;
  return (
    <>
      <Helmet><title>Order Placed Successfully | Mayleki</title></Helmet>
      <div className="min-h-screen bg-cream dark:bg-dark-brown flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: 2 }} className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream mb-2">Order Placed!</h1>
          <p className="font-poppins text-gray-500 mb-2">Thank you for your order. We'll confirm it shortly!</p>
          <p className="font-poppins text-sm font-semibold text-gold mb-8">Order Number: {orderNum}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/profile" className="btn-gold-outline px-6 py-3 inline-flex items-center gap-2"><FiPackage className="w-4 h-4" /> Track Order</Link>
            <Link to="/" className="btn-gold px-6 py-3 inline-flex items-center gap-2"><FiHome className="w-4 h-4" /> Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
