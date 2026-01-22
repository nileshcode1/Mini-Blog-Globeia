import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi';

const BlogForm = ({ blog, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { createBlog, updateBlog, loading, error } = useApi();
  const isEditing = !!blog;

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content
      });
      // Set existing image preview if editing
      if (blog.image) {
        setImagePreview(`http://localhost:5000${blog.image}`);
      }
    }
  }, [blog]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      
      if (selectedImage) {
        submitData.append('image', selectedImage);
      }

      if (isEditing) {
        await updateBlog(blog._id, submitData);
        toast.success('Blog updated successfully!');
      } else {
        await createBlog(submitData);
        toast.success('Blog created successfully!');
      }
      
      setFormData({ title: '', content: '' });
      setSelectedImage(null);
      setImagePreview(null);
      onSuccess?.();
    } catch (err) {
      console.error('Blog operation failed:', err);
      if (err.message.includes('Network Error')) {
        toast.error('Backend server is not running. Please start the backend service.');
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'create'} blog. Please try again.`);
      }
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        {isEditing ? 'Edit Blog' : 'Create New Blog'}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-secondary">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            className="p-3 border border-border rounded-md text-base outline-none focus:border-accent transition-colors"
            placeholder="Enter blog title..."
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-secondary">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="p-3 border border-border rounded-md text-base outline-none focus:border-accent transition-colors resize-vertical"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-secondary">Image (Optional)</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 border border-border rounded-md text-base outline-none focus:border-accent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-accent file:text-text-inverse hover:file:bg-accent-hover"
          />
          <p className="text-xs text-text-muted">Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB</p>
          
          {imagePreview && (
            <div className="mt-3 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs max-h-48 rounded-md border border-border object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-error-500 text-text-inverse rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-error-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-error-50 text-error-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button 
            type="submit" 
            disabled={loading}
            className={`px-6 py-3 border-none rounded-md text-base font-medium transition-colors ${
              loading 
                ? 'bg-secondary-400 cursor-not-allowed' 
                : 'bg-accent hover:bg-accent-hover cursor-pointer'
            } text-text-inverse`}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
          </button>
          
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="px-6 py-3 bg-secondary-200 text-text-secondary border-none rounded-md text-base font-medium hover:bg-secondary-300 cursor-pointer transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogForm;