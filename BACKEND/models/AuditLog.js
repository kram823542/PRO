const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'LOGIN',
        'LOGOUT',
        'CLF_CREATE',
        'CLF_UPDATE',
        'CLF_DELETE',
        'EMPLOYEE_CREATE',
        'EMPLOYEE_UPDATE',
        'EMPLOYEE_DELETE',
        'WORK_APPROVE',
        'WORK_REJECT',
        'PASSWORD_RESET',
        'USER_ACTIVATE',
        'USER_DEACTIVATE',
        'REPORT_DOWNLOAD',
      ],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    targetModel: {
      type: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);