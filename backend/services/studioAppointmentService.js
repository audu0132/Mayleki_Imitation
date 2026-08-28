export const createStudioAppointment = (name, phone, date, bridalOutfitDetails) => {
  return {
    bookingId: `APT-${Date.now().toString().slice(-6)}`,
    customer: name,
    phone,
    date,
    outfitNotes: bridalOutfitDetails,
    status: "Confirmed with Studio Concierge",
  };
};
