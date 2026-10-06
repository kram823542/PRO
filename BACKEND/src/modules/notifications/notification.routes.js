// import { Router } from 'express';
// import * as ctrl from './notification.controller.js';
// import { authenticate } from '../../middlewares/auth.middleware.js';
// import { authorize } from '../../middlewares/authorize.middleware.js';
// import { body } from 'express-validator';
// import { validate } from '../../middlewares/validate.middleware.js';

// const router = Router();
// router.use(authenticate);

// const sendValidation = [
//   body('clfId').isMongoId(),
//   body('subject').trim().isLength({ min: 3, max: 300 }),
//   body('body').trim().isLength({ min: 5, max: 10000 }),
//   body('messageType').optional().isIn(['NOTICE', 'LETTER', 'INFORMATION']),
// ];

// router.post('/', authorize('BPM'), sendValidation, validate, ctrl.send);
// router.get('/sent', authorize('BPM', 'SUPER_ADMIN'), ctrl.sent);
// router.get('/sent/:id/tracking', authorize('BPM', 'SUPER_ADMIN'), ctrl.tracking);
// router.get('/my', authorize('EMPLOYEE'), ctrl.myMessages);
// router.get('/unread-count', authorize('EMPLOYEE'), ctrl.unreadCount);
// router.patch('/:id/read', authorize('EMPLOYEE'), ctrl.markRead);
// router.patch('/:id/ignore', authorize('EMPLOYEE'), ctrl.ignore);

// export default router;


import { Router } from 'express';
import * as ctrl from './notification.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { body } from 'express-validator';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();
router.use(authenticate);

const sendValidation = [
  body('clfId').isMongoId(),
  body('subject').trim().isLength({ min: 3, max: 300 }),
  body('body').trim().isLength({ min: 5, max: 10000 }),
  body('messageType').optional().isIn(['NOTICE', 'LETTER', 'INFORMATION']),
];

router.post('/', authorize('BPM'), sendValidation, validate, ctrl.send);
router.get('/sent', authorize('BPM', 'SUPER_ADMIN'), ctrl.sent);
router.get('/sent/:id/tracking', authorize('BPM', 'SUPER_ADMIN'), ctrl.tracking);

// ✅ CLF + EMPLOYEE dono allow
router.get('/my', authorize('EMPLOYEE', 'CLF'), ctrl.myMessages);
router.get('/unread-count', authorize('EMPLOYEE', 'CLF'), ctrl.unreadCount);
router.patch('/:id/read', authorize('EMPLOYEE', 'CLF'), ctrl.markRead);
router.patch('/:id/ignore', authorize('EMPLOYEE', 'CLF'), ctrl.ignore);

export default router;