import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mysterious-beach-84770-b25cca31cb4f.herokuapp.com/api',
});

export default api;