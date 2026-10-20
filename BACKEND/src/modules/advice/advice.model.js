import mongoose from 'mongoose';

const adviceSchema = new mongoose.Schema(
  {
    adviceType: {
      type: String,
      enum: ['SALARY', 'EXPENSE'],
      required: true,
      index: true,
    },
    adviceNumber: {
      type: String,
      required: true,
      index: true,
    }, 
    adviceDate: { type: String, required: true },

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

    bankName: { type: String, default: '' },
    branch: { type: String, default: '' },

    employees: [
      {
        sl: { type: Number },
        name: { type: String, required: true },
        month: { type: String },
        bankAccountNumber: { type: String, default: '' },
        bankName: { type: String, default: '' },
        branch: { type: String, default: '' },
        ifscCode: { type: String, default: '' },
        amount: { type: Number, required: true, min: 0 },
      },
    ],

    totalAmount: { type: Number, required: true, min: 0 },
    totalRows: { type: Number, required: true },

    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false }
);

// ✅ FIX: Per CLF unique advice number
adviceSchema.index({ clfId: 1, adviceNumber: 1 }, { unique: true });

adviceSchema.index({ clfId: 1, isDeleted: 1, createdAt: -1 });
adviceSchema.index({ adviceType: 1, createdAt: -1 });

export const Advice = mongoose.model('Advice', adviceSchema);