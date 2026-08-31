export const validateOrigin = (origin, allowedOrigins = []) => {
  if (!origin) return true; // allow same-origin or curl
  return allowedOrigins.includes(origin) || origin.endsWith("mayleki.com");
};
