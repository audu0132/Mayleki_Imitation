/**
 * Formatting utilities for currency, dates, and text strings
 */

export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const truncateText = (text, maxLength = 80) => {
  if (!text || text.length <= maxLength) return text || "";
  return `${text.slice(0, maxLength).trim()}...`;
};
