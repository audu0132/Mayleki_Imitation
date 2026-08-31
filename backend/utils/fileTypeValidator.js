export const isAllowedImageType = (mimeType) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  return allowed.includes(mimeType);
};
