const mongoose = require('mongoose');

const workSubmissionSchema = new mongoose.Schema(
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
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, 'Work description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    photoUrl: {
      type: String,
      required: [true, 'Photo is required'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    workType: {
      type: String,
      enum: ['SHG Meeting', 'Training', 'Field Visit', 'Documentation', 'Other'],
      default: 'Other',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
workSubmissionSchema.index({ employeeId: 1, date: -1 });
workSubmissionSchema.index({ clfId: 1 });
workSubmissionSchema.index({ status: 1 });
workSubmissionSchema.index({ date: -1 });

// Compound index for efficient queries
workSubmissionSchema.index({ clfId: 1, date: -1, status: 1 });

module.exports = mongoose.model('WorkSubmission', workSubmissionSchema);