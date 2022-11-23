export const getToken = (): string => {
  return JSON.parse(localStorage.getItem('token') || '');
};
