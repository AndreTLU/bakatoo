const axios = require('axios');

const BASE_URL = '/api';

module.exports.Api = (method, url, query, header) => {
    return axios
        .request({
            method: method,
            baseURL: BASE_URL,
            url: url,
            data: query.data || {},
            params: query.params || {},
            headers: header
        })
        .then(response => {
            return Promise.resolve(response.data)
        })
        .catch(err => {
            return Promise.reject(err.response)
        });
}