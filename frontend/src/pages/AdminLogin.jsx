import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Professional Color Scheme - Same as AdminPanel
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ API CALL FIXED - Hardcoded URL
      const response = await fetch('https://pro-muko.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.light }}>
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:max-w-lg">
          {/* Header Section */}
          <div className="text-center lg:text-left">
            {/* HELLO KUNDAN Heading */}
            <div className="mb-2">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HELLO KUNDAN! 👋
              </h1>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mt-4" style={{ color: colors.text }}>
              Welcome Back to Admin Panel
            </h2>
            <p className="mt-3 text-lg" style={{ color: colors.textLight }}>
              Sign in to manage your platform and access powerful admin tools
            </p>
          </div>

          {/* Login Form */}
          <div className="mt-8 lg:mt-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Admin Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3.5 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ 
                        borderColor: colors.textLight + '40', 
                        backgroundColor: colors.light 
                      }}
                      placeholder="admin@vlog.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3.5 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ 
                        borderColor: colors.textLight + '40', 
                        backgroundColor: colors.light 
                      }}
                      placeholder="Enter your password"
                    />
                    {/* Password Toggle Button */}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* Password visibility hint */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {showPassword ? 'Password is visible' : 'Password is hidden'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {password.length}/6+
                    </span>
                  </div>
                </div>

                {/* Login Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: colors.primary,
                      backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.backgroundImage = `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!loading) {
                        e.target.style.backgroundImage = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Sign In to Dashboard
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm font-medium mb-3" style={{ color: colors.textLight }}>
                    Demo Credentials for Testing
                  </p>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold" style={{ color: colors.primary }}>Email</p>
                        <p style={{ color: colors.text }}>admin@vlog.com</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold" style={{ color: colors.primary }}>Password</p>
                        <p style={{ color: colors.text }}>admin123</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            {/* Admin Icon */}
            <div className="w-24 h-24 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <h3 className="text-3xl font-bold mb-6">Admin Dashboard</h3>
            
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>User Management</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Content Management</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Analytics & Reports</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Platform Settings</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-400/30">
              <p className="text-blue-200 text-sm">
                Secure access to your platform's administrative controls
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;