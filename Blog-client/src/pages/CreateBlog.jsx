import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/Blog/BlogForm';

const CreateBlog = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <BlogForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreateBlog;