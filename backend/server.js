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
const IS_PRODUCTION = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

// CORS configuration supporting one or more deployed frontend origins.
const rawOrigins =
  process.env.FRONTEND_URL ||
  process.env.CLIENT_URL ||
  "http://localhost:5173,http://localhost:3000,http://localhost:5174";

const allowedOrigins = rawOrigins
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes("*") || allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      if (!IS_PRODUCTION && normalizedOrigin.includes("localhost")) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

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
const dbStates = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

app.get("/api/health", (req, res) => {
  const database = dbStates[mongoose.connection.readyState] || "unknown";

  res.status(database === "connected" ? 200 : 503).json({
    success: database === "connected",
    message: "Mayleki API is running 🛍️",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || (IS_PRODUCTION ? "production" : "development"),
    database,
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
const configuredMongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "";
const MONGODB_URI = configuredMongoUri || (!IS_PRODUCTION ? "mongodb://localhost:27017/mayleki" : "");

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not configured. Add MONGODB_URI to the Render Environment Variables.");
  process.exit(1);
}

try {
  const parsedMongoUrl = new URL(MONGODB_URI);
  console.log(`🔎 MongoDB URI configured: ${parsedMongoUrl.protocol}//${parsedMongoUrl.hostname}${parsedMongoUrl.port ? `:${parsedMongoUrl.port}` : ""}`);
} catch {
  console.error("❌ MONGODB_URI is present but is not a valid MongoDB connection string.");
  process.exit(1);
}

console.log(`🌍 Environment: ${IS_PRODUCTION ? "production" : "development"}`);
console.log(`🔌 Render: ${process.env.RENDER === "true" ? "yes" : "no"}`);
console.log(`🌐 PORT: ${PORT}`);

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Mayleki Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed");
    console.error(`   Message: ${error.message}`);
    if (error.name) console.error(`   Name: ${error.name}`);
    if (error.code) console.error(`   Code: ${error.code}`);
    process.exit(1);
  });

export default app;
