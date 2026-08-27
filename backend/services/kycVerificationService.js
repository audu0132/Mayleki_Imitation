export const getRequiredKycLevel = (orderTotal) => {
  if (orderTotal > 20000) return { level: "Aadhaar / Passport OTP Verification Required" };
  if (orderTotal > 8000) return { level: "Mobile OTP Verification" };
  return { level: "Standard Guest Checkout" };
};
