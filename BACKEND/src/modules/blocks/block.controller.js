import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './block.service.js';

export const create = asyncHandler(async (req, res) => {
  const block = await service.createBlock(req, req.body);
  res.status(201).json({ success: true, data: block });
});

export const list = asyncHandler(async (req, res) => {
  const blocks = await service.listBlocks(req.query);
  res.json({ success: true, data: blocks });
});

export const update = asyncHandler(async (req, res) => {
  const block = await service.updateBlock(req, req.params.id, req.body);
  res.json({ success: true, data: block });
});