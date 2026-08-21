import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Route imports
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import orderRoutes from "./routes/orders.js";
import rentalRoutes from "./routes/rentals.js";
import userRoutes from "./routes/users.js";
import uploadRoutes from "./routes/upload.js";
import testimonialRoutes from "./routes/testimonials.js";
import couponRoutes from "./routes/coupons.js";
import contactRoutes from "./routes/contact.js";
import paymentRoutes from "./routes/payment.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration supporting single or multiple origins
const rawOrigins = process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173,http://localhost:3000,http://localhost:5174";
const allowedOrigins = rawOrigins.split(",").map(url => url.trim().replace(/\/+$/, "")).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/+$/, "");
    if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes("*")) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV !== "production" && normalizedOrigin.includes("localhost")) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Mayleki API is running 🛍️",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Database connection & server start
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/mayleki";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Mayleki Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    if (process.env.NODE_ENV === "production") {
      console.error("⚠️ Server starting in fallback mode (Database connection failed)...");
    }
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (fallback mode)`);
    });
  });

export default app;
