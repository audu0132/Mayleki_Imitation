import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/Order.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret",
});

// @POST /api/payment/create-order
// Create a Razorpay order before frontend checkout
router.post("/create-order", protect, async (req, res, next) => {
  try {
    const { amount, currency = "INR" } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}_${req.user._id}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      data: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (err) {
    next(err);
  }
});

// @POST /api/payment/verify
// Verify the Razorpay signature after successful payment on frontend
router.post("/verify", protect, async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      local_order_id,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // If we have a local order ID in our DB, update it
      if (local_order_id) {
        const order = await Order.findById(local_order_id);
        if (order) {
          order.paymentStatus = "paid";
          order.status = "processing";
          order.razorpayOrderId = razorpay_order_id;
          order.razorpayPaymentId = razorpay_payment_id;
          order.statusHistory.push({
            status: "processing",
            note: "Payment successful via Razorpay",
          });
          await order.save();
        }
      }

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
