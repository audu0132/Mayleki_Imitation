import crypto from "crypto";

export const verifyRazorpaySignature = (bodyString, signature, secret) => {
  const expectedSignature = crypto
    .createHmac("sha256", secret || process.env.RAZORPAY_KEY_SECRET || "rzp_secret")
    .update(bodyString)
    .digest("hex");

  return expectedSignature === signature;
};
