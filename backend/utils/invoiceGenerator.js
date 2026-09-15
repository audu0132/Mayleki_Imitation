/**
 * Rental tax invoice data structure builder
 */

export const generateInvoiceData = (order) => {
  return {
    invoiceNumber: `INV-MLK-${order._id || Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    gstin: "27AAECM9821L1ZM",
    billingDetails: order.shippingAddress,
    items: order.items,
    totals: {
      subtotal: order.subtotal,
      tax: order.tax,
      refundableDeposit: order.deposit,
      grandTotal: order.total,
    },
  };
};
