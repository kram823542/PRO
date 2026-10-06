// import { asyncHandler } from '../../utils/asyncHandler.js';
// import * as service from './notification.service.js';

// export const send = asyncHandler(async (req, res) => {
//   const msg = await service.sendMessage(req, req.body);
//   res.status(201).json({ success: true, data: msg });
// });

// export const myMessages = asyncHandler(async (req, res) => {
//   const items = await service.listMyMessages(req, req.query);
//   res.json({ success: true, data: items });
// });

// export const markRead = asyncHandler(async (req, res) => {
//   const rec = await service.markRead(req, req.params.id);
//   res.json({ success: true, data: rec });
// });

// export const ignore = asyncHandler(async (req, res) => {
//   const rec = await service.ignore(req, req.params.id);
//   res.json({ success: true, data: rec });
// });

// export const tracking = asyncHandler(async (req, res) => {
//   const data = await service.getMessageTracking(req, req.params.id);
//   res.json({ success: true, data });
// });

// export const sent = asyncHandler(async (req, res) => {
//   const data = await service.listSentMessages(req, req.query);
//   res.json({ success: true, data });
// });

// export const unreadCount = asyncHandler(async (req, res) => {
//   const data = await service.getUnreadCount(req);
//   res.json({ success: true, data });
// });






import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './notification.service.js';

export const send = asyncHandler(async (req, res) => {
  const msg = await service.sendMessage(req, req.body);
  res.status(201).json({ success: true, data: msg });
});

export const myMessages = asyncHandler(async (req, res) => {
  const items = await service.listMyMessages(req, req.query);
  res.json({ success: true, data: items });
});

export const markRead = asyncHandler(async (req, res) => {
  const rec = await service.markRead(req, req.params.id);
  res.json({ success: true, data: rec });
});

export const ignore = asyncHandler(async (req, res) => {
  const rec = await service.ignore(req, req.params.id);
  res.json({ success: true, data: rec });
});

export const tracking = asyncHandler(async (req, res) => {
  const data = await service.getMessageTracking(req, req.params.id);
  res.json({ success: true, data });
});

export const sent = asyncHandler(async (req, res) => {
  const data = await service.listSentMessages(req, req.query);
  res.json({ success: true, data });
});

export const unreadCount = asyncHandler(async (req, res) => {
  const data = await service.getUnreadCount(req);
  res.json({ success: true, data });
});