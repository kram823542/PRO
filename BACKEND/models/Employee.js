
// const mongoose = require('mongoose');
// const DESIGNATIONS = require('../utils/designations');

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
//     designation: {
//       type: String,
//       required: [true, 'Designation is required'],
//       enum: {
//         values: DESIGNATIONS,
//         message: '{VALUE} is not a valid designation',
//       },
//       trim: true,
//     },
//     mobile: {
//       type: String,
//       required: [true, 'Mobile is required'],
//       trim: true,
//     },
//     bankName: {
//       type: String,
//       required: [true, 'Bank name is required'],
//       trim: true,
//     },
//     bankAccountNumber: {
//       type: String,
//       required: [true, 'Bank account number is required'],
//       trim: true,
//     },
//     branch: {
//       type: String,
//       required: [true, 'Branch is required'],
//       trim: true,
//     },
//     ifscCode: {
//       type: String,
//       required: [true, 'IFSC code is required'],
//       trim: true,
//       uppercase: true,
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
// employeeSchema.index({ status: 1 });

// module.exports = mongoose.model('Employee', employeeSchema);

const mongoose = require('mongoose');
const DESIGNATIONS = require('../utils/designations');
const BANKS = require('../utils/banks');

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
      enum: {
        values: BANKS,
        message: '{VALUE} is not a valid bank',
      },
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