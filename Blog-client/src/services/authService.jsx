import { apiClient } from '../config/axios';
import { ENDPOINTS } from '../config/endpoints';

export const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user info');
    }
  }
};

export default authService;