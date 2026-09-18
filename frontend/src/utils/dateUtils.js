// Date utilities
export const formatDate = (d) => new Date(d).toLocaleDateString('en-IN');
export const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); return s < 60 ? 'just now' : Math.floor(s/60) + 'm ago'; };
