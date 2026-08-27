export const getAdvanceBookingDiscount = (bookingDate, eventDate) => {
  const daysInAdvance = Math.ceil((new Date(eventDate) - new Date(bookingDate)) / (1000 * 60 * 60 * 24));
  if (daysInAdvance >= 60) return { discountPercent: 12, code: "EARLYBIRD60" };
  if (daysInAdvance >= 30) return { discountPercent: 8, code: "EARLYBIRD30" };
  return { discountPercent: 0, code: null };
};
