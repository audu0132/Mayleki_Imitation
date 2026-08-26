export const validateJewelleryDimensions = (dimensions) => {
  const { lengthCm, weightGrams } = dimensions || {};
  if (!lengthCm || lengthCm <= 0) return { valid: false, error: "Invalid length" };
  if (!weightGrams || weightGrams <= 0) return { valid: false, error: "Invalid weight" };
  return { valid: true };
};
