export const calculateWeekendSurge = (eventDate) => {
  const dayOfWeek = new Date(eventDate).getDay();
  // Friday (5), Saturday (6), Sunday (0) have peak demand
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
  return { isWeekend, surgeFactor: isWeekend ? 1.05 : 1.0 };
};
