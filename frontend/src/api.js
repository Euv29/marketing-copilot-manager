import axios from 'axios';

console.log('API URL:', process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mysterious-beach-84770-b25cca31cb4f.herokuapp.com/api',
});

export default api;