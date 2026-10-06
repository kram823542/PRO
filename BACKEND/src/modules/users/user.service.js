import { User } from './user.model.js';
import { Block } from '../blocks/block.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { generatePassword } from '../../utils/security.js';
import { createAudit } from '../../middlewares/audit.middleware.js';

export const createBPM = async (req, data) => {
  const block = await Block.findById(data.blockId);
  if (!block) throw ApiError.notFound('Block not found');

  const username = data.username?.toLowerCase();
  const exists = await User.findOne({ username });
  if (exists) throw ApiError.conflict('Username already exists');

  const tempPassword = generatePassword(10);

  const user = await User.create({
    username,
    password: tempPassword,
    role: 'BPM',
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    blockId: data.blockId,
    createdBy: req.user._id,
    mustChangePassword: true,
  });

  await createAudit({
    req,
    action: 'BPM_CREATED',
    targetType: 'User',
    targetId: user._id,
    metadata: { username, blockId: data.blockId },
  });

  return {
    user: {
      _id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      blockId: user.blockId,
    },
    tempPassword, // returned only once
  };
};


export const resetPassword = async (req, userId, newPassword) => {
  if (!newPassword || newPassword.length < 8) {
    throw ApiError.badRequest('Password must be at least 8 characters');
  }
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
    throw ApiError.badRequest('Password must contain letters and numbers');
  }

  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');

  user.password = newPassword;
  user.mustChangePassword = true;
  user.loginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  await createAudit({
    req,
    action: 'USER_PASSWORD_RESET',
    targetType: 'User',
    targetId: user._id,
  });

  return {
    username: user.username,
    resetBy: req.user.role,
  };
};

export const setStatus = async (req, userId, status) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');
  user.status = status;
  await user.save();

  await createAudit({
    req,
    action: `USER_STATUS_${status}`,
    targetType: 'User',
    targetId: user._id,
  });

  return user;
};

export const changeBlock = async (req, userId, blockId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');
  if (user.role !== 'BPM') throw ApiError.badRequest('Only BPM block can change');

  const block = await Block.findById(blockId);
  if (!block) throw ApiError.notFound('Block not found');

  user.blockId = blockId;
  await user.save();

  await createAudit({
    req,
    action: 'BPM_BLOCK_CHANGED',
    targetType: 'User',
    targetId: user._id,
    metadata: { newBlockId: blockId },
  });

  return user;
};

export const listUsers = async (req, query) => {
  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.blockId) filter.blockId = query.blockId;
  if (query.status) filter.status = query.status;

  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter)
      .populate('blockId', 'name code')
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};