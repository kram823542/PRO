// import { Router } from 'express';
// import * as ctrl from './employee.controller.js';
// import { authenticate } from '../../middlewares/auth.middleware.js';
// import { authorize } from '../../middlewares/authorize.middleware.js';
// import { validate } from '../../middlewares/validate.middleware.js';
// import {
//   createEmployeeValidation,
//   updateEmployeeValidation,
// } from './employee.validation.js';

// const router = Router();

// router.use(authenticate);

// router.post(
//   '/',
//   authorize('CLF', 'SUPER_ADMIN'),
//   createEmployeeValidation,
//   validate,
//   ctrl.create
// );
// router.get('/', authorize('SUPER_ADMIN', 'BPM', 'CLF'), ctrl.list);
// router.get('/:id', ctrl.getOne);
// router.patch(
//   '/:id',
//   authorize('CLF', 'SUPER_ADMIN'),
//   updateEmployeeValidation,
//   validate,
//   ctrl.update
// );
// router.patch('/:id/status', authorize('CLF', 'SUPER_ADMIN'), ctrl.setStatus);

// export default router;


import { Router } from 'express';
import * as ctrl from './employee.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createEmployeeValidation,
  updateEmployeeValidation,
} from './employee.validation.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  authorize('CLF', 'SUPER_ADMIN'),
  createEmployeeValidation,
  validate,
  ctrl.create
);
router.get('/', authorize('SUPER_ADMIN', 'BPM', 'CLF'), ctrl.list);
router.get('/:id', ctrl.getOne);
router.patch(
  '/:id',
  authorize('CLF', 'SUPER_ADMIN'),
  updateEmployeeValidation,
  validate,
  ctrl.update
);
router.patch('/:id/status', authorize('CLF', 'SUPER_ADMIN'), ctrl.setStatus);

// ✅ Reset password
router.post(
  '/:id/reset-password',
  authorize('CLF', 'SUPER_ADMIN'),
  ctrl.resetPassword
);

// ✅ NEW: Permanently delete employee
router.delete(
  '/:id',
  authorize('CLF', 'SUPER_ADMIN'),
  ctrl.remove
);

export default router;