export const analyzeSentiment = (text) => {
  const positiveWords = ["royal", "stunning", "gorgeous", "luxury", "authentic", "sparkle"];
  const count = positiveWords.filter((w) => text.toLowerCase().includes(w)).length;
  return { score: count, autoApprove: count >= 2 };
};
