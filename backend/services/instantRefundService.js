export const isEligibleForInstantRefund = (customerHistory) => {
  return customerHistory?.completedRentals >= 2 && customerHistory?.disputeCount === 0;
};
