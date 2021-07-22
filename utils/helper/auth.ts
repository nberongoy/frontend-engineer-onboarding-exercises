export const getAccessToken = (): string => localStorage.getItem('access_token') || '';

export const isLoggedIn = (): boolean => Boolean(getAccessToken());
