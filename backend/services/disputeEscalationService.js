export const escalateDispute = (orderId, issueType) => {
  return {
    priority: "URGENT",
    assignedTo: "Boutique Manager (Pune Head Studio)",
    slaMinutes: 120,
    escalationTimestamp: new Date().toISOString(),
  };
};
