import React, { useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import BlogForm from '../components/Blog/BlogForm';
import useAuthStore from '../store/authStore';

const Home = () => {
  const [editingBlog, setEditingBlog] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowCreateForm(false);
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setEditingBlog(null);
  };

  const handleEditSuccess = () => {
    setEditingBlog(null);
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setShowCreateForm(false);
  };

  const handleWriteStoryClick = () => {
    setShowCreateForm(true);
    // Scroll to the form section after a short delay to ensure it's rendered
    setTimeout(() => {
      const formSection = document.getElementById('blog-form-section');
      if (formSection) {
        formSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 via-background to-primary-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-accent rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-accent rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                  Mini Blog
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Discover amazing stories, share your thoughts, and connect with a community of passionate writers
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center items-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1000+</div>
                <div className="text-sm text-text-muted">Stories</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">500+</div>
                <div className="text-sm text-text-muted">Writers</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50k+</div>
                <div className="text-sm text-text-muted">Readers</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated && !editingBlog && !showCreateForm && (
                <button
                  onClick={handleWriteStoryClick}
                  className="group bg-accent text-text-inverse px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Write Your Story
                  </span>
                </button>
              )}
              
              <button
                onClick={() => document.getElementById('blogs-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-background text-accent border-2 border-accent px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent hover:text-text-inverse transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Blogs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Form Section */}
      {(showCreateForm || editingBlog) && (
        <div id="blog-form-section" className="bg-surface py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                {editingBlog ? 'Edit Your Story' : 'Share Your Story'}
              </h2>
              <p className="text-text-secondary">
                {editingBlog ? 'Update your blog post' : 'Create something amazing for the community'}
              </p>
            </div>
            <BlogForm
              blog={editingBlog}
              onSuccess={editingBlog ? handleEditSuccess : handleCreateSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {/* Blogs Section */}
      <div id="blogs-section" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Latest Stories
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Dive into our collection of inspiring stories, tutorials, and insights from our community
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Featured Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-accent px-4 py-2 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Content
            </div>
          </div>

          {/* Blog List */}
          <BlogList onEdit={handleEdit} />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-text-primary mb-4">
            Stay Updated
          </h3>
          <p className="text-xl text-text-secondary mb-8">
            Get the latest stories and updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-border focus:border-accent outline-none"
            />
            <button className="bg-accent text-text-inverse px-6 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;