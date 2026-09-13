import AuditLog from "../models/AuditLog.js";

export const logAuditEvent = async ({ action, actorId, targetEntity, entityId, details, req }) => {
  try {
    const ipAddress = req?.ip || req?.headers?.["x-forwarded-for"] || "internal";
    const userAgent = req?.headers?.["user-agent"] || "unknown";

    await AuditLog.create({
      action,
      actorId,
      targetEntity,
      entityId,
      details,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error("Audit log error:", error.message);
  }
};
