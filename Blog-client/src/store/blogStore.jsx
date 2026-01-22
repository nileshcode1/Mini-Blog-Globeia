import { create } from 'zustand';

const useBlogStore = create((set, get) => ({
  blogs: [],
  currentBlog: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasNext: false,
    hasPrev: false
  },
  loading: false,
  error: null,
  
  setBlogs: (blogs, pagination) => {
    set({ blogs, pagination });
  },
  
  addBlog: (blog) => {
    set((state) => ({
      blogs: [blog, ...state.blogs]
    }));
  },
  
  updateBlog: (updatedBlog) => {
    set((state) => ({
      blogs: state.blogs.map(blog => 
        blog._id === updatedBlog._id ? updatedBlog : blog
      ),
      currentBlog: state.currentBlog?._id === updatedBlog._id ? updatedBlog : state.currentBlog
    }));
  },
  
  deleteBlog: (blogId) => {
    set((state) => ({
      blogs: state.blogs.filter(blog => blog._id !== blogId),
      currentBlog: state.currentBlog?._id === blogId ? null : state.currentBlog
    }));
  },
  
  setCurrentBlog: (blog) => {
    set({ currentBlog: blog });
  },
  
  setLoading: (loading) => {
    set({ loading });
  },
  
  setError: (error) => {
    set({ error });
  },
  
  clearError: () => {
    set({ error: null });
  }
}));

export default useBlogStore;