import mongoose from 'mongoose';

const actionPlanSchema = new mongoose.Schema(
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
    plan: { type: String, required: true, trim: true, maxlength: 2000 },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

// One plan per employee per day
actionPlanSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export const ActionPlan = mongoose.model('ActionPlan', actionPlanSchema);