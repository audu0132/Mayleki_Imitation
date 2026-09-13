import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetEntity: { type: String, required: true },
  entityId: { type: String },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 90 }, // 90 days retention
});

export default mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);
