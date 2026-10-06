// import { Router } from 'express';
// import * as ctrl from './auth.controller.js';
// import { validate } from '../../middlewares/validate.middleware.js';
// import { authenticate } from '../../middlewares/auth.middleware.js';
// import { authLimiter } from '../../middlewares/rateLimit.middleware.js';
// import { loginValidation, changePasswordValidation } from './auth.validation.js';

// const router = Router();

// router.post('/login', authLimiter, loginValidation, validate, ctrl.login);
// router.post('/refresh', ctrl.refresh);
// router.post('/logout', ctrl.logout);
// router.get('/me', authenticate, ctrl.me);
// router.post(
//   '/change-password',
//   authenticate,
//   changePasswordValidation,
//   validate,
//   ctrl.changePassword
// );

// export default router;



import { Router } from 'express';
import { body } from 'express-validator';
import * as ctrl from './auth.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authLimiter } from '../../middlewares/rateLimit.middleware.js';
import { loginValidation, changePasswordValidation } from './auth.validation.js';

const router = Router();

router.post('/login', authLimiter, loginValidation, validate, ctrl.login);
router.post('/refresh', ctrl.refresh);
router.post('/logout', ctrl.logout);
router.get('/me', authenticate, ctrl.me);
router.post(
  '/change-password',
  authenticate,
  changePasswordValidation,
  validate,
  ctrl.changePassword
);

// ✅ Profile update — sirf email, mobile
router.patch(
  '/profile',
  authenticate,
  [
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('mobile')
      .optional()
      .isLength({ min: 10, max: 15 })
      .withMessage('Invalid mobile'),
  ],
  validate,
  ctrl.updateProfile
);

export default router;