import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/Blog/BlogForm';
import useApi from '../hooks/useApi';
import useAuthStore from '../store/authStore';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const { getBlogById, loading, error } = useApi();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id, false);
        
        if (response.author._id !== user?.id) {
          navigate('/');
          return;
        }
        
        setBlog(response);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        navigate('/');
      }
    };

    fetchBlog();
  }, [id, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuccess = () => {
    navigate(`/blog/${id}`);
  };

  const handleCancel = () => {
    navigate(`/blog/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-text-secondary">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-error-50 text-error-500 p-4 rounded-md text-center">
        {error || 'Blog not found or you are not authorized to edit this blog'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BlogForm 
        blog={blog}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditBlog;