// Crypto utility
const crypto = require('crypto');
const hash = (s) => crypto.createHash('sha256').update(s).digest('hex');
const randomToken = (n = 32) => crypto.randomBytes(n).toString('hex');
module.exports = { hash, randomToken };
