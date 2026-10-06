import { Router } from 'express';
import * as ctrl from './actionPlan.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { submissionLimiter } from '../../middlewares/rateLimit.middleware.js';
import { submitValidation } from './actionPlan.validation.js';

const router = Router();
router.use(authenticate);

router.post('/', authorize('EMPLOYEE'), submissionLimiter, submitValidation, validate, ctrl.submit);
router.get('/', authorize('SUPER_ADMIN', 'BPM', 'CLF', 'EMPLOYEE'), ctrl.list);
router.get('/today', authorize('EMPLOYEE'), ctrl.today);

export default router;