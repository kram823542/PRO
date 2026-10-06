import { Router } from 'express';
import * as ctrl from './block.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createBlockValidation } from './block.validation.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('SUPER_ADMIN', 'BPM'), ctrl.list);
router.post('/', authorize('SUPER_ADMIN'), createBlockValidation, validate, ctrl.create);
router.patch('/:id', authorize('SUPER_ADMIN'), ctrl.update);

export default router;