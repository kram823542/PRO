import { Router } from 'express';
import * as ctrl from './attendance.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';

const router = Router();
router.use(authenticate);

router.get('/', authorize('SUPER_ADMIN', 'BPM', 'CLF', 'EMPLOYEE'), ctrl.list);
router.get('/export', authorize('SUPER_ADMIN', 'BPM', 'CLF'), ctrl.exportCSV);

export default router;