export const trackMetaRentalLead = (productTitle, value) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: productTitle,
      value: value,
      currency: "INR",
    });
  }
};
