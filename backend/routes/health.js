import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/metrics", (req, res) => {
  res.json({
    status: "healthy",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    memoryUsage: {
      rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
      heapMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
  });
});

export default router;
