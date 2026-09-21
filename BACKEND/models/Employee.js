// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Employee name is required'],
//       trim: true,
//     },
//     userId: {
//       type: String,
//       required: [true, 'User ID is required'],
//       unique: true,  // ✅ Ye hi rakho
//       trim: true,
//     },
//     passwordHash: {
//       type: String,
//       required: [true, 'Password is required'],
//     },
//     employeeType: {
//       type: String,
//       enum: ['CADER', 'Bank Sakhi', 'BDSP', 'FLCRP', 'Gender CRP', 'Setu', 'Senior Setu'],
//       required: [true, 'Employee type is required'],
//     },
//     designation: {
//       type: String,
//       trim: true,
//     },
//     mobile: {
//       type: String,
//       trim: true,
//     },
//     clfId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CLF',
//       required: [true, 'CLF is required'],
//     },
//     joiningDate: {
//       type: Date,
//       default: Date.now,
//     },
//     status: {
//       type: String,
//       enum: ['ACTIVE', 'INACTIVE'],
//       default: 'ACTIVE',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ✅ Sirf ye indexes rakho (userId hata do kyunki upar unique: true hai)
// employeeSchema.index({ clfId: 1 });
// employeeSchema.index({ employeeType: 1 });
// employeeSchema.index({ status: 1 });

// module.exports = mongoose.model('Employee', employeeSchema);











// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Employee name is required'],
//       trim: true,
//     },
//     userId: {
//       type: String,
//       required: [true, 'User ID is required'],
//       unique: true,
//       trim: true,
//     },
//     passwordHash: {
//       type: String,
//       required: [true, 'Password is required'],
//     },
//     employeeType: {
//       type: String,
//       enum: ['CADER', 'Bank Sakhi', 'BDSP', 'FLCRP', 'Gender CRP', 'Setu', 'Senior Setu'],
//       required: [true, 'Employee type is required'],
//     },
//     designation: {
//       type: String,
//       trim: true,
//     },
//     mobile: {
//       type: String,
//       trim: true,
//     },
//     clfId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CLF',
//       required: [true, 'CLF is required'],
//     },
//     joiningDate: {
//       type: Date,
//       default: Date.now,
//     },
//     status: {
//       type: String,
//       enum: ['ACTIVE', 'INACTIVE'],
//       default: 'ACTIVE',
//     },
//     // ✅ NEW: Profile Picture
//     profilePicture: {
//       type: String,
//       default: null,
//     },
//     profilePicturePublicId: {
//       type: String,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// employeeSchema.index({ clfId: 1 });
// employeeSchema.index({ employeeType: 1 });
// employeeSchema.index({ status: 1 });

// module.exports = mongoose.model('Employee', employeeSchema);



const mongoose = require('mongoose');
const DESIGNATIONS = require('../utils/designations');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      enum: {
        values: DESIGNATIONS,
        message: '{VALUE} is not a valid designation',
      },
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile is required'],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required'],
      trim: true,
    },
    bankAccountNumber: {
      type: String,
      required: [true, 'Bank account number is required'],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true,
    },
    ifscCode: {
      type: String,
      required: [true, 'IFSC code is required'],
      trim: true,
      uppercase: true,
    },
    clfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CLF',
      required: [true, 'CLF is required'],
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    profilePicture: {
      type: String,
      default: null,
    },
    profilePicturePublicId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.index({ clfId: 1 });
employeeSchema.index({ status: 1 });

module.exports = mongoose.model('Employee', employeeSchema);