import { Router } from 'express';
import * as ctrl from './report.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { query } from 'express-validator';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();
router.use(authenticate);

const monthValidation = [
  query('employeeId').isMongoId(),
  query('year').isInt({ min: 2020, max: 2100 }),
  query('month').isInt({ min: 1, max: 12 }),
];

router.get(
  '/action-plan',
  authorize('SUPER_ADMIN', 'BPM', 'CLF', 'EMPLOYEE'),
  monthValidation,
  validate,
  ctrl.actionPlanPDF
);
router.get(
  '/work-done',
  authorize('SUPER_ADMIN', 'BPM', 'CLF', 'EMPLOYEE'),
  monthValidation,
  validate,
  ctrl.workDonePDF
);
router.get(
  '/attendance-excel',
  authorize('SUPER_ADMIN', 'BPM', 'CLF'),
  ctrl.attendanceExcel
);

export default router;