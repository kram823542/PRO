// const User = require('../models/User');
// const Employee = require('../models/Employee');
// const bcrypt = require('bcryptjs');
// const generateToken = require('../utils/generateToken');
// const { generateUserId } = require('../utils/generateUserId');

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res) => {
//   try {
//     const { userId, password } = req.body;

//     if (!userId || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide user ID and password',
//       });
//     }

//     let user = null;
//     let role = '';
//     let clfId = null;

//     // Check if user exists in User model (Admin users)
//     user = await User.findOne({ userId });

//     if (user) {
//       role = user.role;
//       clfId = user.clfId;
      
//       // Check password
//       const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
//       if (!isPasswordValid) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials',
//         });
//       }

//       // Update last login
//       user.lastLogin = new Date();
//       await user.save();

//       // Generate token
//       const token = generateToken(user);

//       return res.status(200).json({
//         success: true,
//         token,
//         user: {
//           id: user._id,
//           userId: user.userId,
//           name: user.name,
//           role: user.role,
//           clfId: user.clfId,
//           status: user.status,
//         },
//       });
//     }

//     // Check if user exists in Employee model
//     const employee = await Employee.findOne({ userId }).populate('clfId');

//     if (employee) {
//       role = 'EMPLOYEE';
//       clfId = employee.clfId;
      
//       // Check password
//       const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);
//       if (!isPasswordValid) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials',
//         });
//       }

//       // Create or get user record for employee
//       let userRecord = await User.findOne({ userId: employee.userId });
//       if (!userRecord) {
//         userRecord = await User.create({
//           userId: employee.userId,
//           name: employee.name,
//           passwordHash: employee.passwordHash,
//           role: 'EMPLOYEE',
//           clfId: employee.clfId,
//           status: employee.status,
//         });
//       }

//       // Update last login
//       userRecord.lastLogin = new Date();
//       await userRecord.save();

//       // Generate token
//       const token = generateToken(userRecord);

//       return res.status(200).json({
//         success: true,
//         token,
//         user: {
//           id: userRecord._id,
//           userId: userRecord.userId,
//           name: userRecord.name,
//           role: userRecord.role,
//           clfId: userRecord.clfId,
//           status: userRecord.status,
//           employeeId: employee._id,
//           employeeType: employee.employeeType,
//         },
//       });
//     }

//     return res.status(401).json({
//       success: false,
//       message: 'Invalid credentials',
//     });
//   } catch (error) {
//     console.error('Login Error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error during login',
//     });
//   }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-passwordHash');
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     let response = {
//       id: user._id,
//       userId: user.userId,
//       name: user.name,
//       role: user.role,
//       clfId: user.clfId,
//       status: user.status,
//     };

//     // If employee, get additional data
//     if (user.role === 'EMPLOYEE') {
//       const employee = await Employee.findOne({ userId: user.userId });
//       if (employee) {
//         response.employeeId = employee._id;
//         response.employeeType = employee.employeeType;
//         response.designation = employee.designation;
//         response.mobile = employee.mobile;
//         response.joiningDate = employee.joiningDate;
//         response.clfName = employee.clfId ? (await employee.populate('clfId')).clfId.name : null;
//       }
//     }

//     res.status(200).json({
//       success: true,
//       user: response,
//     });
//   } catch (error) {
//     console.error('Get User Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// module.exports = { login, getMe };


const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { generateUserId } = require('../utils/generateUserId');
const cloudinaryService = require('../services/cloudinaryService');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide user ID and password',
      });
    }

    let user = null;
    let role = '';
    let clfId = null;

    // Check if user exists in User model (Admin users)
    user = await User.findOne({ userId });

    if (user) {
      role = user.role;
      clfId = user.clfId;

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          userId: user.userId,
          name: user.name,
          role: user.role,
          clfId: user.clfId,
          status: user.status,
          profilePicture: user.profilePicture || null,
        },
      });
    }

    // Check if user exists in Employee model
    const employee = await Employee.findOne({ userId }).populate('clfId');

    if (employee) {
      role = 'EMPLOYEE';
      clfId = employee.clfId;

      const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Create or get user record for employee
      let userRecord = await User.findOne({ userId: employee.userId });
      if (!userRecord) {
        userRecord = await User.create({
          userId: employee.userId,
          name: employee.name,
          passwordHash: employee.passwordHash,
          role: 'EMPLOYEE',
          clfId: employee.clfId,
          status: employee.status,
          profilePicture: employee.profilePicture || null,
          profilePicturePublicId: employee.profilePicturePublicId || null,
        });
      }

      userRecord.lastLogin = new Date();
      await userRecord.save();

      const token = generateToken(userRecord);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: userRecord._id,
          userId: userRecord.userId,
          name: userRecord.name,
          role: userRecord.role,
          clfId: userRecord.clfId,
          status: userRecord.status,
          employeeId: employee._id,
          employeeType: employee.employeeType,
          profilePicture: userRecord.profilePicture || employee.profilePicture || null,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    let response = {
      id: user._id,
      userId: user.userId,
      name: user.name,
      role: user.role,
      clfId: user.clfId,
      status: user.status,
      profilePicture: user.profilePicture || null,
    };

    if (user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: user.userId });
      if (employee) {
        response.employeeId = employee._id;
        response.employeeType = employee.employeeType;
        response.designation = employee.designation;
        response.mobile = employee.mobile;
        response.joiningDate = employee.joiningDate;
        response.clfName = employee.clfId
          ? (await employee.populate('clfId')).clfId.name
          : null;
        // ✅ Profile picture preference: User first, then Employee
        response.profilePicture =
          user.profilePicture || employee.profilePicture || null;
      }
    }

    res.status(200).json({
      success: true,
      user: response,
    });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Upload profile picture
// @route   POST /api/auth/upload-profile-picture
// @access  Private (All roles)
const uploadProfilePicture = async (req, res) => {
  try {
    // ✅ Check photo
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Photo is required. Upload using form-data with "photo" field.',
      });
    }

    // Get current user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // ✅ Delete old profile picture from Cloudinary if exists
    if (user.profilePicturePublicId) {
      try {
        await cloudinaryService.deleteFromCloudinary(user.profilePicturePublicId);
        console.log('🗑️  Old profile picture deleted from Cloudinary');
      } catch (err) {
        console.error('Failed to delete old profile picture:', err.message);
        // Continue anyway
      }
    }

    // ✅ Upload new photo to Cloudinary
    const uploadResult = await cloudinaryService.uploadToCloudinary(
      req.file.buffer,
      `profile_pictures/${user.role.toLowerCase()}`
    );

    // ✅ Update User model
    user.profilePicture = uploadResult.url;
    user.profilePicturePublicId = uploadResult.publicId;
    await user.save();

    // ✅ If employee, also update Employee model
    if (user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: user.userId });
      if (employee) {
        employee.profilePicture = uploadResult.url;
        employee.profilePicturePublicId = uploadResult.publicId;
        await employee.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully',
      profilePicture: uploadResult.url,
    });
  } catch (error) {
    console.error('Upload Profile Picture Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload profile picture',
    });
  }
};

// @desc    Remove profile picture
// @route   DELETE /api/auth/remove-profile-picture
// @access  Private (All roles)
const removeProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // ✅ Delete from Cloudinary
    if (user.profilePicturePublicId) {
      try {
        await cloudinaryService.deleteFromCloudinary(user.profilePicturePublicId);
      } catch (err) {
        console.error('Cloudinary delete failed:', err.message);
      }
    }

    // ✅ Clear from User model
    user.profilePicture = null;
    user.profilePicturePublicId = null;
    await user.save();

    // ✅ Clear from Employee model if employee
    if (user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: user.userId });
      if (employee) {
        employee.profilePicture = null;
        employee.profilePicturePublicId = null;
        await employee.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Profile picture removed successfully',
    });
  } catch (error) {
    console.error('Remove Profile Picture Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to remove profile picture',
    });
  }
};

module.exports = { login, getMe, uploadProfilePicture, removeProfilePicture };