import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './clf.service.js';

export const create = asyncHandler(async (req, res) => {
  const result = await service.createCLF(req, req.body);
  res.status(201).json({ success: true, data: result });
});

export const list = asyncHandler(async (req, res) => {
  const clfs = await service.listCLFs(req, req.query);
  res.json({ success: true, data: clfs });
});

export const getOne = asyncHandler(async (req, res) => {
  const clf = await service.getCLF(req, req.params.id);
  res.json({ success: true, data: clf });
});

export const bpmDashboard = asyncHandler(async (req, res) => {
  const data = await service.getBPMDashboard(req);
  res.json({ success: true, data });
});


export const resetPassword = asyncHandler(async (req, res) => {
  const result = await service.resetCLFPassword(
    req,
    req.params.id,
    req.body.newPassword
  );
  res.json({ success: true, data: result });
});