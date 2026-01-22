const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me'
  },
  BLOGS: {
    LIST: '/blogs',
    CREATE: '/blogs',
    GET_BY_ID: (id) => `/blogs/${id}`,
    UPDATE: (id) => `/blogs/${id}`,
    DELETE: (id) => `/blogs/${id}`
  }
};

export const getFullUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export default ENDPOINTS;