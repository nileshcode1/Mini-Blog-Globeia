import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-accent hover:text-accent-hover">
              Mini Blog
            </Link>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/create" 
                  className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                >
                  Write Blog
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary">
                    Welcome, {user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-error-500 text-text-inverse px-4 py-2 rounded-md text-sm font-medium hover:bg-error-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-accent text-text-inverse px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-hover transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;