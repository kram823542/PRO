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
    // ✅ Safe check: Agar req undefined hai toh crash na ho
    if (!req) {
      logger.warn('Audit skipped: req object is undefined');
      return;
    }

    await AuditLog.create({
      userId: req.user?._id || null,
      userRole: req.user?.role || null,
      userName: req.user?.name || null,
      action,
      targetType,
      targetId,
      metadata,
      ipAddress: req.ip || req.headers?.['x-forwarded-for'] || 'Unknown',
      // ✅ FIX: Safe check lagaya hai
      userAgent: req.headers?.['user-agent'] || 'Unknown Device',
      status,
    });
  } catch (err) {
    logger.error(`Audit log failed: ${err.message}`);
  }
};