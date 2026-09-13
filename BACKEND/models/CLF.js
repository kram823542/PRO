const mongoose = require('mongoose');

const clfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'CLF name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'CLF code is required'],
      unique: true,  // ✅ Ye hi rakho
      trim: true,
      uppercase: true,
    },
    block: {
      type: String,
      required: [true, 'Block is required'],
      trim: true,
    },
    district: {
      type: String,
      default: 'Palamu',
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Sirf status index rakho (code hata do kyunki upar unique: true hai)
clfSchema.index({ status: 1 });

module.exports = mongoose.model('CLF', clfSchema);