/**
 * Pin code verification and estimated shipping delivery times
 */

const METRO_PINCODES = ["411", "400", "110", "560", "500", "600", "700"];

export const checkPincodeServiceability = (pincode) => {
  const str = String(pincode || "").trim();
  if (!/^[1-9][0-9]{5}$/.test(str)) {
    return { serviceable: false, message: "Invalid 6-digit Indian PIN code." };
  }

  const prefix = str.substring(0, 3);
  const isMetro = METRO_PINCODES.includes(prefix);

  return {
    serviceable: true,
    estimatedDays: isMetro ? 2 : 4,
    expressAvailable: isMetro,
    courierPartner: "BlueDart Express Delivery",
  };
};
