import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false }
);

export const Block = mongoose.model('Block', blockSchema);