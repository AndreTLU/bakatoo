export const clearToken = () => localStorage.removeItem('jwt');
export const getToken = () => localStorage.jwt;
export const setToken = token => localStorage.setItem('jwt', token);