// Response formatter
const success = (data, msg = 'OK') => ({ success: true, message: msg, data });
const error = (msg = 'Error') => ({ success: false, message: msg });
module.exports = { success, error };
