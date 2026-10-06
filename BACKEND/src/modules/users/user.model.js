// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       index: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ['SUPER_ADMIN', 'BPM', 'CLF', 'EMPLOYEE'],
//       required: true,
//       index: true,
//     },
//     name: { type: String, required: true, trim: true },
//     email: { type: String, trim: true, lowercase: true },
//     mobile: { type: String, trim: true },

//     // References (based on role)
//     blockId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Block',
//       default: null,
//       index: true,
//     },
//     clfId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CLF',
//       default: null,
//       index: true,
//     },
//     employeeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Employee',
//       default: null,
//     },
//     bpmId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       default: null,
//     },

//     status: {
//       type: String,
//       enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
//       default: 'ACTIVE',
//       index: true,
//     },
//     lastLogin: { type: Date, default: null },
//     loginAttempts: { type: Number, default: 0 },
//     lockUntil: { type: Date, default: null },
//     mustChangePassword: { type: Boolean, default: true },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       default: null,
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// userSchema.index({ role: 1, status: 1 });
// userSchema.index({ blockId: 1, role: 1 });

// /** Hash password before save */
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// /** Compare password */
// userSchema.methods.comparePassword = async function (candidate) {
//   return bcrypt.compare(candidate, this.password);
// };

// /** Account lock check */
// userSchema.methods.isLocked = function () {
//   return this.lockUntil && this.lockUntil > Date.now();
// };

// export const User = mongoose.model('User', userSchema);




import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'BPM', 'CLF', 'EMPLOYEE'],
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    mobile: { type: String, trim: true },

    // References (based on role)
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Block',
      default: null,
      index: true,
    },
    clfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CLF',
      default: null,
      index: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
    bpmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
      index: true,
    },
    lastLogin: { type: Date, default: null },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    mustChangePassword: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ role: 1, status: 1 });
userSchema.index({ blockId: 1, role: 1 });

/** Hash password before save (Fixed: async function me `next` hata diya gaya hai) */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

/** Compare password */
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

/** Account lock check */
userSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

export const User = mongoose.model('User', userSchema);