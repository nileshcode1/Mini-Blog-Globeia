import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getImageUrl } from '../../utils/imageHelper';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isAuthor = user && blog.author._id === user.id;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPreview = (content) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  const handleCardClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(blog);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    onDelete(blog._id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl"
    >
      {blog.image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={getImageUrl(blog.image)}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-text-primary hover:text-accent transition-colors">
            {blog.title}
          </h3>
          {isAuthor && (
            <div className="flex gap-2 z-10">
              <button
                onClick={handleEditClick}
                className="text-accent hover:text-accent-hover text-sm font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-error-500 hover:text-error-600 text-sm font-medium px-2 py-1 rounded hover:bg-error-50 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        
        <p className="text-text-secondary mb-4 leading-relaxed">
          {getPreview(blog.content)}
        </p>
        
        <div className="flex justify-between items-center text-sm text-text-muted">
          <span>By {blog.author.email}</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;