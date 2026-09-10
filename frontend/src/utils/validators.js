/**
 * Form field validation helpers
 */

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email || "").toLowerCase().trim());
};

export const isValidPhone = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(digits);
};

export const isValidPincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(String(pincode || "").trim());
};
