import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './actionPlan.service.js';

export const submit = asyncHandler(async (req, res) => {
  const plan = await service.submitActionPlan(req, req.body);
  res.status(201).json({ success: true, data: plan });
});

export const list = asyncHandler(async (req, res) => {
  const result = await service.listActionPlans(req, req.query);
  res.json({ success: true, data: result });
});

export const today = asyncHandler(async (req, res) => {
  const plan = await service.getTodayPlan(req);
  res.json({ success: true, data: plan });
});