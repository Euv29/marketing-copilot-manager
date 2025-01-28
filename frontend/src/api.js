import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

console.log('API baseURL:', api.defaults.baseURL);

export default api;