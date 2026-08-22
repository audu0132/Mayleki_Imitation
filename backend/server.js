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

const configuredMongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "";
const MONGODB_URI = configuredMongoUri || (!IS_PRODUCTION ? "mongodb://localhost:27017/mayleki" : "");

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not configured. Add MONGODB_URI to Render Environment Variables.");
  process.exit(1);
}

let parsedMongoUrl;
try {
  parsedMongoUrl = new URL(MONGODB_URI);
} catch {
  console.error("❌ MONGODB_URI is present but is not a valid MongoDB connection string.");
  process.exit(1);
}

if (!['mongodb:', 'mongodb+srv:'].includes(parsedMongoUrl.protocol)) {
  console.error("❌ MONGODB_URI must start with mongodb:// or mongodb+srv://");
  process.exit(1);
}

const mongoHost = parsedMongoUrl.hostname;
console.log(`🔎 MongoDB target: ${parsedMongoUrl.protocol}//${mongoHost}${parsedMongoUrl.port ? `:${parsedMongoUrl.port}` : ""}`);
console.log(`🌍 Environment: ${IS_PRODUCTION ? "production" : "development"}`);
console.log(`🔌 Render: ${process.env.RENDER === "true" ? "yes" : "no"}`);
console.log(`🌐 PORT: ${PORT}`);

if (IS_PRODUCTION && ["localhost", "127.0.0.1", "::1"].includes(mongoHost)) {
  console.error("❌ Production is using a local MongoDB host. Set MONGODB_URI to your MongoDB Atlas connection string in Render.");
  process.exit(1);
}

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
    console.error(`   Name: ${error.name || "MongoError"}`);
    if (error.code) console.error(`   Code: ${error.code}`);
    console.error("   Check MongoDB Atlas Network Access, database username/password, and the MONGODB_URI stored in Render.");
    process.exit(1);
  });

export default app;
