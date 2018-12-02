import axios from 'axios';

const BASE_URL = '/api';

export default (method, url, query) => {
  const token = localStorage.jwt;
  return axios
    .request({
      method: method,
      baseURL: BASE_URL,
      url: url,
      data: query.data || {},
      params: query.params || {},
      headers: token ? { Authorization: `Bearer ${token}`} : {}
    })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(err => {
      return Promise.reject(err.response);
    });
}