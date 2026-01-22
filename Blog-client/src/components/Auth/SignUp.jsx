import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi';
import useAuthStore from '../../store/authStore';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState('');
  
  const { register: registerUser, loading, error } = useApi();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await registerUser({
        email: formData.email,
        password: formData.password
      });

      login(response.user, response.token);
      toast.success('Registration successful! Welcome!');
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.message.includes('Network Error')) {
        toast.error('Backend server is not running. Please start the backend service.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-surface">
      <div className="bg-background p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">Sign Up</h2>
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
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-secondary">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="p-3 border border-border rounded-md text-base outline-none focus:border-accent transition-colors"
            />
          </div>

          {(error || validationError) && (
            <div className="bg-error-50 text-error-500 p-3 rounded-md text-sm">
              {validationError || error}
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mt-5 text-text-secondary">
          Already have an account? <Link to="/login" className="text-accent no-underline font-medium hover:text-accent-hover">Login</Link>
        </p>
      </div>
    </div>
  );
};


export default SignUp;