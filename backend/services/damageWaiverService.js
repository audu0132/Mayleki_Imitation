export const calculateDamageWaiver = (rentalTotal) => {
  // Optional 5% waiver covers accidental micro-scratches or loose stone reset
  return Math.round(rentalTotal * 0.05);
};
