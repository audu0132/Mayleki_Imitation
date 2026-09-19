// Mailer stub
const sendMail = async ({ to, subject, html }) => { console.log('[MAIL] To: ' + to + ' Subject: ' + subject); };
module.exports = { sendMail };
