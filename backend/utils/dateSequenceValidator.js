export const validateDateSequence = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (start < now) return { valid: false, message: "Rental start date cannot be in the past." };
  if (end <= start) return { valid: false, message: "End date must be after start date." };
  return { valid: true };
};
