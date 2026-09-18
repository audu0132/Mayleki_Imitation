// API base utility
const BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const get = (path) => fetch(BASE_URL + path).then(r => r.json());
export const post = (path, body) => fetch(BASE_URL + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());
