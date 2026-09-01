export const getTwitterMeta = ({ title, description, imageUrl }) => {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
  };
};
