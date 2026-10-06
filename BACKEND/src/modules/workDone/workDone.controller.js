import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './workDone.service.js';
import { ApiError } from '../../utils/ApiError.js';

export const submit = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('Image file is required');
  const doc = await service.submitWorkDone(req, req.body, req.file.buffer);
  res.status(201).json({ success: true, data: doc });
});

export const list = asyncHandler(async (req, res) => {
  const result = await service.listWorkDone(req, req.query);
  res.json({ success: true, data: result });
});

export const approve = asyncHandler(async (req, res) => {
  const doc = await service.approveWorkDone(req, req.params.id);
  res.json({ success: true, data: doc });
});

export const reject = asyncHandler(async (req, res) => {
  const doc = await service.rejectWorkDone(req, req.params.id, req.body.reason);
  res.json({ success: true, data: doc });
});

export const pending = asyncHandler(async (req, res) => {
  const items = await service.pendingApprovals(req);
  res.json({ success: true, data: items });
});
