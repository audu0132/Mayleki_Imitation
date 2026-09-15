import { useState } from "react";

export function useRentalCalendar(initialDays = 3) {
  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState(initialDays);

  const getEndDate = () => {
    if (!startDate) return null;
    const end = new Date(startDate);
    end.setDate(end.getDate() + duration);
    return end.toISOString().split("T")[0];
  };

  return { startDate, setStartDate, duration, setDuration, endDate: getEndDate() };
}
