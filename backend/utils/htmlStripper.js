export const stripHtml = (input) => {
  return String(input || "").replace(/<[^>]*>?/gm, "").trim();
};
