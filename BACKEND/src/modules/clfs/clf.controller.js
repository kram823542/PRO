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

// ✅ FIX: Yahan req.body pass karo, galti se bhi req.body.newPassword mat likhna
export const resetPassword = asyncHandler(async (req, res) => {
  const result = await service.resetCLFPassword(
    req,
    req.params.id,
    req.body // ✅ Yahan direct req.body bhej rahe hain
  );
  res.json({ success: true, data: result });
});

export const updateBod = asyncHandler(async (req, res) => {
  const clf = await service.updateBodDetails(req, req.params.id, req.body);
  res.json({ success: true, data: clf });
});