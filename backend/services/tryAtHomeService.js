export const isEligibleForTryAtHome = (pincode, cartValue) => {
  const isPune = pincode.startsWith("411");
  return isPune && cartValue >= 3500;
};
