import axios from 'axios';
import { getFullUrl } from './endpoints';

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth-storage');
      if (token) {
        try {
          const parsedStorage = JSON.parse(token);
          if (parsedStorage.state?.token) {
            config.headers.Authorization = `Bearer ${parsedStorage.state.token}`;
          }
        } catch (error) {
          console.error('Error parsing auth token:', error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
      
      // Handle network errors (backend not running)
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        error.message = 'Network Error: Backend server is not running';
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createAxiosInstance(getFullUrl(''));

export default apiClient;