// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: [true, 'User ID is required'],
//       unique: true,  // ✅ Ye hi rakho, alag se index mat banao
//       trim: true,
//     },
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//     },
//     passwordHash: {
//       type: String,
//       required: [true, 'Password is required'],
//     },
//     role: {
//       type: String,
//       enum: ['SUPER_ADMIN', 'CLF_ADMIN', 'EMPLOYEE'],
//       required: true,
//     },
//     clfId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CLF',
//     },
//     status: {
//       type: String,
//       enum: ['ACTIVE', 'INACTIVE'],
//       default: 'ACTIVE',
//     },
//     lastLogin: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ✅ Sirf ye indexes rakho (userId hata do kyunki upar unique: true hai)
// userSchema.index({ role: 1 });
// userSchema.index({ clfId: 1 });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'CLF_ADMIN', 'EMPLOYEE'],
      required: true,
    },
    clfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CLF',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    lastLogin: {
      type: Date,
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

userSchema.index({ role: 1 });
userSchema.index({ clfId: 1 });

module.exports = mongoose.model('User', userSchema);