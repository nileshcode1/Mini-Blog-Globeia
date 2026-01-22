import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useAuthStore from '../store/authStore';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const { getBlogById, deleteBlog, loading, error } = useApi();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id, false);
        setBlog(response);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id, false);
        navigate('/');
      } catch (err) {
        console.error('Failed to delete blog:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-text-secondary">Loading blog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 text-error-500 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-text-secondary mb-2">Blog not found</h3>
        <Link to="/" className="text-accent hover:text-accent-hover">
          Go back to home
        </Link>
      </div>
    );
  }

  const isAuthor = user && blog.author._id === user.id;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-accent hover:text-accent-hover font-medium"
        >
          ← Back to blogs
        </Link>
      </div>

      <article className="bg-background rounded-lg shadow-md p-8">
        <header className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-text-primary">
              {blog.title}
            </h1>
            {isAuthor && (
              <div className="flex gap-3">
                <Link
                  to={`/edit/${blog._id}`}
                  className="bg-accent text-text-inverse px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-hover transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-error-500 text-text-inverse px-4 py-2 rounded-md text-sm font-medium hover:bg-error-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-text-secondary mb-6">
            <span>By {blog.author.email}</span>
            <span>•</span>
            <span>{formatDate(blog.createdAt)}</span>
            {blog.updatedAt !== blog.createdAt && (
              <>
                <span>•</span>
                <span>Updated {formatDate(blog.updatedAt)}</span>
              </>
            )}
          </div>

          {blog.image && (
            <div className="mb-6">
              <img
                src={`http://localhost:5000${blog.image}`}
                alt={blog.title}
                className="w-full max-h-96 object-cover rounded-lg border border-border"
              />
            </div>
          )}
        </header>

        <div className="prose max-w-none">
          <div className="text-text-primary leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;