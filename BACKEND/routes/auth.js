const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs temporarily
const otpStore = new Map();

// Email transporter configuration
const createTransporter = () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration missing');
    }

    const cleanPassword = process.env.EMAIL_PASS.replace(/\s/g, '');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword
      },
      secure: false,
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      socketTimeout: 30000
    });

    return transporter;
  } catch (error) {
    throw error;
  }
};

// OTP email sending function
// const sendOTPEmail = async (email, otp, userName = 'User') => {
//   let transporter;
//   try {
//     transporter = createTransporter();
//     if (!transporter) {
//       throw new Error('Email transporter not configured');
//     }

//     await transporter.verify();

//     const mailOptions = {
//       from: `"Vlog App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Password Reset OTP - Vlog App',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <style>
//                 body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
//                 .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
//                 .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white; }
//                 .content { padding: 30px; background: #f8fafc; }
//                 .otp-container { text-align: center; margin: 30px 0; }
//                 .otp-code { display: inline-block; background: white; padding: 25px 45px; border-radius: 15px; border: 3px dashed #2563eb; font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #2563eb; box-shadow: 0 8px 15px rgba(37, 99, 235, 0.2); }
//                 .footer { background: #1e293b; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
//                 .info-text { color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🔐 Password Reset Request</h1>
//                 </div>
//                 <div class="content">
//                     <h2 style="color: #1e293b; margin-bottom: 10px;">Hello ${userName},</h2>
//                     <p class="info-text">
//                         You requested to reset your password. Use the OTP below to verify your identity:
//                     </p>
//                     <div class="otp-container">
//                         <div class="otp-code">${otp}</div>
//                     </div>
//                     <p style="color: #64748b; font-size: 14px; text-align: center; background: #e2e8f0; padding: 15px; border-radius: 8px;">
//                         ⏰ This OTP will expire in <strong>10 minutes</strong>.<br>
//                         🔒 If you didn't request this, please ignore this email.
//                     </p>
//                 </div>
//                 <div class="footer">
//                     <p>© ${new Date().getFullYear()} Vlog App. All rights reserved.</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `,
//       text: `
// Password Reset OTP - Vlog App

// Hello ${userName},

// You requested to reset your password. Use the OTP below to verify your identity:

// OTP: ${otp}

// This OTP will expire in 10 minutes.
// If you didn't request this, please ignore this email.
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     if (transporter) {
//       transporter.close();
//     }
//     throw error;
//   }
// };



// OTP email sending function - TAILWINDCSS REDESIGN
const sendOTPEmail = async (email, otp, userName = 'User') => {
  let transporter;
  try {
    transporter = createTransporter();
    if (!transporter) {
      throw new Error('Email transporter not configured');
    }

    await transporter.verify();

    const mailOptions = {
      from: `"MOMENTS & ME" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP - MOMENTS & ME',
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - MOMENTS & ME</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center">
            <h1 class="text-3xl font-bold text-white mb-3">MOMENTS & ME</h1>
            <p class="text-blue-100 text-lg">Share Your Life's Precious Moments</p>
        </div>

        <!-- Content -->
        <div class="px-8 py-12 bg-gray-50">
            <!-- Greeting -->
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Hello, ${userName}!</h2>
                <p class="text-gray-600 text-lg">
                    You requested to reset your password. Use the OTP below to continue.
                </p>
            </div>

            <!-- OTP Section -->
            <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center border border-gray-200">
                <p class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-6">Your Verification Code</p>
                <div class="text-5xl font-bold text-blue-600 tracking-widest font-mono mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${otp}
                </div>
                <div class="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                    </svg>
                    Secure Code • Expires in 10 minutes
                </div>
            </div>

            <!-- Instructions -->
            <div class="space-y-6 mb-8">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                        <h3 class="font-semibold text-gray-800 mb-1">Enter the OTP</h3>
                        <p class="text-gray-600 text-sm">Copy the 6-digit code above</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                        <h3 class="font-semibold text-gray-800 mb-1">Verify Identity</h3>
                        <p class="text-gray-600 text-sm">Paste it in the password reset form</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                        <h3 class="font-semibold text-gray-800 mb-1">Set New Password</h3>
                        <p class="text-gray-600 text-sm">Create your new secure password</p>
                    </div>
                </div>
            </div>

            <!-- Note -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <p class="text-blue-800 text-sm">
                    If you didn't request this password reset, you can safely ignore this email.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-800 px-8 py-12 text-center">
            <div class="flex justify-center space-x-8 mb-6">
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
                <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Help</a>
            </div>
            
            <div class="flex justify-center space-x-4 mb-6">
                <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-400 transition-all">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 transition-all">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </a>
            </div>
            
            <div class="text-gray-400 text-sm">
                <p>© ${new Date().getFullYear()} MOMENTS & ME. All rights reserved.</p>
                <p class="mt-1">Made with ❤️ for storytellers</p>
            </div>
        </div>
    </div>
</body>
</html>
      `,
      text: `
MOMENTS & ME - Password Reset

Hello ${userName},

You requested to reset your password for your MOMENTS & ME account.

Your OTP: ${otp}

This OTP will expire in 10 minutes.

Steps:
1. Enter the OTP: ${otp}
2. Verify your identity
3. Create a new password

If you didn't request this, please ignore this email.

© ${new Date().getFullYear()} MOMENTS & ME
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    if (transporter) {
      transporter.close();
    }
    throw error;
  }
};







// Forgot Password - Send OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email address'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Store OTP
    otpStore.set(email, {
      otp,
      expiresAt,
      attempts: 0,
      createdAt: new Date(),
      userId: user._id
    });

    // Send OTP email
    await sendOTPEmail(email, otp, user.name);

    res.json({
      success: true,
      message: 'OTP sent to your email successfully'
    });

  } catch (error) {
    let errorMessage = 'Failed to send OTP. Please try again.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your Gmail app password and 2-factor authentication.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Cannot connect to email server. Please check your internet connection.';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Invalid email credentials. Please check your Gmail app password.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Test Email Endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email transporter not configured'
      });
    }

    await transporter.verify();

    const testOTP = generateOTP();
    
    const mailOptions = {
      from: `"Test Vlog App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Test Email - Vlog Backend',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981;">✅ Test Email Successful!</h2>
          <p>This is a test email from your Vlog backend server.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
          <p><strong>Test OTP:</strong> <code style="background: #f3f4f6; padding: 5px 10px; border-radius: 5px; font-size: 18px;">${testOTP}</code></p>
        </div>
      `,
      text: `Test Email Successful!\nTime: ${new Date().toLocaleString()}\nFrom: ${process.env.EMAIL_USER}\nTest OTP: ${testOTP}`
    };

    const info = await transporter.sendMail(mailOptions);
    transporter.close();

    res.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    let userMessage = 'Failed to send test email';
    if (error.code === 'EAUTH') {
      userMessage = 'Email authentication failed. Check your Gmail app password.';
    }

    res.status(500).json({
      success: false,
      message: userMessage
    });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Update OTP store
    otpStore.set(email, {
      otp,
      expiresAt,
      attempts: 0,
      createdAt: new Date(),
      userId: user._id
    });

    // Send OTP email
    await sendOTPEmail(email, otp, user.name);

    res.json({
      success: true,
      message: 'New OTP sent successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP'
    });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required'
      });
    }

    if (otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'OTP must be 6 digits'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if OTP exists and is valid
    const otpData = otpStore.get(email);
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired. Please request a new OTP.'
      });
    }

    // Check if OTP is expired
    if (new Date() > otpData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Check if OTP matches
    if (otpData.otp !== otp) {
      otpData.attempts += 1;
      
      // Limit attempts
      if (otpData.attempts >= 5) {
        otpStore.delete(email);
        return res.status(400).json({
          success: false,
          message: 'Too many failed attempts. Please request a new OTP.'
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Find user
    const user = await User.findById(otpData.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Set new password - User model will auto-hash it
    user.password = newPassword;
    await user.save();

    // Clear OTP from store
    otpStore.delete(email);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    let errorMessage = 'Failed to reset password. Please try again.';
    
    if (error.name === 'ValidationError') {
      errorMessage = 'Invalid password format. Password must be at least 6 characters.';
    } else if (error.name === 'MongoError') {
      errorMessage = 'Database error. Please try again.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      }
    });

  } catch (error) {
    let errorMessage = 'Login failed. Please try again.';
    
    if (error.message === 'Password comparison failed') {
      errorMessage = 'Password verification error. Please try again.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user with plain password - model will auto-hash it
    const user = new User({ 
      name, 
      email, 
      password
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      }
    });

  } catch (error) {
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error.name === 'ValidationError') {
      if (error.errors?.password) {
        errorMessage = 'Password must be at least 6 characters long.';
      } else if (error.errors?.email) {
        errorMessage = 'Please provide a valid email address.';
      }
    } else if (error.code === 11000) {
      errorMessage = 'User with this email already exists.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Debug endpoint to check OTPs (development only)
router.get('/debug/otps', (req, res) => {
  const otps = Array.from(otpStore.entries()).map(([email, data]) => ({
    email,
    otp: data.otp,
    expiresAt: data.expiresAt,
    attempts: data.attempts,
    createdAt: data.createdAt,
    timeLeft: Math.max(0, data.expiresAt - new Date())
  }));
  
  res.json({ 
    otpCount: otps.length,
    otps 
  });
});

// Clean expired OTPs every 5 minutes
setInterval(() => {
  const now = new Date();
  let cleaned = 0;
  
  for (const [email, otpData] of otpStore.entries()) {
    if (now > otpData.expiresAt) {
      otpStore.delete(email);
      cleaned++;
    }
  }
}, 5 * 60 * 1000);

module.exports = router;