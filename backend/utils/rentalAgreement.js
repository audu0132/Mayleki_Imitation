/**
 * Rental Agreement Legal Clauses Generator
 */

export const getRentalAgreementTerms = ({ customerName, orderId, rentalDates }) => {
  return {
    title: "Mayleki Imitation Jewellery Rental Terms & Conditions",
    orderId,
    customerName,
    rentalDates,
    clauses: [
      "The client agrees to handle all 1GM gold pieces with standard ceremonial care.",
      "Direct perfume, water spray, and chemical contact must be avoided.",
      "The piece must be handed over to the courier partner in the provided protective case.",
    ],
  };
};
