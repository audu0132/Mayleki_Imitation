export const parseCourierEvent = (payload) => {
  return {
    trackingCode: payload.awb,
    event: payload.status_code === "DL" ? "DELIVERED_TO_STUDIO" : "IN_TRANSIT",
    timestamp: payload.event_time,
  };
};
