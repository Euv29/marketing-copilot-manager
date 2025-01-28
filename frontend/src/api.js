import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
});

console.log('API baseURL:', api.defaults.baseURL);

export default api;