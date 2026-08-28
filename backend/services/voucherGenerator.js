export const generateVoucherCode = (prefix = "BRIDE") => {
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${randomStr}-2026`;
};
