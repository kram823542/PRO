import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    userRole: { type: String },
    userName: { type: String },
    action: { type: String, required: true, index: true },
    targetType: { type: String },
    targetId: { type: mongoose.Schema.Types.ObjectId },
    metadata: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    status: { type: String, enum: ['SUCCESS', 'FAILED'], default: 'SUCCESS' },
  },
  { timestamps: true, versionKey: false }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });

// Auto-expire logs after 1 year
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);