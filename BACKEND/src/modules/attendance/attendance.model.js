import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      index: true,
    },
    clfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CLF',
      required: true,
      index: true,
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Block',
      required: true,
    },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE'],
      required: true,
    },
    source: {
      type: String,
      enum: ['WORK_DONE_APPROVAL', 'MANUAL'],
      default: 'WORK_DONE_APPROVAL',
    },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    markedAt: { type: Date, default: Date.now },
    workDoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkDone' },
  },
  { timestamps: true, versionKey: false }
);

// Unique per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });
attendanceSchema.index({ clfId: 1, date: 1 });

export const Attendance = mongoose.model('Attendance', attendanceSchema);