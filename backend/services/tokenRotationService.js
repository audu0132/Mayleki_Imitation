import crypto from "crypto";

export const generateSecureRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};
