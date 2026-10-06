import { Router } from 'express';
import * as ctrl from './user.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/authorize.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createBPMValidation,
  setStatusValidation,
  changeBlockValidation,
} from './user.validation.js';

const router = Router();

router.use(authenticate);
router.use(authorize('SUPER_ADMIN'));

router.post('/bpm', createBPMValidation, validate, ctrl.createBPM);
router.get('/', ctrl.listUsers);
router.post('/:id/reset-password', ctrl.resetPassword);
router.patch('/:id/status', setStatusValidation, validate, ctrl.setStatus);
router.patch('/:id/block', changeBlockValidation, validate, ctrl.changeBlock);

export default router;