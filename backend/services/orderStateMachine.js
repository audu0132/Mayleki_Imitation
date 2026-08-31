const ALLOWED_TRANSITIONS = {
  placed: ["confirmed", "cancelled"],
  confirmed: ["sanitizing", "cancelled"],
  sanitizing: ["dispatched"],
  dispatched: ["delivered"],
  delivered: ["returned"],
  returned: ["deposit_refunded", "damage_disputed"],
};

export const canTransitionOrder = (fromStatus, toStatus) => {
  const allowed = ALLOWED_TRANSITIONS[fromStatus] || [];
  return allowed.includes(toStatus);
};
