import { useState, useCallback } from 'react';
import useAuthStore from '../store/authStore';
import useBlogStore from '../store/blogStore';
import { authService } from '../services/authService';
import { blogService } from '../services/blogService';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { logout } = useAuthStore();
  const { setBlogs, addBlog, updateBlog, deleteBlog, setCurrentBlog } = useBlogStore();

  const handleError = (err) => {
    if (err.message.includes('401') || err.message.includes('Session expired')) {
      logout();
      return 'Session expired. Please login again.';
    }
    return err.message || 'An error occurred';
  };

  const executeService = async (serviceCall, updateStore = true, storeAction = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await serviceCall();
      
      if (updateStore && storeAction) {
        storeAction(response);
      }

      return response;
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Auth methods
  const register = (userData) => {
    return executeService(() => authService.register(userData), false);
  };

  const login = (credentials) => {
    return executeService(() => authService.login(credentials), false);
  };

  const getCurrentUser = () => {
    return executeService(() => authService.getCurrentUser(), false);
  };

  // Blog methods
  const getAllBlogs = (params, updateStore = true) => {
    return executeService(
      () => blogService.getAllBlogs(params),
      updateStore,
      updateStore ? (response) => setBlogs(response.blogs, response.pagination) : null
    );
  };

  const getBlogById = (id, updateStore = true) => {
    return executeService(
      () => blogService.getBlogById(id),
      updateStore,
      updateStore ? (response) => setCurrentBlog(response) : null
    );
  };

  const createBlog = (blogData, updateStore = true) => {
    return executeService(
      () => blogService.createBlog(blogData),
      updateStore,
      updateStore ? (response) => addBlog(response) : null
    );
  };

  const updateBlogById = (id, blogData, updateStore = true) => {
    return executeService(
      () => blogService.updateBlog(id, blogData),
      updateStore,
      updateStore ? (response) => updateBlog(response) : null
    );
  };

  const deleteBlogById = (id, updateStore = true) => {
    return executeService(
      () => blogService.deleteBlog(id),
      updateStore,
      updateStore ? () => deleteBlog(id) : null
    );
  };

  return {
    loading,
    error,
    clearError: () => setError(null),
    // Auth methods
    register,
    login,
    getCurrentUser,
    // Blog methods
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog: updateBlogById,
    deleteBlog: deleteBlogById
  };
};

export default useApi;