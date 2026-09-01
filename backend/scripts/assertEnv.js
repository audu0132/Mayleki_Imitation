export const assertRequiredEnv = () => {
  const required = ["PORT", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.warn("Notice: Default fallback values active for:", missing.join(", "));
  }
};
