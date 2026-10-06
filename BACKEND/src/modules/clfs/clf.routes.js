// import { Router } from 'express';
// import * as ctrl from './clf.controller.js';
// import { authenticate } from '../../middlewares/auth.middleware.js';
// import { authorize } from '../../middlewares/authorize.middleware.js';
// import { validate } from '../../middlewares/validate.middleware.js';
// import { createCLFValidation } from './clf.validation.js';

// const router = Router();

// router.use(authenticate);

// router.get('/dashboard/bpm', authorize('BPM'), ctrl.bpmDashboard);
// router.get('/', authorize('SUPER_ADMIN', 'BPM'), ctrl.list);
// router.get('/:id', authorize('SUPER_ADMIN', 'BPM', 'CLF'), ctrl.getOne);
// router.post('/', authorize('SUPER_ADMIN', 'BPM'), createCLFValidation, validate, ctrl.create);

// export default router;


import { Router } from 'express';
import * as ctrl from './clf.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createCLFValidation } from './clf.validation.js';

const router = Router();

router.use(authenticate);

router.get('/dashboard/bpm', authorize('BPM'), ctrl.bpmDashboard);
router.get('/', authorize('SUPER_ADMIN', 'BPM'), ctrl.list);
router.get('/:id', authorize('SUPER_ADMIN', 'BPM', 'CLF'), ctrl.getOne);
router.post('/', authorize('SUPER_ADMIN', 'BPM'), createCLFValidation, validate, ctrl.create);

// ✅ NEW: Reset CLF user password (BPM only)
router.post(
  '/:id/reset-password',
  authorize('BPM', 'SUPER_ADMIN'),
  ctrl.resetPassword
);

export default router;