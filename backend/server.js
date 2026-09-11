import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

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
      const isVercelDomain = normalizedOrigin.endsWith(".vercel.app") || normalizedOrigin.includes("vercel.app");
      const isAllowedOrigin = allowedOrigins.includes("*") || allowedOrigins.includes(normalizedOrigin);
      const isLocalhost = normalizedOrigin.includes("localhost") || normalizedOrigin.includes("127.0.0.1");

      if (isAllowedOrigin || isVercelDomain || isLocalhost) {
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

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Database connection configuration
const isProduction = IS_PRODUCTION;

const mongoUri = isProduction
  ? process.env.MONGODB_URI        // ← reads from Render's env vars
  : process.env.MONGODB_URI || "mongodb+srv://audumbarmore43%40gmail.com:Moer%40123456@cluster0.ksxevvf.mongodb.net/mayleki?retryWrites=true&w=majority";


// Fail-fast checks for production environment
if (isProduction) {
  if (!mongoUri || !mongoUri.trim()) {
    console.error("❌ Fatal Startup Error: MONGODB_URI is missing in production.");
    console.error("   Please set MONGODB_URI to your MongoDB Atlas connection string in Render environment variables.");
    process.exit(1);
  }

  // Reject local MongoDB hosts in production
  if (
    mongoUri.includes("localhost") ||
    mongoUri.includes("127.0.0.1") ||
    mongoUri.includes("::1")
  ) {
    console.error("❌ Fatal Startup Error: Local MongoDB host detected in production.");
    console.error("   Production must never connect to localhost MongoDB.");
    console.error("   Please set MONGODB_URI to your remote MongoDB Atlas connection string in Render.");
    process.exit(1);
  }
} else if (!mongoUri || !mongoUri.trim()) {
  console.error("❌ Fatal Startup Error: No MongoDB connection URI configured.");
  process.exit(1);
}

// Log safe diagnostic information without exposing credentials
let safeHost = "unknown";
try {
  const match = mongoUri.match(/^(mongodb(?:\+srv)?):\/\/(?:[^@]+@)?([^/?#]+)/i);
  if (match) {
    safeHost = `${match[1]}://${match[2]}`;
  }
} catch {
  // Keep fallback safe
}

console.log(`🌍 Environment: ${isProduction ? "production" : "development"}`);
console.log(`🔌 Platform: ${process.env.RENDER === "true" ? "Render" : "Local/Other"}`);
console.log(`🌐 Port: ${PORT}`);
console.log(`🔎 MongoDB target: ${safeHost}`);

// Start server only after MongoDB successfully connects
// Centralized 404 handler for undefined API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected internal server error occurred.",
    ...(IS_PRODUCTION ? {} : { stack: err.stack }),
  });
});

const startServer = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Mayleki Server running on port ${PORT} (bound to 0.0.0.0)`);
    });
  } catch (error) {
    if (!isProduction && mongoUri !== "mongodb://localhost:27017/mayleki") {
      console.warn("⚠️  Primary MongoDB connection failed (likely IP not whitelisted on Atlas).");
      console.warn("   Attempting fallback to local MongoDB (mongodb://localhost:27017/mayleki)...");
      try {
        await mongoose.connect("mongodb://localhost:27017/mayleki", {
          serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ Local MongoDB connected successfully as fallback!");
        app.listen(PORT, "0.0.0.0", () => {
          console.log(`🚀 Mayleki Server running on port ${PORT} (bound to 0.0.0.0) [Local Fallback]`);
        });
        return;
      } catch (localErr) {
        console.error("❌ Local MongoDB fallback also failed:", localErr.message);
      }
    }

    console.error("❌ Fatal Error: MongoDB connection failed.");
    console.error(`   Message: ${error.message}`);
    console.error(`   Name: ${error.name || "MongoError"}`);
    if (error.code) console.error(`   Code: ${error.code}`);
    if (isProduction) {
      console.error("   Render Troubleshooting:");
      console.error("   1. Verify your MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0).");
      console.error("   2. Verify your database username and password in MONGODB_URI.");
      console.error("   3. Ensure MONGODB_URI is saved in Render's Environment tab.");
    }
    process.exit(1);
  }
};

startServer();

export default app;
