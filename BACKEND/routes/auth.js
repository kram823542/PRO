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
const sendOTPEmail = async (email, otp, userName = 'User') => {
  let transporter;
  try {
    transporter = createTransporter();
    if (!transporter) {
      throw new Error('Email transporter not configured');
    }

    await transporter.verify();

    const mailOptions = {
      from: `"Vlog App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP - Vlog App',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
                .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white; }
                .content { padding: 30px; background: #f8fafc; }
                .otp-container { text-align: center; margin: 30px 0; }
                .otp-code { display: inline-block; background: white; padding: 25px 45px; border-radius: 15px; border: 3px dashed #2563eb; font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #2563eb; box-shadow: 0 8px 15px rgba(37, 99, 235, 0.2); }
                .footer { background: #1e293b; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
                .info-text { color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🔐 Password Reset Request</h1>
                </div>
                <div class="content">
                    <h2 style="color: #1e293b; margin-bottom: 10px;">Hello ${userName},</h2>
                    <p class="info-text">
                        You requested to reset your password. Use the OTP below to verify your identity:
                    </p>
                    <div class="otp-container">
                        <div class="otp-code">${otp}</div>
                    </div>
                    <p style="color: #64748b; font-size: 14px; text-align: center; background: #e2e8f0; padding: 15px; border-radius: 8px;">
                        ⏰ This OTP will expire in <strong>10 minutes</strong>.<br>
                        🔒 If you didn't request this, please ignore this email.
                    </p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Vlog App. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `
Password Reset OTP - Vlog App

Hello ${userName},

You requested to reset your password. Use the OTP below to verify your identity:

OTP: ${otp}

This OTP will expire in 10 minutes.
If you didn't request this, please ignore this email.
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