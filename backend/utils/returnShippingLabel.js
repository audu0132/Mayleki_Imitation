export const generateReturnLabelData = (orderId, returnAddress) => {
  return {
    waybillNumber: `BD-RTN-${orderId}`,
    serviceType: "Reverse Logistics Secure Handover",
    destination: "Mayleki Studio, Pune",
    returnDeadline: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
  };
};
