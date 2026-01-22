import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import BlogCard from './BlogCard';
import Pagination from '../Common/Pagination';
import useApi from '../../hooks/useApi';
import useBlogStore from '../../store/blogStore';

const BlogList = ({ onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { getAllBlogs, deleteBlog, loading, error } = useApi();
  const { blogs, pagination } = useBlogStore();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await getAllBlogs({ page: currentPage, limit: 6 });
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        if (err.message.includes('Network Error') || err.message.includes('ECONNREFUSED')) {
          toast.error('Backend server is not running. Please start the backend service.');
        } else {
          toast.error('Failed to load blogs. Please try again.');
        }
      }
    };

    fetchBlogs();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(blogId);
        toast.success('Blog deleted successfully!');
      } catch (err) {
        console.error('Failed to delete blog:', err);
        toast.error('Failed to delete blog. Please try again.');
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-text-secondary">Loading blogs...</div>
      </div>
    );
  }

  if (error && blogs.length === 0) {
    return (
      <div className="bg-error-50 text-error-500 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-text-secondary mb-2">No blogs found</h3>
        <p className="text-text-muted">Be the first to publish a blog!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      
      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
          />
        </div>
      )}
    </div>
  );
};

export default BlogList;