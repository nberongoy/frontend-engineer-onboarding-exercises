export const getAccessToken = (): string => localStorage.getItem('token') || '';
export const isLoggedIn = (): boolean => Boolean(getAccessToken());
