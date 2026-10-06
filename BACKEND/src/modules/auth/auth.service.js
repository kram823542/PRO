
// import jwt from 'jsonwebtoken';
// import { env } from '../../config/env.js';
// import { User } from '../users/user.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';

// const MAX_ATTEMPTS = 5;
// const LOCK_TIME = 15 * 60 * 1000;

// const signAccess = (user) =>
//   jwt.sign(
//     { sub: user._id, role: user.role, blockId: user.blockId, clfId: user.clfId },
//     env.JWT.ACCESS_SECRET,
//     { expiresIn: env.JWT.ACCESS_EXPIRY }
//   );

// const signRefresh = (user) =>
//   jwt.sign({ sub: user._id }, env.JWT.REFRESH_SECRET, {
//     expiresIn: env.JWT.REFRESH_EXPIRY,
//   });

// /** Get employeeId for EMPLOYEE role */
// const resolveEmployeeId = async (user) => {
//   if (user.role !== 'EMPLOYEE') return null;

//   // Already stored on user doc
//   if (user.employeeId) return String(user.employeeId);

//   // Fallback: find employee by userId
//   const { Employee } = await import('../employees/employee.model.js');
//   const emp = await Employee.findOne({ userId: user._id }).select('_id');
//   if (!emp) return null;

//   // Persist for future logins
//   user.employeeId = emp._id;
//   await user.save();

//   return String(emp._id);
// };

// export const login = async (req, { username, password }) => {
//   const user = await User.findOne({ username: username.toLowerCase() }).select(
//     '+password'
//   );

//   if (!user) {
//     await createAudit({
//       req,
//       action: 'LOGIN_FAILED',
//       metadata: { username, reason: 'USER_NOT_FOUND' },
//       status: 'FAILED',
//     });
//     throw ApiError.unauthorized('Invalid credentials');
//   }

//   if (user.isLocked()) {
//     throw ApiError.forbidden('Account locked. Try again later.');
//   }

//   if (user.status !== 'ACTIVE') {
//     throw ApiError.forbidden(`Account is ${user.status.toLowerCase()}`);
//   }

//   const valid = await user.comparePassword(password);
//   if (!valid) {
//     user.loginAttempts = (user.loginAttempts || 0) + 1;
//     if (user.loginAttempts >= MAX_ATTEMPTS) {
//       user.lockUntil = new Date(Date.now() + LOCK_TIME);
//     }
//     await user.save();
//     await createAudit({
//       req,
//       action: 'LOGIN_FAILED',
//       metadata: { username, reason: 'INVALID_PASSWORD' },
//       status: 'FAILED',
//     });
//     throw ApiError.unauthorized('Invalid credentials');
//   }

//   user.loginAttempts = 0;
//   user.lockUntil = null;
//   user.lastLogin = new Date();
//   await user.save();

//   // ✅ Resolve employeeId for EMPLOYEE role
//   const employeeId = await resolveEmployeeId(user);

//   await createAudit({
//     req: { ...req, user },
//     action: 'LOGIN_SUCCESS',
//   });

//   return {
//     user: {
//       _id: user._id,
//       username: user.username,
//       name: user.name,
//       role: user.role,
//       blockId: user.blockId ? String(user.blockId) : null,
//       clfId: user.clfId ? String(user.clfId) : null,
//       employeeId, // ✅ Include employeeId
//       mustChangePassword: user.mustChangePassword,
//     },
//     accessToken: signAccess(user),
//     refreshToken: signRefresh(user),
//   };
// };

// export const refresh = async (refreshToken) => {
//   if (!refreshToken) throw ApiError.unauthorized('No refresh token');
//   let decoded;
//   try {
//     decoded = jwt.verify(refreshToken, env.JWT.REFRESH_SECRET);
//   } catch {
//     throw ApiError.unauthorized('Invalid refresh token');
//   }
//   const user = await User.findById(decoded.sub);
//   if (!user || user.status !== 'ACTIVE') throw ApiError.unauthorized();
//   return { accessToken: signAccess(user) };
// };

// export const changePassword = async (req, userId, { oldPassword, newPassword }) => {
//   const user = await User.findById(userId).select('+password');
//   if (!user) throw ApiError.notFound('User not found');

//   const valid = await user.comparePassword(oldPassword);
//   if (!valid) throw ApiError.badRequest('Old password incorrect');

//   user.password = newPassword;
//   user.mustChangePassword = false;
//   await user.save();

//   await createAudit({ req, action: 'PASSWORD_CHANGED' });
//   return true;
// };

// /** Get user profile (used by /auth/me) */
// export const getProfile = async (user) => {
//   const employeeId = await resolveEmployeeId(user);
//   return {
//     _id: user._id,
//     username: user.username,
//     name: user.name,
//     role: user.role,
//     blockId: user.blockId ? String(user.blockId) : null,
//     clfId: user.clfId ? String(user.clfId) : null,
//     employeeId, // ✅ Include employeeId
//     mustChangePassword: user.mustChangePassword,
//   };
// };

// /** ✅ Update profile — name, email, mobile */
// export const updateProfile = async (req, userId, data) => {
//   const user = await User.findById(userId);
//   if (!user) throw ApiError.notFound('User not found');

//   const updatable = ['name', 'email', 'mobile'];
//   updatable.forEach((k) => {
//     if (data[k] !== undefined) user[k] = data[k];
//   });

//   await user.save();

//   await createAudit({
//     req,
//     action: 'PROFILE_UPDATED',
//     targetType: 'User',
//     targetId: user._id,
//   });

//   return {
//     _id: user._id,
//     username: user.username,
//     name: user.name,
//     email: user.email,
//     mobile: user.mobile,
//     role: user.role,
//     blockId: user.blockId ? String(user.blockId) : null,
//     clfId: user.clfId ? String(user.clfId) : null,
//     employeeId: user.employeeId ? String(user.employeeId) : null,
//     mustChangePassword: user.mustChangePassword,
//   };
// };


import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { User } from '../users/user.model.js';
import { Employee } from '../employees/employee.model.js';
import { CLF } from '../clfs/clf.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { createAudit } from '../../middlewares/audit.middleware.js';

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

const signAccess = (user) =>
  jwt.sign(
    { sub: user._id, role: user.role, blockId: user.blockId, clfId: user.clfId },
    env.JWT.ACCESS_SECRET,
    { expiresIn: env.JWT.ACCESS_EXPIRY }
  );

const signRefresh = (user) =>
  jwt.sign({ sub: user._id }, env.JWT.REFRESH_SECRET, {
    expiresIn: env.JWT.REFRESH_EXPIRY,
  });

/** Get employeeId for EMPLOYEE role */
const resolveEmployeeId = async (user) => {
  if (user.role !== 'EMPLOYEE') return null;
  if (user.employeeId) return String(user.employeeId);

  const emp = await Employee.findOne({ userId: user._id }).select('_id');
  if (!emp) return null;

  user.employeeId = emp._id;
  await user.save();

  return String(emp._id);
};

/** ✅ Common: get user profile shape */
const buildUserPayload = async (user) => {
  const employeeId = await resolveEmployeeId(user);

  // ✅ Employee ka mobile fallback — agar user record me nahi hai to Employee record se lo
  let email = user.email || '';
  let mobile = user.mobile || '';

  if (user.role === 'EMPLOYEE' && employeeId) {
    try {
      const emp = await Employee.findById(employeeId).select('mobile');
      if (emp?.mobile && !mobile) mobile = emp.mobile;
    } catch (e) {
      // silent
    }
  }

  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    email,
    mobile,
    role: user.role,
    blockId: user.blockId ? String(user.blockId) : null,
    clfId: user.clfId ? String(user.clfId) : null,
    employeeId,
    mustChangePassword: user.mustChangePassword,
  };
};

/* ────────────────────────────────────────────
   LOGIN
   ──────────────────────────────────────────── */
export const login = async (req, { username, password }) => {
  const user = await User.findOne({ username: username.toLowerCase() }).select(
    '+password'
  );

  if (!user) {
    await createAudit({
      req,
      action: 'LOGIN_FAILED',
      metadata: { username, reason: 'USER_NOT_FOUND' },
      status: 'FAILED',
    });
    throw ApiError.unauthorized('Invalid credentials');
  }

  if (user.isLocked()) {
    throw ApiError.forbidden('Account locked. Try again later.');
  }

  if (user.status !== 'ACTIVE') {
    throw ApiError.forbidden(`Account is ${user.status.toLowerCase()}`);
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    if (user.loginAttempts >= MAX_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME);
    }
    await user.save();
    await createAudit({
      req,
      action: 'LOGIN_FAILED',
      metadata: { username, reason: 'INVALID_PASSWORD' },
      status: 'FAILED',
    });
    throw ApiError.unauthorized('Invalid credentials');
  }

  user.loginAttempts = 0;
  user.lockUntil = null;
  user.lastLogin = new Date();
  await user.save();

  const payload = await buildUserPayload(user);

  await createAudit({
    req: { ...req, user },
    action: 'LOGIN_SUCCESS',
  });

  return {
    user: payload,
    accessToken: signAccess(user),
    refreshToken: signRefresh(user),
  };
};

/* ────────────────────────────────────────────
   REFRESH
   ──────────────────────────────────────────── */
export const refresh = async (refreshToken) => {
  if (!refreshToken) throw ApiError.unauthorized('No refresh token');
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.JWT.REFRESH_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid refresh token');
  }
  const user = await User.findById(decoded.sub);
  if (!user || user.status !== 'ACTIVE') throw ApiError.unauthorized();
  return { accessToken: signAccess(user) };
};

/* ────────────────────────────────────────────
   CHANGE PASSWORD
   ──────────────────────────────────────────── */
export const changePassword = async (req, userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw ApiError.notFound('User not found');

  const valid = await user.comparePassword(oldPassword);
  if (!valid) throw ApiError.badRequest('Old password incorrect');

  user.password = newPassword;
  user.mustChangePassword = false;
  await user.save();

  await createAudit({ req, action: 'PASSWORD_CHANGED' });
  return true;
};

/* ────────────────────────────────────────────
   GET PROFILE (used by /auth/me)
   ──────────────────────────────────────────── */
export const getProfile = async (user) => {
  return await buildUserPayload(user);
};

/* ────────────────────────────────────────────
   UPDATE PROFILE
   ──────────────────────────────────────────── */
/* ────────────────────────────────────────────
   UPDATE PROFILE — sync mobile to Employee record
   ──────────────────────────────────────────── */
export const updateProfile = async (req, userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');

  // ✅ Sirf email, mobile update hoga (naam nahi)
  const updatable = ['email', 'mobile'];
  updatable.forEach((k) => {
    if (data[k] !== undefined) user[k] = data[k];
  });

  await user.save();

  // ✅ EMPLOYEE ka mobile Employee record me bhi sync karo
  if (user.role === 'EMPLOYEE' && data.mobile !== undefined) {
    try {
      const employeeId = user.employeeId
        ? user.employeeId
        : (await Employee.findOne({ userId: user._id }).select('_id'))?._id;

      if (employeeId) {
        await Employee.findByIdAndUpdate(employeeId, {
          mobile: data.mobile,
        });
      }
    } catch (e) {
      console.warn('Employee sync failed:', e.message);
    }
  }

  await createAudit({
    req,
    action: 'PROFILE_UPDATED',
    targetType: 'User',
    targetId: user._id,
  });

  return await buildUserPayload(user);
};