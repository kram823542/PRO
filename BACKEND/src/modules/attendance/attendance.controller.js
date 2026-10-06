import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './attendance.service.js';

export const list = asyncHandler(async (req, res) => {
  const result = await service.listAttendance(req, req.query);
  res.json({ success: true, data: result });
});

export const exportCSV = asyncHandler(async (req, res) => {
  const csv = await service.exportCSV(req, req.query);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=attendance-${Date.now()}.csv`);
  res.send(csv);
});