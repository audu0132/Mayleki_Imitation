export const prefetchRoute = (importer) => {
  try {
    importer();
  } catch {}
};
