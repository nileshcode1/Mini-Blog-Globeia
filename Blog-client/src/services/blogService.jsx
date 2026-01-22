import { apiClient } from '../config/axios';
import { ENDPOINTS } from '../config/endpoints';

export const blogService = {
  getAllBlogs: async (params = {}) => {
    try {
      const response = await apiClient.get(ENDPOINTS.BLOGS.LIST, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.BLOGS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch blog');
    }
  },

  createBlog: async (blogData) => {
    try {
      const config = {};
      // If blogData is FormData (for file upload), set appropriate headers
      if (blogData instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }
      
      const response = await apiClient.post(ENDPOINTS.BLOGS.CREATE, blogData, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create blog');
    }
  },

  updateBlog: async (id, blogData) => {
    try {
      const config = {};
      // If blogData is FormData (for file upload), set appropriate headers
      if (blogData instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }
      
      const response = await apiClient.put(ENDPOINTS.BLOGS.UPDATE(id), blogData, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update blog');
    }
  },

  deleteBlog: async (id) => {
    try {
      const response = await apiClient.delete(ENDPOINTS.BLOGS.DELETE(id));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete blog');
    }
  }
};

export default blogService;