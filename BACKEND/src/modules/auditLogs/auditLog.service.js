import { AuditLog } from './auditLog.model.js';

export const listLogs = async (query) => {
  const filter = {};
  if (query.userId) filter.userId = query.userId;
  if (query.action) filter.action = query.action;
  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from) filter.createdAt.$gte = new Date(query.from);
    if (query.to) filter.createdAt.$lte = new Date(query.to);
  }
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(200, parseInt(query.limit) || 50);

  const [logs, total] = await Promise.all([
    AuditLog.find(filter)
      .populate('userId', 'name username role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    AuditLog.countDocuments(filter),
  ]);

  return { logs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};