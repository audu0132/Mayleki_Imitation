import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        addresses: req.user.addresses || [],
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve user profile." });
  }
});

router.get("/addresses", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      addresses: req.user.addresses || [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch addresses." });
  }
});

export default router;
