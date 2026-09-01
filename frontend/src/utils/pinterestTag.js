export const trackPinterestSave = (pinName) => {
  if (typeof window !== "undefined" && window.pintrk) {
    window.pintrk("track", "custom", { event_name: "Bridal_Inspiration_Save", pin_name: pinName });
  }
};
