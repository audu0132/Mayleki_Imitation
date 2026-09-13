/**
 * Compact SMS / WhatsApp notification string builders
 */

export const getRentalDispatchedSms = (customerName, trackingId) => {
  return `Hello ${customerName}, your Mayleki luxury jewellery set is out for delivery! Track BlueDart shipment: ${trackingId}. Wear with grace!`;
};

export const getDepositRefundSms = (customerName, amount) => {
  return `Dear ${customerName}, your security deposit of INR ${amount} for Mayleki rental has been processed back to your original source account.`;
};
