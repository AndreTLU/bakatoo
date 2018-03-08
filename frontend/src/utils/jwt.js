export const cleatToken = () => localStorage.remoteItem('jwt')
export const getToken = () => localStorage.jwt
export const setToken = token => localStorage.setItem('jwt', token)