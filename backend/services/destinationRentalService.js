export const getDestinationRentalTerms = (days) => {
  if (days >= 10) {
    return { complimentaryCleaning: true, travelCaseUpgrade: "Hard-shell Pelican luggage" };
  }
  return { complimentaryCleaning: false, travelCaseUpgrade: "Standard velvet case" };
};
