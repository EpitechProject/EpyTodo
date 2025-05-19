import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // à adapter si backend sur un autre port
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default API;
