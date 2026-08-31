export const isFileSizeAllowed = (sizeInBytes, maxMb = 5) => {
  return sizeInBytes <= maxMb * 1024 * 1024;
};
