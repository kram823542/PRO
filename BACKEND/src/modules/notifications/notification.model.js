// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema(
//   {
//     senderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       index: true,
//     },
//     senderRole: { type: String, required: true },
//     senderName: { type: String, required: true },

//     clfId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CLF',
//       required: true,
//       index: true,
//     },
//     blockId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Block',
//       required: true,
//     },

//     messageType: {
//       type: String,
//       enum: ['NOTICE', 'LETTER', 'INFORMATION'],
//       default: 'NOTICE',
//     },
//     subject: { type: String, required: true, trim: true, maxlength: 300 },
//     body: { type: String, required: true, trim: true, maxlength: 10000 },
//     attachmentUrl: { type: String, default: null },

//     totalRecipients: { type: Number, default: 0 },
//     readCount: { type: Number, default: 0 },
//     unreadCount: { type: Number, default: 0 },
//     ignoredCount: { type: Number, default: 0 },
//   },
//   { timestamps: true, versionKey: false }
// );

// messageSchema.index({ clfId: 1, createdAt: -1 });

// export const Message = mongoose.model('Message', messageSchema);

// // ---------- Recipient tracking ----------

// const messageRecipientSchema = new mongoose.Schema(
//   {
//     messageId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Message',
//       required: true,
//       index: true,
//     },
//     employeeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Employee',
//       required: true,
//       index: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     clfId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CLF',
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['UNREAD', 'READ', 'IGNORED'],
//       default: 'UNREAD',
//       index: true,
//     },
//     readAt: { type: Date, default: null },
//     ignoredAt: { type: Date, default: null },
//   },
//   { timestamps: true, versionKey: false }
// );

// messageRecipientSchema.index({ messageId: 1, employeeId: 1 }, { unique: true });
// messageRecipientSchema.index({ employeeId: 1, status: 1 });

// export const MessageRecipient = mongoose.model(
//   'MessageRecipient',
//   messageRecipientSchema
// );



import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    senderRole: { type: String, required: true },
    senderName: { type: String, required: true },

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

    messageType: {
      type: String,
      enum: ['NOTICE', 'LETTER', 'INFORMATION'],
      default: 'NOTICE',
    },
    subject: { type: String, required: true, trim: true, maxlength: 300 },
    body: { type: String, required: true, trim: true, maxlength: 10000 },
    attachmentUrl: { type: String, default: null },

    totalRecipients: { type: Number, default: 0 },
    readCount: { type: Number, default: 0 },
    unreadCount: { type: Number, default: 0 },
    ignoredCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

messageSchema.index({ clfId: 1, createdAt: -1 });

export const Message = mongoose.model('Message', messageSchema);

/* ─────────────── Recipient tracking ─────────────── */

const messageRecipientSchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
      index: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,          // ✅ CLF admin ke liye null
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    clfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CLF',
      required: true,
    },
    status: {
      type: String,
      enum: ['UNREAD', 'READ', 'IGNORED'],
      default: 'UNREAD',
      index: true,
    },
    readAt: { type: Date, default: null },
    ignoredAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

// ✅ Unique per user (not per employee)
messageRecipientSchema.index({ messageId: 1, userId: 1 }, { unique: true });
messageRecipientSchema.index({ userId: 1, status: 1 });

export const MessageRecipient = mongoose.model(
  'MessageRecipient',
  messageRecipientSchema
);