import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './report.service.js';

export const actionPlanPDF = asyncHandler(async (req, res) => {
  const { employeeId, year, month } = req.query;
  const doc = await service.actionPlanPDF(req, {
    employeeId,
    year: parseInt(year),
    month: parseInt(month),
  });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=action-plan-${year}-${month}.pdf`);
  doc.pipe(res);
});

export const workDonePDF = asyncHandler(async (req, res) => {
  const { employeeId, year, month } = req.query;
  const doc = await service.workDonePDF(req, {
    employeeId,
    year: parseInt(year),
    month: parseInt(month),
  });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=work-done-${year}-${month}.pdf`);
  doc.pipe(res);
});

export const attendanceExcel = asyncHandler(async (req, res) => {
  const wb = await service.attendanceExcel(req, req.query);
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', `attachment; filename=attendance-${Date.now()}.xlsx`);
  await wb.xlsx.write(res);
  res.end();
});