// import mongoose from 'mongoose';
// import { Message, MessageRecipient } from './notification.model.js';
// import { Employee } from '../employees/employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';

// /** BPM sends message to all employees of a CLF */
// export const sendMessage = async (req, data) => {
//   if (req.user.role !== 'BPM') throw ApiError.forbidden('Only BPM can send');

//   const clf = await CLF.findById(data.clfId);
//   if (!clf) throw ApiError.notFound('CLF not found');
//   if (String(clf.blockId) !== String(req.user.blockId)) {
//     throw ApiError.forbidden('CLF is not in your block');
//   }

//   const employees = await Employee.find({ clfId: clf._id, status: 'ACTIVE' });
//   if (!employees.length) throw ApiError.badRequest('No active employees in this CLF');

//   const session = await mongoose.startSession();
//   let message;
//   try {
//     await session.withTransaction(async () => {
//       const [msg] = await Message.create(
//         [
//           {
//             senderId: req.user._id,
//             senderRole: req.user.role,
//             senderName: req.user.name,
//             clfId: clf._id,
//             blockId: clf.blockId,
//             messageType: data.messageType || 'NOTICE',
//             subject: data.subject,
//             body: data.body,
//             attachmentUrl: data.attachmentUrl || null,
//             totalRecipients: employees.length,
//             unreadCount: employees.length,
//           },
//         ],
//         { session }
//       );

//       const recipients = employees.map((emp) => ({
//         messageId: msg._id,
//         employeeId: emp._id,
//         userId: emp.userId,
//         clfId: clf._id,
//         status: 'UNREAD',
//       }));
//       await MessageRecipient.insertMany(recipients, { session });
//       message = msg;
//     });

//     await createAudit({
//       req,
//       action: 'MESSAGE_SENT',
//       targetType: 'Message',
//       targetId: message._id,
//       metadata: { clfId: clf._id, recipients: employees.length },
//     });

//     return message;
//   } finally {
//     await session.endSession();
//   }
// };

// /** Employee sees own notifications */
// export const listMyMessages = async (req, query) => {
//   if (req.user.role !== 'EMPLOYEE') throw ApiError.forbidden();
//   const filter = { userId: req.user._id };
//   if (query.status) filter.status = query.status;

//   const items = await MessageRecipient.find(filter)
//     .populate({
//       path: 'messageId',
//       select: 'subject body messageType attachmentUrl senderName senderRole createdAt',
//     })
//     .sort({ createdAt: -1 });

//   return items.filter((i) => i.messageId);
// };

// /** Mark as read (idempotent) */
// export const markRead = async (req, recipientId) => {
//   const rec = await MessageRecipient.findOne({
//     _id: recipientId,
//     userId: req.user._id,
//   });
//   if (!rec) throw ApiError.notFound('Message not found');
//   if (rec.status === 'READ') return rec;

//   const wasUnread = rec.status === 'UNREAD';
//   rec.status = 'READ';
//   rec.readAt = new Date();
//   await rec.save();

//   if (wasUnread) {
//     await Message.findByIdAndUpdate(rec.messageId, {
//       $inc: { readCount: 1, unreadCount: -1 },
//     });
//   }
//   return rec;
// };

// /** Ignore (soft) */
// export const ignore = async (req, recipientId) => {
//   const rec = await MessageRecipient.findOne({
//     _id: recipientId,
//     userId: req.user._id,
//   });
//   if (!rec) throw ApiError.notFound();
//   if (rec.status === 'IGNORED') return rec;

//   const prev = rec.status;
//   rec.status = 'IGNORED';
//   rec.ignoredAt = new Date();
//   await rec.save();

//   const inc = { ignoredCount: 1 };
//   if (prev === 'UNREAD') inc.unreadCount = -1;
//   if (prev === 'READ') inc.readCount = -1;
//   await Message.findByIdAndUpdate(rec.messageId, { $inc: inc });
//   return rec;
// };

// /** BPM tracking */
// export const getMessageTracking = async (req, messageId) => {
//   const msg = await Message.findById(messageId);
//   if (!msg) throw ApiError.notFound();
//   if (req.user.role === 'BPM' && String(msg.blockId) !== String(req.user.blockId)) {
//     throw ApiError.forbidden();
//   }
//   if (req.user.role !== 'BPM' && req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden();

//   const recipients = await MessageRecipient.find({ messageId })
//     .populate('employeeId', 'name employeeCode designation')
//     .sort({ status: 1, readAt: 1 });

//   const stats = {
//     total: recipients.length,
//     read: recipients.filter((r) => r.status === 'READ').length,
//     unread: recipients.filter((r) => r.status === 'UNREAD').length,
//     ignored: recipients.filter((r) => r.status === 'IGNORED').length,
//   };

//   return { message: msg, recipients, stats };
// };

// export const listSentMessages = async (req, query) => {
//   const filter = {};
//   if (req.user.role === 'BPM') filter.senderId = req.user._id;
//   if (query.clfId) filter.clfId = query.clfId;
//   return Message.find(filter).sort({ createdAt: -1 }).limit(100);
// };

// export const getUnreadCount = async (req) => {
//   if (req.user.role !== 'EMPLOYEE') return { count: 0 };
//   const count = await MessageRecipient.countDocuments({
//     userId: req.user._id,
//     status: 'UNREAD',
//   });
//   return { count };
// };






// import mongoose from 'mongoose';
// import { Message, MessageRecipient } from './notification.model.js';
// import { Employee } from '../employees/employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { User } from '../users/user.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';

// /** ✅ BPM sends message to all active employees + the CLF admin */
// export const sendMessage = async (req, data) => {
//   if (req.user.role !== 'BPM') throw ApiError.forbidden('Only BPM can send');

//   const clf = await CLF.findById(data.clfId);
//   if (!clf) throw ApiError.notFound('CLF not found');
//   if (String(clf.blockId) !== String(req.user.blockId)) {
//     throw ApiError.forbidden('CLF is not in your block');
//   }

//   // ✅ All active employees of the CLF
//   const employees = await Employee.find({ clfId: clf._id, status: 'ACTIVE' });

//   // ✅ CLF admin user account
//   const clfAdmin = await User.findOne({
//     clfId: clf._id,
//     role: 'CLF',
//     status: 'ACTIVE',
//   });

//   if (!employees.length && !clfAdmin) {
//     throw ApiError.badRequest('No active recipients in this CLF');
//   }

//   // ✅ Build recipient list (employees + CLF admin)
//   const recipientPayloads = [];

//   employees.forEach((emp) => {
//     recipientPayloads.push({
//       employeeId: emp._id,
//       userId: emp.userId,
//       clfId: clf._id,
//       status: 'UNREAD',
//     });
//   });

//   if (clfAdmin) {
//     recipientPayloads.push({
//       employeeId: null,       // CLF admin ka Employee record nahi hota
//       userId: clfAdmin._id,
//       clfId: clf._id,
//       status: 'UNREAD',
//     });
//   }

//   const totalRecipients = recipientPayloads.length;

//   const session = await mongoose.startSession();
//   let message;
//   try {
//     await session.withTransaction(async () => {
//       const [msg] = await Message.create(
//         [
//           {
//             senderId: req.user._id,
//             senderRole: req.user.role,
//             senderName: req.user.name,
//             clfId: clf._id,
//             blockId: clf.blockId,
//             messageType: data.messageType || 'NOTICE',
//             subject: data.subject,
//             body: data.body,
//             attachmentUrl: data.attachmentUrl || null,
//             totalRecipients,
//             unreadCount: totalRecipients,
//           },
//         ],
//         { session }
//       );

//       const recipients = recipientPayloads.map((r) => ({
//         ...r,
//         messageId: msg._id,
//       }));
//       await MessageRecipient.insertMany(recipients, { session });
//       message = msg;
//     });

//     await createAudit({
//       req,
//       action: 'MESSAGE_SENT',
//       targetType: 'Message',
//       targetId: message._id,
//       metadata: {
//         clfId: clf._id,
//         recipients: totalRecipients,
//         employees: employees.length,
//         clfAdmin: !!clfAdmin,
//       },
//     });

//     return message;
//   } finally {
//     await session.endSession();
//   }
// };

// /** ✅ EMPLOYEE + CLF dono apne messages dekh sakte hain */
// export const listMyMessages = async (req, query) => {
//   if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) {
//     throw ApiError.forbidden();
//   }
//   const filter = { userId: req.user._id };
//   if (query.status) filter.status = query.status;

//   const items = await MessageRecipient.find(filter)
//     .populate({
//       path: 'messageId',
//       select: 'subject body messageType attachmentUrl senderName senderRole createdAt',
//     })
//     .sort({ createdAt: -1 });

//   return items.filter((i) => i.messageId);
// };

// /** Mark as read — EMPLOYEE + CLF */
// export const markRead = async (req, recipientId) => {
//   if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) {
//     throw ApiError.forbidden();
//   }
//   const rec = await MessageRecipient.findOne({
//     _id: recipientId,
//     userId: req.user._id,
//   });
//   if (!rec) throw ApiError.notFound('Message not found');
//   if (rec.status === 'READ') return rec;

//   const wasUnread = rec.status === 'UNREAD';
//   rec.status = 'READ';
//   rec.readAt = new Date();
//   await rec.save();

//   if (wasUnread) {
//     await Message.findByIdAndUpdate(rec.messageId, {
//       $inc: { readCount: 1, unreadCount: -1 },
//     });
//   }
//   return rec;
// };

// /** Ignore (soft) — EMPLOYEE + CLF */
// export const ignore = async (req, recipientId) => {
//   if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) {
//     throw ApiError.forbidden();
//   }
//   const rec = await MessageRecipient.findOne({
//     _id: recipientId,
//     userId: req.user._id,
//   });
//   if (!rec) throw ApiError.notFound();
//   if (rec.status === 'IGNORED') return rec;

//   const prev = rec.status;
//   rec.status = 'IGNORED';
//   rec.ignoredAt = new Date();
//   await rec.save();

//   const inc = { ignoredCount: 1 };
//   if (prev === 'UNREAD') inc.unreadCount = -1;
//   if (prev === 'READ') inc.readCount = -1;
//   await Message.findByIdAndUpdate(rec.messageId, { $inc: inc });
//   return rec;
// };

// /** BPM tracking */
// export const getMessageTracking = async (req, messageId) => {
//   const msg = await Message.findById(messageId);
//   if (!msg) throw ApiError.notFound();
//   if (req.user.role === 'BPM' && String(msg.blockId) !== String(req.user.blockId)) {
//     throw ApiError.forbidden();
//   }
//   if (req.user.role !== 'BPM' && req.user.role !== 'SUPER_ADMIN') {
//     throw ApiError.forbidden();
//   }

//   const recipients = await MessageRecipient.find({ messageId })
//     .populate('employeeId', 'name employeeCode designation')
//     .populate('userId', 'name username role')
//     .sort({ status: 1, readAt: 1 });

//   const stats = {
//     total: recipients.length,
//     read: recipients.filter((r) => r.status === 'READ').length,
//     unread: recipients.filter((r) => r.status === 'UNREAD').length,
//     ignored: recipients.filter((r) => r.status === 'IGNORED').length,
//   };

//   return { message: msg, recipients, stats };
// };

// export const listSentMessages = async (req, query) => {
//   const filter = {};
//   if (req.user.role === 'BPM') filter.senderId = req.user._id;
//   if (query.clfId) filter.clfId = query.clfId;
//   return Message.find(filter).sort({ createdAt: -1 }).limit(100);
// };

// /** Unread count — EMPLOYEE + CLF */
// export const getUnreadCount = async (req) => {
//   if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) return { count: 0 };
//   const count = await MessageRecipient.countDocuments({
//     userId: req.user._id,
//     status: 'UNREAD',
//   });
//   return { count };
// };




import mongoose from 'mongoose';
import { Message, MessageRecipient } from './notification.model.js';
import { Employee } from '../employees/employee.model.js';
import { CLF } from '../clfs/clf.model.js';
import { User } from '../users/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { createAudit } from '../../middlewares/audit.middleware.js';

/** ✅ BPM sends message to all active employees + the CLF admin */
export const sendMessage = async (req, data) => {
  if (req.user.role !== 'BPM') throw ApiError.forbidden('Only BPM can send');

  const clf = await CLF.findById(data.clfId);
  if (!clf) throw ApiError.notFound('CLF not found');
  if (String(clf.blockId) !== String(req.user.blockId)) {
    throw ApiError.forbidden('CLF is not in your block');
  }

  // ✅ All active employees of the CLF
  const employees = await Employee.find({ clfId: clf._id, status: 'ACTIVE' });

  // ✅ CLF admin user account
  const clfAdmin = await User.findOne({
    clfId: clf._id,
    role: 'CLF',
    status: 'ACTIVE',
  });

  if (!employees.length && !clfAdmin) {
    throw ApiError.badRequest('No active recipients in this CLF');
  }

  // ✅ Build recipient list (employees + CLF admin)
  const recipientPayloads = [];

  employees.forEach((emp) => {
    recipientPayloads.push({
      employeeId: emp._id,
      userId: emp.userId,
      clfId: clf._id,
      status: 'UNREAD',
    });
  });

  if (clfAdmin) {
    recipientPayloads.push({
      employeeId: null,       // CLF admin ka Employee record nahi hota
      userId: clfAdmin._id,
      clfId: clf._id,
      status: 'UNREAD',
    });
  }

  const totalRecipients = recipientPayloads.length;

  const session = await mongoose.startSession();
  let message;
  try {
    await session.withTransaction(async () => {
      const [msg] = await Message.create(
        [
          {
            senderId: req.user._id,
            senderRole: req.user.role,
            senderName: req.user.name,
            clfId: clf._id,
            blockId: clf.blockId,
            messageType: data.messageType || 'NOTICE',
            subject: data.subject,
            body: data.body,
            attachmentUrl: data.attachmentUrl || null,
            totalRecipients,
            unreadCount: totalRecipients,
          },
        ],
        { session }
      );

      const recipients = recipientPayloads.map((r) => ({
        ...r,
        messageId: msg._id,
      }));
      await MessageRecipient.insertMany(recipients, { session });
      message = msg;
    });

    await createAudit({
      req,
      action: 'MESSAGE_SENT',
      targetType: 'Message',
      targetId: message._id,
      metadata: {
        clfId: clf._id,
        recipients: totalRecipients,
        employees: employees.length,
        clfAdmin: !!clfAdmin,
      },
    });

    return message;
  } finally {
    await session.endSession();
  }
};

/** ✅ EMPLOYEE + CLF dono apne messages dekh sakte hain */
export const listMyMessages = async (req, query) => {
  if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) {
    throw ApiError.forbidden();
  }
  const filter = { userId: req.user._id };
  if (query.status) filter.status = query.status;

  const items = await MessageRecipient.find(filter)
    .populate({
      path: 'messageId',
      select: 'subject body messageType attachmentUrl senderName senderRole createdAt',
    })
    .sort({ createdAt: -1 });

  return items.filter((i) => i.messageId);
};

/** ✅ Mark as read — works from UNREAD, IGNORED, and re-confirms READ */
export const markRead = async (req, recipientId) => {
  if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) {
    throw ApiError.forbidden();
  }

  const rec = await MessageRecipient.findOne({
    _id: recipientId,
    userId: req.user._id,
  });
  if (!rec) throw ApiError.notFound('Message not found');

  // Already read — nothing to do
  if (rec.status === 'READ') return rec;

  const prev = rec.status; // 'UNREAD' or 'IGNORED'
  rec.status = 'READ';
  rec.readAt = new Date();
  rec.ignoredAt = null;    // ✅ Reset ignore timestamp
  await rec.save();

  // ✅ Update counters based on previous state
  const inc = { readCount: 1 };
  if (prev === 'UNREAD') {
    inc.unreadCount = -1;
  } else if (prev === 'IGNORED') {
    inc.ignoredCount = -1;
  }

  await Message.findByIdAndUpdate(rec.messageId, { $inc: inc });
  return rec;
};

/** Ignore (soft) — EMPLOYEE + CLF */
export const ignore = async (req, recipientId) => {
  if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) {
    throw ApiError.forbidden();
  }
  const rec = await MessageRecipient.findOne({
    _id: recipientId,
    userId: req.user._id,
  });
  if (!rec) throw ApiError.notFound();
  if (rec.status === 'IGNORED') return rec;

  const prev = rec.status;
  rec.status = 'IGNORED';
  rec.ignoredAt = new Date();
  await rec.save();

  const inc = { ignoredCount: 1 };
  if (prev === 'UNREAD') inc.unreadCount = -1;
  if (prev === 'READ') inc.readCount = -1;
  await Message.findByIdAndUpdate(rec.messageId, { $inc: inc });
  return rec;
};

/** BPM tracking */
export const getMessageTracking = async (req, messageId) => {
  const msg = await Message.findById(messageId);
  if (!msg) throw ApiError.notFound();
  if (req.user.role === 'BPM' && String(msg.blockId) !== String(req.user.blockId)) {
    throw ApiError.forbidden();
  }
  if (req.user.role !== 'BPM' && req.user.role !== 'SUPER_ADMIN') {
    throw ApiError.forbidden();
  }

  const recipients = await MessageRecipient.find({ messageId })
    .populate('employeeId', 'name employeeCode designation')
    .populate('userId', 'name username role')
    .sort({ status: 1, readAt: 1 });

  const stats = {
    total: recipients.length,
    read: recipients.filter((r) => r.status === 'READ').length,
    unread: recipients.filter((r) => r.status === 'UNREAD').length,
    ignored: recipients.filter((r) => r.status === 'IGNORED').length,
  };

  return { message: msg, recipients, stats };
};

export const listSentMessages = async (req, query) => {
  const filter = {};
  if (req.user.role === 'BPM') filter.senderId = req.user._id;
  if (query.clfId) filter.clfId = query.clfId;
  return Message.find(filter).sort({ createdAt: -1 }).limit(100);
};

/** Unread count — EMPLOYEE + CLF */
export const getUnreadCount = async (req) => {
  if (!['EMPLOYEE', 'CLF'].includes(req.user.role)) return { count: 0 };
  const count = await MessageRecipient.countDocuments({
    userId: req.user._id,
    status: 'UNREAD',
  });
  return { count };
};