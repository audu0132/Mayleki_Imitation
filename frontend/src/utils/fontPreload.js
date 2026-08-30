export const injectFontPreload = (fontUrl) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.href = fontUrl;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
};
