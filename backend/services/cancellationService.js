/**
 * Cancellation refund rules based on notice days prior to rental date
 */

export const calculateCancellationFee = (startDateStr, totalRentalFee) => {
  const startDate = new Date(startDateStr);
  const now = new Date();
  const diffDays = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));

  if (diffDays >= 7) {
    return { refundPercent: 100, fee: 0, reason: "Free cancellation (7+ days notice)" };
  } else if (diffDays >= 3) {
    const fee = Math.round(totalRentalFee * 0.2);
    return { refundPercent: 80, fee, reason: "20% cancellation fee (3-6 days notice)" };
  } else {
    const fee = Math.round(totalRentalFee * 0.5);
    return { refundPercent: 50, fee, reason: "50% cancellation fee (< 3 days notice)" };
  }
};
