import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './user.service.js';

export const createBPM = asyncHandler(async (req, res) => {
  const result = await service.createBPM(req, req.body);
  res.status(201).json({ success: true, data: result });
});

export const listUsers = asyncHandler(async (req, res) => {
  const result = await service.listUsers(req, req.query);
  res.json({ success: true, data: result });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await service.resetPassword(req, req.params.id, req.body.newPassword);
  res.json({ success: true, data: result });
});

export const setStatus = asyncHandler(async (req, res) => {
  const user = await service.setStatus(req, req.params.id, req.body.status);
  res.json({ success: true, data: user });
});

export const changeBlock = asyncHandler(async (req, res) => {
  const user = await service.changeBlock(req, req.params.id, req.body.blockId);
  res.json({ success: true, data: user });
});