export const isValidSku = (sku) => {
  // Format: MLK-CAT-000
  return /^MLK-[A-Z]{3,4}-[0-9]{3,5}$/.test(String(sku || "").trim());
};
