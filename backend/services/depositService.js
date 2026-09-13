/**
 * Security deposit management for jewellery rentals
 */

export const calculateRefundableDeposit = (itemRetailValue, rentalDays = 3) => {
  // Base deposit is 25% of replacement retail value, capped between 1,000 and 15,000 INR
  const rawDeposit = itemRetailValue * 0.25;
  return Math.min(15000, Math.max(1000, Math.round(rawDeposit / 100) * 100));
};

export const determineDepositRefundStatus = (returnInspection) => {
  const { receivedOnTime, noDamage, allAccessoriesReturned } = returnInspection;
  if (receivedOnTime && noDamage && allAccessoriesReturned) {
    return { eligible: true, deduction: 0, reason: "Full refund approved" };
  }
  let deduction = 0;
  if (!noDamage) deduction += 500;
  if (!receivedOnTime) deduction += 300;
  return { eligible: true, deduction, reason: "Partial refund after inspection" };
};
