export const validateEngraving = (text) => {
  if (!text || text.length > 3) return { valid: false, message: "Maximum 3 monogram letters" };
  return { valid: true, sanitized: text.toUpperCase() };
};
