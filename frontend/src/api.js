// filepath: /opt/lampp/htdocs/marketing-copilot-manager/frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mysterious-beach-84770-b25cca31cb4f.herokuapp.com/api',
});

export default api;