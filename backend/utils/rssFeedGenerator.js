export const generateRssFeed = (products = []) => {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Mayleki Imitation Jewellery Catalog</title>
    <link>https://mayleki.com</link>
    <description>New arrivals in royal bridal imitation jewellery</description>
  </channel>
</rss>`;
};
