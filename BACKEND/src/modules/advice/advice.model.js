import mongoose from 'mongoose';

/**
 * Advice schema — har generated advice yahan store hoti hai.
 * Employees array me har row ka data (Sl/Name/Month/Bank A/c/Bank/Branch/IFSC/Amount)
 */
const adviceSchema = new mongoose.Schema(
  {
    // ✅ Advice meta
    adviceType: {
      type: String,
      enum: ['SALARY', 'EXPENSE'],
      required: true,
      index: true,
    },
    adviceNumber: {
      type: String,
      unique: true,
      index: true,
    }, // e.g. SAT/CLF/2026/001
    adviceDate: { type: String, required: true }, // YYYY-MM-DD

    // ✅ Owner (kis role ne banayi)
    createdByRole: {
      type: String,
      enum: ['CLF', 'BPM', 'SUPER_ADMIN'],
      required: true,
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    createdByName: { type: String },

    // ✅ Scope
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

    // ✅ Bank header info
    bankName: { type: String, default: '' },
    branch: { type: String, default: '' },

    // ✅ Employees list — Sl. Name Month Bank A/c Bank Branch IFSC Amount
    employees: [
      {
        sl: { type: Number },
        name: { type: String, required: true },
        month: { type: String }, // Salary month या Expense reason
        bankAccountNumber: { type: String, default: '' },
        bankName: { type: String, default: '' },
        branch: { type: String, default: '' },
        ifscCode: { type: String, default: '' },
        amount: { type: Number, required: true, min: 0 },
      },
    ],

    // ✅ Total
    totalAmount: { type: Number, required: true, min: 0 },
    totalRows: { type: Number, required: true },

    // ✅ Soft-delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false }
);

adviceSchema.index({ clfId: 1, isDeleted: 1, createdAt: -1 });
adviceSchema.index({ adviceType: 1, createdAt: -1 });

export const Advice = mongoose.model('Advice', adviceSchema);