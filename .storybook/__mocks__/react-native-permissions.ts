export const PERMISSIONS = {};
export const RESULTS = { DENIED: 'denied', GRANTED: 'granted', BLOCKED: 'blocked', UNAVAILABLE: 'unavailable' };
export const check = () => Promise.resolve('denied');
export const request = () => Promise.resolve('denied');
export const openSettings = () => Promise.resolve();
