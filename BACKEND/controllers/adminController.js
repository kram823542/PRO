const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};

// @desc    Register admin (नया एडमिन रजिस्टर करें)
// @route   POST /api/admin/register
const registerAdmin = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log('📝 Register attempt:', { username, email });

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide username, email and password' 
            });
        }

        // Check if admin already exists
        const adminExists = await Admin.findOne({ 
            $or: [{ email: email.toLowerCase() }, { username }] 
        });
        
        if (adminExists) {
            return res.status(400).json({ 
                success: false,
                message: 'Admin already exists with this email or username' 
            });
        }

        // 🔥 Create admin - password automatically hashed by pre-save middleware
        console.log('🔑 Plain password (will be hashed):', password);
        
        const admin = new Admin({
            username,
            email: email.toLowerCase(),
            password,  // Plain password - middleware will hash it automatically
            isAdmin: true
        });
        
        // Save to database - triggers pre-save middleware
        await admin.save();
        
        console.log('✅ Admin saved successfully');
        console.log('🔐 Hashed password in DB:', admin.password);

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            data: {
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                isAdmin: admin.isAdmin,
                token: generateToken(admin._id)
            }
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false,
                message: 'Duplicate field value entered' 
            });
        }
        
        next(error);
    }
};

// @desc    Login admin (एडमिन लॉगिन)
// @route   POST /api/admin/login
const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('🔑 Login attempt for email:', email);

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide email and password' 
            });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        
        if (!admin) {
            console.log('❌ Admin not found with email:', email);
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        console.log('✅ Admin found in database');
        console.log('🔐 Stored hashed password:', admin.password);

        // Compare password using model method
        const isPasswordMatch = await admin.comparePassword(password);
        console.log('📊 Password match result:', isPasswordMatch);

        if (isPasswordMatch) {
            console.log('✅ Login successful for:', email);
            
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    _id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    isAdmin: admin.isAdmin,
                    token: generateToken(admin._id)
                }
            });
        } else {
            console.log('❌ Password mismatch for:', email);
            res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        next(error);
    }
};

// @desc    Get admin profile (एडमिन प्रोफाइल देखें)
// @route   GET /api/admin/profile
const getAdminProfile = async (req, res, next) => {
    try {
        if (!req.admin) {
            return res.status(401).json({ 
                success: false,
                message: 'Not authorized' 
            });
        }
        
        const admin = await Admin.findById(req.admin._id).select('-password');
        
        if (!admin) {
            return res.status(404).json({ 
                success: false,
                message: 'Admin not found' 
            });
        }
        
        res.json({
            success: true,
            data: admin
        });
    } catch (error) {
        console.error('❌ Profile error:', error);
        next(error);
    }
};

// @desc    Update admin profile (प्रोफाइल अपडेट करें)
// @route   PUT /api/admin/profile
const updateAdminProfile = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        
        if (!admin) {
            return res.status(404).json({ 
                success: false,
                message: 'Admin not found' 
            });
        }
        
        // Update fields
        admin.username = req.body.username || admin.username;
        admin.email = req.body.email?.toLowerCase() || admin.email;
        
        // अगर पासवर्ड भेजा है तो अपडेट करें
        if (req.body.password) {
            admin.password = req.body.password;  // यह automatically hash हो जाएगा
        }
        
        const updatedAdmin = await admin.save();
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
                email: updatedAdmin.email,
                isAdmin: updatedAdmin.isAdmin,
                token: generateToken(updatedAdmin._id)
            }
        });
    } catch (error) {
        console.error('❌ Update error:', error);
        next(error);
    }
};

module.exports = { 
    registerAdmin, 
    loginAdmin, 
    getAdminProfile,
    updateAdminProfile 
};


