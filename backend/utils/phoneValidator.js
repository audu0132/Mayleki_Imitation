export const validateIndianMobile = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(digits);
};
