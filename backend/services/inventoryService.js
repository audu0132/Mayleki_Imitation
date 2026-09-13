/**
 * Inventory reservation service for managing rental item availability
 */

const activeReservations = new Map();

export const reserveItem = (productId, rentalDays, userId) => {
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15-minute checkout hold
  activeReservations.set(productId, { userId, rentalDays, expiresAt });
  return { reserved: true, expiresAt };
};

export const releaseReservation = (productId) => {
  return activeReservations.delete(productId);
};

export const isItemReserved = (productId) => {
  const reservation = activeReservations.get(productId);
  if (!reservation) return false;
  if (Date.now() > reservation.expiresAt) {
    activeReservations.delete(productId);
    return false;
  }
  return true;
};
