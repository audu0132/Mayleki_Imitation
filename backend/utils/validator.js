// Input validator helpers
const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
const isPhone = (v) => /^\d{10}$/.test(v);
module.exports = { isEmail, isPhone };
