import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as service from './auditLog.service.js';

const router = Router();
router.use(authenticate);
router.use(authorize('SUPER_ADMIN'));

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await service.listLogs(req.query);
    res.json({ success: true, data: result });
  })
);

export default router;