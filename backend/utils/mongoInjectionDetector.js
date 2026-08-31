export const hasMongoOperators = (obj) => {
  if (!obj || typeof obj !== "object") return false;
  return Object.keys(obj).some((key) => key.startsWith("$"));
};
