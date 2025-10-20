import React, { useState } from 'react';

const ForgotPassword = ({ onClose, showLogin, API_BASE_URL }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ✅ IMPROVED: Better environment handling
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Professional Color Scheme
  const colors = {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#f59e0b',
    success: '#10b981',
    error: '#ef4444',
    text: '#1e293b',
    textLight: '#64748b',
    light: '#f8fafc'
  };

  // Enhanced error handler with console logging
  const handleError = (error, context) => {
    if (isDevelopment) {
      console.error(`❌ ${context} Error:`, {
        name: error.name,
        message: error.message,
        stack: error.stack,
        step: step,
        email: email,
        timestamp: new Date().toISOString()
      });
    }

    let userFriendlyMessage = 'An unexpected error occurred. Please try again.';

    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      userFriendlyMessage = 'Cannot connect to server. Please check your internet connection and try again.';
    } else if (error.name === 'SyntaxError') {
      userFriendlyMessage = 'Invalid response from server. Please try again.';
    } else if (error.message) {
      userFriendlyMessage = error.message;
    }

    setError(userFriendlyMessage);
  };

  // Enhanced success handler with console logging
  const handleSuccess = (message, context) => {
    if (isDevelopment) {
      console.log(`✅ ${context} Success:`, {
        message,
        step: step,
        email: email,
        timestamp: new Date().toISOString()
      });
    }
    setMessage(message);
    setError('');
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Send OTP to email with enhanced error handling
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (isDevelopment) {
      console.log('🔄 handleSendOTP called:', { email, step });
    }

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isDevelopment) {
        console.log('📧 Sending OTP request:', {
          url: `${API_BASE_URL}/auth/forgot-password`,
          email: email,
          timestamp: new Date().toISOString()
        });
      }

      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (isDevelopment) {
        console.log('📡 OTP Response received:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        });
      }

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        if (isDevelopment) {
          console.error('❌ Server response not OK:', {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText
          });
        }
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Server error: ${response.status}`);
        } catch (parseError) {
          throw new Error(`Server error: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (data.success) {
        handleSuccess('OTP sent to your email successfully!', 'OTP Send');
        setStep(2);
      } else {
        const errorMsg = data.message || 'Failed to send OTP. Please try again.';
        if (isDevelopment) {
          console.error('❌ OTP Send failed:', errorMsg);
        }
        setError(errorMsg);
      }
    } catch (error) {
      handleError(error, 'OTP Send');
    } finally {
      setLoading(false);
      if (isDevelopment) {
        console.log('🏁 OTP Send process completed');
      }
    }
  };

  // Verify OTP and reset password with enhanced error handling
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (isDevelopment) {
      console.log('🔄 handleResetPassword called:', { 
        email, 
        otpLength: otp.length,
        step 
      });
    }

    // Validation
    if (!otp || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isDevelopment) {
        console.log('🔐 Sending reset password request:', {
          url: `${API_BASE_URL}/auth/reset-password`,
          email: email,
          otpLength: otp.length,
          hasNewPassword: !!newPassword,
          timestamp: new Date().toISOString()
        });
      }

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp, 
          newPassword 
        }),
      });

      if (isDevelopment) {
        console.log('📡 Reset Password Response received:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });
      }

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        if (isDevelopment) {
          console.error('❌ Reset password response not OK:', {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText
          });
        }
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Server error: ${response.status}`);
        } catch (parseError) {
          throw new Error(`Server error: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (data.success) {
        handleSuccess('Password reset successfully!', 'Password Reset');
        setStep(4);
      } else {
        const errorMsg = data.message || 'Invalid OTP or OTP expired';
        if (isDevelopment) {
          console.error('❌ Password reset failed:', errorMsg);
        }
        setError(errorMsg);
      }
    } catch (error) {
      handleError(error, 'Password Reset');
    } finally {
      setLoading(false);
      if (isDevelopment) {
        console.log('🏁 Password Reset process completed');
      }
    }
  };

  // Reset form function
  const resetForm = () => {
    if (isDevelopment) {
      console.log('🔄 Resetting form');
    }
    setStep(1);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
  };

  // Handle OTP input with validation
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle email input with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle back button
  const handleBack = () => {
    if (isDevelopment) {
      console.log('🔙 Going back from step:', step);
    }
    const previousStep = step - 1;
    setStep(previousStep);
    setError('');
    setMessage('');
  };

  // Handle close with confirmation if in progress
  const handleClose = () => {
    if (step > 1 && step < 4) {
      const confirmClose = window.confirm('Are you sure you want to close? Your progress will be lost.');
      if (confirmClose) {
        if (isDevelopment) {
          console.log('❌ User confirmed close during password reset process');
        }
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (isDevelopment) {
    console.log('🎯 ForgotPassword component rendered:', { 
      step, 
      email: email ? `${email.substring(0, 3)}...` : 'empty',
      loading,
      hasError: !!error,
      hasMessage: !!message
    });
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-[10000] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {step === 1 && 'Reset Password 🔐'}
                {step === 2 && 'Verify OTP 📧'}
                {step === 3 && 'New Password 🔑'}
                {step === 4 && 'Success! 🎉'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {step === 1 && 'Enter your email to receive OTP'}
                {step === 2 && 'Enter the OTP sent to your email'}
                {step === 3 && 'Create your new password'}
                {step === 4 && 'Your password has been reset successfully'}
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="text-white hover:text-blue-100 transition duration-200 p-2 rounded-full hover:bg-white/10 flex items-center justify-center"
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* ✅ IMPROVED: Debug info - Only show in development */}
          {isDevelopment && (
            <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-xs">
              <strong>Debug:</strong> Step {step} | API: {API_BASE_URL}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center animate-pulse">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center animate-bounce">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
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
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    style={{ backgroundColor: colors.light }}
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-xs mt-2" style={{ color: colors.textLight }}>
                  We'll send a 6-digit OTP to this email
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send OTP
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={showLogin}
                  disabled={loading}
                  className="px-6 py-3.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                  style={{ color: colors.text }}
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (isDevelopment) {
                console.log('➡️ Moving to password step');
              }
              setStep(3);
            }}>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Enter 6-Digit OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-center text-2xl font-mono tracking-widest"
                    style={{ backgroundColor: colors.light }}
                    placeholder="000000"
                    maxLength="6"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-xs mt-2" style={{ color: colors.textLight }}>
                  Enter the 6-digit OTP sent to {email}
                </p>
                <p className="text-xs mt-1" style={{ color: colors.accent }}>
                  OTP will expire in 10 minutes
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Verify OTP
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="px-6 py-3.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                  style={{ color: colors.text }}
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      style={{ backgroundColor: colors.light }}
                      placeholder="Enter new password (min. 6 characters)"
                      required
                      disabled={loading}
                      minLength="6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      style={{ backgroundColor: colors.light }}
                      placeholder="Confirm new password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password strength indicator */}
                {newPassword.length > 0 && (
                  <div className="text-xs" style={{ color: colors.textLight }}>
                    Password strength: 
                    <span style={{ 
                      color: newPassword.length >= 6 ? colors.success : colors.error 
                    }}>
                      {newPassword.length >= 6 ? ' Strong' : ' Weak'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !otp || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Reset Password
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="px-6 py-3.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                  style={{ color: colors.text }}
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                Password Reset Successful! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. You can now login with your new password.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={showLogin}
                  className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login Now
                </button>
                
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition duration-200"
                  style={{ color: colors.text }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with additional info */}
        <div className="px-6 pb-4">
          <div className="text-center">
            <p className="text-xs" style={{ color: colors.textLight }}>
              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure password reset process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;