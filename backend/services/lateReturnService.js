export const calculateLatePenalty = (overdueDays, dailyRate) => {
  if (overdueDays <= 0) return 0;
  // Late charge is 1.5x daily rental rate per delayed day
  return Math.round(overdueDays * dailyRate * 1.5);
};
