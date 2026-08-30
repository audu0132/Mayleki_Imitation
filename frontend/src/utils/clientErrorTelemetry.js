export const logClientError = (err, info) => {
  const payload = {
    message: err?.message,
    stack: err?.stack,
    componentStack: info?.componentStack,
    url: window.location.href,
    time: new Date().toISOString(),
  };
  // Telemetry payload ready for logging service
  return payload;
};
