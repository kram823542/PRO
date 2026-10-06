import { AuditLog } from '../modules/auditLogs/auditLog.model.js';
import { logger } from '../utils/logger.js';

export const createAudit = async ({
  req,
  action,
  targetType = null,
  targetId = null,
  metadata = null,
  status = 'SUCCESS',
}) => {
  try {
    await AuditLog.create({
      userId: req.user?._id || null,
      userRole: req.user?.role || null,
      userName: req.user?.name || null,
      action,
      targetType,
      targetId,
      metadata,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      status,
    });
  } catch (err) {
    logger.error(`Audit log failed: ${err.message}`);
  }
};