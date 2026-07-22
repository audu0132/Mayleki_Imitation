import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @POST /api/orders — Create order
router.post("/", protect, async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode, discount, deliveryCharge } = req.body;

    // Validate & calculate totals
    let subtotal = 0;
    const enrichedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      if (product.availableQty < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for: ${product.title}` });
      }

      const price = item.type === "rental" ? product.rentalPrice : product.sellingPrice;
      subtotal += price * item.quantity * (item.rentalDays || 1);

      enrichedItems.push({
        product: product._id,
        title: product.title,
        image: product.images[0],
        quantity: item.quantity,
        price,
        discount: product.discount,
        type: item.type || "purchase",
        rentalDays: item.rentalDays,
      });
    }

    const total = subtotal - (subtotal * (discount || 0)) / 100 + (deliveryCharge || 0);

    const order = await Order.create({
      customer: req.user._id,
      items: enrichedItems,
      shippingAddress,
      paymentMethod,
      couponCode,
      discount: discount || 0,
      deliveryCharge: deliveryCharge || 0,
      subtotal,
      total,
      isRentalOrder: enrichedItems.some((i) => i.type === "rental"),
    });

    // Decrease stock
    for (const item of enrichedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { availableQty: -item.quantity },
      });
    }

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

// @GET /api/orders/my — Customer's orders
router.get("/my", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate("items.product", "title images").sort("-createdAt");
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

// @GET /api/orders — Admin all orders
router.get("/", protect, authorize("admin", "staff"), async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const [orders, total] = await Promise.all([
      Order.find(filter).populate("customer", "name email phone").sort("-createdAt")
        .skip((parseInt(page) - 1) * parseInt(limit)).limit(parseInt(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ success: true, data: orders, total });
  } catch (err) {
    next(err);
  }
});

// @PATCH /api/orders/:id/status — Update order status
router.patch("/:id/status", protect, authorize("admin", "staff"), async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    order.statusHistory.push({ status, note });
    await order.save();

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

export default router;
