import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login: loginUser, loading, error } = useApi();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      login(response.user, response.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      if (err.message.includes('Network Error')) {
        toast.error('Backend server is not running. Please start the backend service.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-surface">
      <div className="bg-background p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-secondary">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border border-border rounded-md text-base outline-none focus:border-accent transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-secondary">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3 border border-border rounded-md text-base outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && (
            <div className="bg-error-50 text-error-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`p-3 border-none rounded-md text-base font-medium transition-colors ${
              loading 
                ? 'bg-secondary-400 cursor-not-allowed' 
                : 'bg-accent hover:bg-accent-hover cursor-pointer'
            } text-text-inverse`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="text-center mt-5 text-text-secondary">
          Don't have an account? <Link to="/signup" className="text-accent no-underline font-medium hover:text-accent-hover">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;