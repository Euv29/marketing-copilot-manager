import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL ;

if (!baseURL) {
  throw new Error('API baseURL is not defined');
}

const api = axios.create({
  baseURL,
});

console.log('API baseURL:', api.defaults.baseURL);

export default api;