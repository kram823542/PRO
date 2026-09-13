const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    clfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CLF',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT', 'PENDING', 'HOLIDAY'],
      default: 'PENDING',
    },
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkSubmission',
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate entries
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });
attendanceSchema.index({ clfId: 1, date: -1 });
attendanceSchema.index({ date: -1 });

module.exports = mongoose.model('Attendance', attendanceSchema);