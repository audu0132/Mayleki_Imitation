const attemptsMap = new Map();

export const recordFailedLogin = (email) => {
  const current = attemptsMap.get(email) || { count: 0, lockedUntil: null };
  current.count += 1;
  if (current.count >= 5) {
    current.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 min lock
  }
  attemptsMap.set(email, current);
  return current;
};

export const isAccountLocked = (email) => {
  const record = attemptsMap.get(email);
  if (!record || !record.lockedUntil) return false;
  if (Date.now() > record.lockedUntil) {
    attemptsMap.delete(email);
    return false;
  }
  return true;
};
