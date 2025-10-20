import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';

const LoginForm = ({ isOpen, onClose, onLogin, onRegister, currentUser, onLogout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Professional Color Scheme
  const colors = {
    primary: '#2563eb',      // Professional Blue
    secondary: '#1e40af',    // Dark Blue
    accent: '#f59e0b',       // Amber
    dark: '#0f172a',         // Dark Slate
    light: '#f8fafc',        // Light Background
    text: '#1e293b',         // Text Color
    textLight: '#64748b',    // Light Text
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444'         // Red
  };

  // API Base URL
  const API_BASE_URL = 'https://pro-muko.onrender.com/api';
  // Localhost testing ke liye
// const API_BASE_URL = 'http://localhost:5000/api';

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real API call for login
  const handleLoginAPI = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Real API call for register
  const handleRegisterAPI = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let response;

      if (isLogin) {
        // Login API call
        response = await handleLoginAPI(formData.email, formData.password);
        
        onLogin({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          isAdmin: response.user.role === 'admin',
          token: response.token
        });

        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          ...response.user,
          isAdmin: response.user.role === 'admin'
        }));

      } else {
        // Register API call
        response = await handleRegisterAPI(formData.name, formData.email, formData.password);
        
        onRegister({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          isAdmin: response.user.role === 'admin',
          token: response.token
        });

        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          ...response.user,
          isAdmin: response.user.role === 'admin'
        }));
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setErrors({});
      onClose();

    } catch (error) {
      setErrors({ submit: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  // Handle background click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden transform transition-all duration-300 scale-100">
          {/* Modal Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {isLogin ? 'WELCOME BACK! 👋' : 'GET STARTED! 🚀'}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {isLogin ? 'Sign in to your account to continue' : 'Create your account to get started'}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-white hover:text-blue-100 transition duration-200 p-2 rounded-full hover:bg-white/10 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name 
                          ? 'border-red-300' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: colors.light }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email 
                        ? 'border-red-300' 
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: colors.light }}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password 
                        ? 'border-red-300' 
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: colors.light }}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link - Only in Login Mode */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium hover:underline transition duration-200"
                    style={{ color: colors.primary }}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                style={{ 
                  backgroundColor: colors.primary,
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundImage = `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`;
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundImage = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isLogin ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      )}
                    </svg>
                    {isLogin ? 'Sign In to Account' : 'Create New Account'}
                  </>
                )}
              </button>
            </form>

            {/* Switch between Login and Signup */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm" style={{ color: colors.textLight }}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="font-semibold hover:underline transition duration-200"
                    style={{ color: colors.primary }}
                  >
                    {isLogin ? 'Sign up now' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: `${colors.primary}05` }}>
              <p className="text-xs" style={{ color: colors.textLight }}>
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your data is securely encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPassword 
          onClose={() => setShowForgotPassword(false)}
          showLogin={() => setShowForgotPassword(false)}
          API_BASE_URL={API_BASE_URL}
        />
      )}
    </>
  );
};

export default LoginForm;