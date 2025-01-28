import axios from 'axios';

const apiBaseURL = process.env.NODE_ENV === 'production'
  ? 'https://mysterious-beach-84770-b25cca31cb4f.herokuapp.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: apiBaseURL,
});

console.log('API baseURL:', api.defaults.baseURL);

export default api;