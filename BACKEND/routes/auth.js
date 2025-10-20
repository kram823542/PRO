const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// ✅ IMPROVED: JWT Secret validation
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'fallback_secret') {
  console.error('❌ CRITICAL: JWT_SECRET not set in environment variables');
  // Production mein aap exit kar sakte hain, but better to log heavily
  if (process.env.NODE_ENV === 'production') {
    console.error('🚨 JWT_SECRET is required in production environment');
  }
}

// ✅ User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    // ✅ IMPROVED: Use validated JWT_SECRET
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET || 'fallback_secret', // Keep fallback for development
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin'
      },
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// ✅ User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔑 LOGIN ATTEMPT:', { 
      email, 
      passwordLength: password?.length,
      timestamp: new Date().toISOString() 
    });

    // Check if user exists with password
    const user = await User.findOne({ email }).select('+password');
    console.log('👤 USER FOUND:', !!user);
    
    if (!user) {
      console.log('❌ USER NOT FOUND IN DATABASE');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Debug: Show stored password hash
    console.log('🔐 STORED PASSWORD HASH:', user.password ? `${user.password.substring(0, 20)}...` : 'NULL');
    console.log('📧 USER DETAILS:', { 
      id: user._id, 
      name: user.name, 
      email: user.email 
    });

    // ✅ FIX: Use direct bcrypt comparison
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('✅ PASSWORD VALIDATION RESULT:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ PASSWORD MISMATCH - Login failed');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // ✅ IMPROVED: Use validated JWT_SECRET
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET || 'fallback_secret', // Keep fallback for development
      { expiresIn: '30d' }
    );

    console.log('🎉 LOGIN SUCCESSFUL for:', email);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin'
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('❌ LOGIN ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// ✅ Get Current User
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // ✅ IMPROVED: Use validated JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin'
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// ✅ FORGET PASSWORD - Send OTP (FIXED)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('📧 FORGOT PASSWORD REQUEST for:', email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    console.log('👤 USER EXISTS:', !!user);
    
    if (!user) {
      // Security: Don't reveal if email exists or not
      console.log('ℹ️  User not found - sending generic response');
      return res.status(200).json({
        success: true,
        message: 'If email exists, OTP will be sent to your email'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log('🔑 OTP GENERATED:', otp);
    console.log('⏰ OTP EXPIRES:', otpExpiry);

    // ✅ FIX: Direct update without hooks
    await User.updateOne(
      { email },
      { 
        resetPasswordOTP: otp,
        resetPasswordExpires: otpExpiry
      }
    );

    console.log(`✅ OTP SAVED to user: ${email}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully! Check console for test OTP',
      testOtp: otp,
      note: 'Development Mode: Use this OTP for testing',
      expiry: '10 minutes',
      userEmail: email
    });

  } catch (error) {
    console.error('❌ FORGOT PASSWORD ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// ✅ RESET PASSWORD - COMPLETELY FIXED VERSION
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    console.log('🔐 RESET PASSWORD REQUEST:', { 
      email, 
      otp,
      newPasswordLength: newPassword?.length,
      timestamp: new Date().toISOString()
    });

    if (!email || !otp || !newPassword) {
      console.log('❌ MISSING FIELDS');
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required'
      });
    }

    if (newPassword.length < 6) {
      console.log('❌ PASSWORD TOO SHORT');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // ✅ FIX: First check OTP validity without password field
    const userCheck = await User.findOne({ 
      email, 
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: new Date() }
    }).select('resetPasswordOTP resetPasswordExpires');

    console.log('👤 USER WITH VALID OTP:', !!userCheck);
    
    if (userCheck) {
      console.log('⏰ CURRENT TIME:', new Date().toISOString());
      console.log('⏰ OTP EXPIRY:', userCheck.resetPasswordExpires);
    }

    if (!userCheck) {
      console.log('❌ INVALID OTP or EXPIRED');
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or OTP expired'
      });
    }

    // ✅ FIX: Direct bcrypt hash and update
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password and clear OTP fields
    await User.updateOne(
      { email, resetPasswordOTP: otp },
      { 
        password: hashedPassword,
        resetPasswordOTP: null,
        resetPasswordExpires: null
      }
    );

    console.log('🔑 NEW PASSWORD HASHED');

    // ✅ FIX: Verify the updated password
    const updatedUser = await User.findOne({ email }).select('+password');
    const passwordMatch = await bcrypt.compare(newPassword, updatedUser.password);
    console.log('🔍 PASSWORD VERIFICATION RESULT:', passwordMatch);

    if (passwordMatch) {
      console.log(`✅ PASSWORD RESET SUCCESSFUL for: ${email}`);
      res.status(200).json({
        success: true,
        message: 'Password reset successfully! You can now login with your new password.',
        verified: true
      });
    } else {
      console.log('❌ PASSWORD VERIFICATION FAILED');
      res.status(500).json({
        success: false,
        message: 'Password reset failed during verification. Please try again.'
      });
    }

  } catch (error) {
    console.error('❌ RESET PASSWORD ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// 🔍 DEBUG: Enhanced debug route
router.post('/debug-user', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email })
      .select('+password +resetPasswordOTP +resetPasswordExpires');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        passwordHash: user.password ? `${user.password.substring(0, 30)}...` : 'NULL',
        hasPassword: !!user.password,
        resetPasswordOTP: user.resetPasswordOTP,
        resetPasswordExpires: user.resetPasswordExpires,
        timestamps: {
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({
      success: false,
      message: 'Debug error'
    });
  }
});

module.exports = router;