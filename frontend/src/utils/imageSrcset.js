export const generateSrcSet = (baseImgUrl) => {
  if (!baseImgUrl || !baseImgUrl.includes("unsplash")) return "";
  return `${baseImgUrl}&w=400 400w, ${baseImgUrl}&w=800 800w, ${baseImgUrl}&w=1200 1200w`;
};
