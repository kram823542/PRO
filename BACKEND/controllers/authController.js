
// const User = require('../models/User');
// const Employee = require('../models/Employee');
// const bcrypt = require('bcryptjs');
// const generateToken = require('../utils/generateToken');
// const { generateUserId } = require('../utils/generateUserId');
// const cloudinaryService = require('../services/cloudinaryService');

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

//       const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
//       if (!isPasswordValid) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials',
//         });
//       }

//       user.lastLogin = new Date();
//       await user.save();

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
//           profilePicture: user.profilePicture || null,
//         },
//       });
//     }

//     // Check if user exists in Employee model
//     const employee = await Employee.findOne({ userId }).populate('clfId');

//     if (employee) {
//       role = 'EMPLOYEE';
//       clfId = employee.clfId;

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
//           profilePicture: employee.profilePicture || null,
//           profilePicturePublicId: employee.profilePicturePublicId || null,
//         });
//       }

//       userRecord.lastLogin = new Date();
//       await userRecord.save();

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
//           designation: employee.designation,
//           profilePicture: userRecord.profilePicture || employee.profilePicture || null,
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
//       profilePicture: user.profilePicture || null,
//     };

//     // ✅ If employee, add employee details
//     if (user.role === 'EMPLOYEE') {
//       const employee = await Employee.findOne({ userId: user.userId }).populate(
//         'clfId',
//         'name'
//       );

//       if (employee) {
//         response.employeeId = employee._id;
//         response.designation = employee.designation;
//         response.mobile = employee.mobile;
//         response.joiningDate = employee.joiningDate;
//         // ✅ Bank Details
//         response.bankName = employee.bankName;
//         response.bankAccountNumber = employee.bankAccountNumber;
//         response.branch = employee.branch;
//         response.ifscCode = employee.ifscCode;
//         // ✅ CLF Name
//         response.clfName = employee.clfId?.name || null;
//         // ✅ Profile Picture
//         response.profilePicture =
//           user.profilePicture || employee.profilePicture || null;
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

// // @desc    Upload profile picture
// // @route   POST /api/auth/upload-profile-picture
// // @access  Private (All roles)
// const uploadProfilePicture = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Photo is required. Upload using form-data with "photo" field.',
//       });
//     }

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     if (user.profilePicturePublicId) {
//       try {
//         await cloudinaryService.deleteFromCloudinary(user.profilePicturePublicId);
//         console.log('🗑️  Old profile picture deleted from Cloudinary');
//       } catch (err) {
//         console.error('Failed to delete old profile picture:', err.message);
//       }
//     }

//     const uploadResult = await cloudinaryService.uploadToCloudinary(
//       req.file.buffer,
//       `profile_pictures/${user.role.toLowerCase()}`
//     );

//     user.profilePicture = uploadResult.url;
//     user.profilePicturePublicId = uploadResult.publicId;
//     await user.save();

//     if (user.role === 'EMPLOYEE') {
//       const employee = await Employee.findOne({ userId: user.userId });
//       if (employee) {
//         employee.profilePicture = uploadResult.url;
//         employee.profilePicturePublicId = uploadResult.publicId;
//         await employee.save();
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Profile picture updated successfully',
//       profilePicture: uploadResult.url,
//     });
//   } catch (error) {
//     console.error('Upload Profile Picture Error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to upload profile picture',
//     });
//   }
// };

// // @desc    Remove profile picture
// // @route   DELETE /api/auth/remove-profile-picture
// // @access  Private (All roles)
// const removeProfilePicture = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     if (user.profilePicturePublicId) {
//       try {
//         await cloudinaryService.deleteFromCloudinary(user.profilePicturePublicId);
//       } catch (err) {
//         console.error('Cloudinary delete failed:', err.message);
//       }
//     }

//     user.profilePicture = null;
//     user.profilePicturePublicId = null;
//     await user.save();

//     if (user.role === 'EMPLOYEE') {
//       const employee = await Employee.findOne({ userId: user.userId });
//       if (employee) {
//         employee.profilePicture = null;
//         employee.profilePicturePublicId = null;
//         await employee.save();
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Profile picture removed successfully',
//     });
//   } catch (error) {
//     console.error('Remove Profile Picture Error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to remove profile picture',
//     });
//   }
// };

// module.exports = { login, getMe, uploadProfilePicture, removeProfilePicture };

const User = require('../models/User');
const Employee = require('../models/Employee');
const CLF = require('../models/CLF');
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
          designation: employee.designation,
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

    // ✅ If employee, add employee details
    if (user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: user.userId }).populate(
        'clfId',
        'name'
      );

      if (employee) {
        response.employeeId = employee._id;
        response.designation = employee.designation;
        response.mobile = employee.mobile;
        response.joiningDate = employee.joiningDate;
        response.bankName = employee.bankName;
        response.bankAccountNumber = employee.bankAccountNumber;
        response.branch = employee.branch;
        response.ifscCode = employee.ifscCode;
        response.clfName = employee.clfId?.name || null;
        response.profilePicture =
          user.profilePicture || employee.profilePicture || null;
      }
    }

    // ✅ If CLF Admin, add CLF details
    if (user.role === 'CLF_ADMIN' && user.clfId) {
      const clf = await CLF.findById(user.clfId);
      if (clf) {
        response.clfName = clf.name;
        response.clfCode = clf.code;
        response.clfBlock = clf.block;
        response.clfDistrict = clf.district;
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
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Photo is required. Upload using form-data with "photo" field.',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.profilePicturePublicId) {
      try {
        await cloudinaryService.deleteFromCloudinary(user.profilePicturePublicId);
        console.log('🗑️  Old profile picture deleted from Cloudinary');
      } catch (err) {
        console.error('Failed to delete old profile picture:', err.message);
      }
    }

    const uploadResult = await cloudinaryService.uploadToCloudinary(
      req.file.buffer,
      `profile_pictures/${user.role.toLowerCase()}`
    );

    user.profilePicture = uploadResult.url;
    user.profilePicturePublicId = uploadResult.publicId;
    await user.save();

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

    if (user.profilePicturePublicId) {
      try {
        await cloudinaryService.deleteFromCloudinary(user.profilePicturePublicId);
      } catch (err) {
        console.error('Cloudinary delete failed:', err.message);
      }
    }

    user.profilePicture = null;
    user.profilePicturePublicId = null;
    await user.save();

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