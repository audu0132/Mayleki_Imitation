import express from "express";
import SupportTicket from "../models/SupportTicket.js";

const router = express.Router();

router.post("/tickets", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, category, subject, message } = req.body;
    if (!customerName || !customerEmail || !message) {
      return res.status(400).json({ success: false, message: "Required fields missing." });
    }

    const ticketNumber = `TKT-${Date.now().toString().slice(-6)}`;
    const ticket = await SupportTicket.create({
      ticketNumber,
      customerName,
      customerEmail,
      phone,
      category,
      subject,
      message,
    });

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create support ticket." });
  }
});

export default router;
