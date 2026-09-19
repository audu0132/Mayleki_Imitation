// Notification helper
export const notify = (msg, type = 'info') => { console.log('[' + type.toUpperCase() + '] ' + msg); };
export const notifySuccess = (msg) => notify(msg, 'success');
export const notifyError = (msg) => notify(msg, 'error');
