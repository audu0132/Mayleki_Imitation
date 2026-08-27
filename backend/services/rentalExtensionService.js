export const evaluateExtensionRequest = (currentOrder, additionalDays) => {
  if (additionalDays > 5) return { approved: false, reason: "Exceeds maximum allowable extension" };
  const extensionFee = additionalDays * currentOrder.dailyRate;
  return { approved: true, extensionFee };
};
