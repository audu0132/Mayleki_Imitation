import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    phone: { type: String },
    category: {
      type: String,
      enum: ["rental_inquiry", "deposit_refund", "order_status", "styling_advice", "other"],
      default: "rental_inquiry",
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    priority: { type: String, enum: ["low", "medium", "urgent"], default: "medium" },
  },
  { timestamps: true }
);

export default mongoose.models.SupportTicket || mongoose.model("SupportTicket", supportTicketSchema);
