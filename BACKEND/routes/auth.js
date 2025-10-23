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

// ✅ FIXED: Global Transporter (Create once, reuse everywhere)
let transporter = null;

const initializeTransporter = () => {
  try {
    // Check if email config exists
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('📧 Email configuration not found');
      return null;
    }

    console.log('📧 Creating email transporter...');
    
    // ✅ FIXED: Better configuration for Render
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000
    });

    console.log('✅ Email transporter created');
    
    // ✅ Verify transporter once at startup
    transporter.verify((error, success) => {
      if (error) {
        console.log('❌ Transporter verification failed:', error.message);
      } else {
        console.log('✅ Transporter is ready to send emails');
      }
    });
    
    return transporter;
    
  } catch (error) {
    console.error('❌ Transporter creation failed:', error.message);
    return null;
  }
};

// ✅ Initialize transporter when module loads
initializeTransporter();

// ✅ FIXED: OTP email sending function
const sendOTPEmail = async (email, otp, userName = 'User') => {
  console.log(`📧 Attempting to send OTP to: ${email}`);
  
  try {
    // ✅ Use global transporter instead of creating new one
    if (!transporter) {
      console.log('❌ No transporter available');
      return { success: false, debug: true, otp: otp };
    }

    // ✅ REMOVED: transporter.verify() - Don't verify every time
    
    // SIMPLE EMAIL TEMPLATE
    const mailOptions = {
      from: `"MOMENTS & ME" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP - MOMENTS & ME',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">MOMENTS & ME</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Password Reset</p>
          </div>
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e293b;">Hello ${userName},</h2>
            <p style="color: #64748b;">Use this OTP to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="font-size: 42px; font-weight: bold; letter-spacing: 8px; color: #2563eb; font-family: monospace;">
                ${otp}
              </div>
            </div>
            <p style="color: #64748b; font-size: 14px; text-align: center;">
              This OTP expires in 10 minutes.
            </p>
          </div>
          <div style="background: #1e293b; padding: 20px; text-align: center; color: #94a3b8; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; font-size: 12px;">© ${new Date().getFullYear()} MOMENTS & ME</p>
          </div>
        </div>
      `,
      text: `
MOMENTS & ME - Password Reset

Hello ${userName},

Use this OTP to reset your password: ${otp}

This OTP expires in 10 minutes.

If you didn't request this, please ignore this email.

© ${new Date().getFullYear()} MOMENTS & ME
      `
    };

    console.log('📧 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    
    // ✅ FIXED: Don't close transporter, keep it for reuse
    return { success: false, error: error.message, debug: true, otp: otp };
  }
  // ✅ REMOVED: finally block with transporter.close()
};

// Forgot Password - Send OTP - FIXED
router.post('/forgot-password', async (req, res) => {
  console.log('🔐 Forgot password request received');
  
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log(`🔐 Processing forgot password for: ${email}`);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
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

    console.log(`✅ OTP generated: ${otp}`);

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp, user.name);

    if (emailResult.success && !emailResult.debug) {
      console.log('✅ OTP email sent successfully');
      res.json({
        success: true,
        message: 'OTP sent to your email successfully'
      });
    } else {
      console.log('⚠️ Email service not configured, returning OTP in response');
      res.json({
        success: true,
        message: 'OTP generated successfully',
        otp: otp,
        debug: true,
        note: 'Email service not configured'
      });
    }

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    
    res.json({
      success: false,
      message: 'Failed to process request. Please try again.'
    });
  }
});

// ✅ FIXED: Test Email Endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // ✅ Use global transporter
    if (!transporter) {
      return res.json({
        success: false,
        message: 'Email service not configured'
      });
    }

    const testOTP = generateOTP();
    
    const mailOptions = {
      from: `"Test MOMENTS & ME" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Test Email - MOMENTS & ME Backend',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981;">✅ Test Email Successful!</h2>
          <p>This is a test email from your MOMENTS & ME backend server.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
          <p><strong>Test OTP:</strong> <code style="background: #f3f4f6; padding: 5px 10px; border-radius: 5px; font-size: 18px;">${testOTP}</code></p>
        </div>
      `,
      text: `Test Email Successful!\nTime: ${new Date().toLocaleString()}\nFrom: ${process.env.EMAIL_USER}\nTest OTP: ${testOTP}`
    };

    const info = await transporter.sendMail(mailOptions);
    // ✅ REMOVED: transporter.close()

    res.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test email error:', error);
    
    res.json({
      success: false,
      message: 'Failed to send test email'
    });
  }
});

// Resend OTP - FIXED
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
    const emailResult = await sendOTPEmail(email, otp, user.name);

    if (emailResult.success && !emailResult.debug) {
      res.json({
        success: true,
        message: 'New OTP sent successfully'
      });
    } else {
      res.json({
        success: true,
        message: 'New OTP generated',
        otp: otp,
        debug: true
      });
    }

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.json({
      success: false,
      message: 'Failed to resend OTP'
    });
  }
});

// Reset Password - FIXED
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
    console.error('Reset password error:', error);
    
    let errorMessage = 'Failed to reset password. Please try again.';
    
    if (error.name === 'ValidationError') {
      errorMessage = 'Invalid password format. Password must be at least 6 characters.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Login route - FIXED
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
      process.env.JWT_SECRET || 'fallback-secret-key', 
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
    console.error('Login error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Register route - FIXED
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
      process.env.JWT_SECRET || 'fallback-secret-key', 
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
    console.error('Registration error:', error);
    
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
  
  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} expired OTPs`);
  }
}, 5 * 60 * 1000);

module.exports = router;