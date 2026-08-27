export const calculatePickupWindow = (eventDate) => {
  const returnDate = new Date(eventDate);
  returnDate.setDate(returnDate.getDate() + 1);
  return {
    pickupDate: returnDate.toISOString().split("T")[0],
    slots: ["10:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"],
  };
};
