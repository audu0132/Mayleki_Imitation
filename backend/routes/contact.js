import express from "express";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Contact request model (inline for simplicity)
import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  type: { type: String, default: "General Inquiry" },
  message: String,
  status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  adminNote: String,
}, { timestamps: true });
const Contact = mongoose.model("Contact", ContactSchema);

// @POST /api/contact
router.post("/", async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "Your message has been sent! We'll get back to you soon.", data: contact });
  } catch (err) {
    next(err);
  }
});

// @GET /api/contact — Admin view
router.get("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort("-createdAt").limit(100);
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
});

// @PATCH /api/contact/:id
router.patch("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
});

export default router;
