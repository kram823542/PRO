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

const mongoose = require('mongoose');

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
    employeeType: {
      type: String,
      enum: ['CADER', 'Bank Sakhi', 'BDSP', 'FLCRP', 'Gender CRP', 'Setu', 'Senior Setu'],
      required: [true, 'Employee type is required'],
    },
    designation: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
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
    // ✅ NEW: Profile Picture
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
employeeSchema.index({ employeeType: 1 });
employeeSchema.index({ status: 1 });

module.exports = mongoose.model('Employee', employeeSchema);