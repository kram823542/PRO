// import { asyncHandler } from '../../utils/asyncHandler.js';
// import * as service from './advice.service.js';

// export const create = asyncHandler(async (req, res) => {
//   const advice = await service.createAdvice(req, req.body);
//   res.status(201).json({ success: true, data: advice });
// });

// export const list = asyncHandler(async (req, res) => {
//   const result = await service.listAdvices(req, req.query);
//   res.json({ success: true, data: result });
// });

// export const getOne = asyncHandler(async (req, res) => {
//   const advice = await service.getAdvice(req, req.params.id);
//   res.json({ success: true, data: advice });
// });

// export const remove = asyncHandler(async (req, res) => {
//   const result = await service.deleteAdvice(req, req.params.id);
//   res.json({ success: true, data: result });
// });

// /** ✅ PDF download */
// export const downloadPDF = asyncHandler(async (req, res) => {
//   await service.generateAdvicePDF(req, req.params.id, res);
// });



import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './advice.service.js';

export const create = asyncHandler(async (req, res) => {
  const advice = await service.createAdvice(req, req.body);
  res.status(201).json({ success: true, data: advice });
});

export const list = asyncHandler(async (req, res) => {
  const result = await service.listAdvices(req, req.query);
  res.json({ success: true, data: result });
});

export const getOne = asyncHandler(async (req, res) => {
  const advice = await service.getAdvice(req, req.params.id);
  res.json({ success: true, data: advice });
});

export const remove = asyncHandler(async (req, res) => {
  const result = await service.deleteAdvice(req, req.params.id);
  res.json({ success: true, data: result });
});

/** ✅ PDF — ?mode=print → inline (browser print), ?mode=download → attachment */
export const downloadPDF = asyncHandler(async (req, res) => {
  const inline = req.query.mode === 'print';
  await service.generateAdvicePDF(req, req.params.id, res, { inline });
});