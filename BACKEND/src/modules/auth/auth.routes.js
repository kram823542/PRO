import { Router } from 'express';
import { body } from 'express-validator';
import multer from 'multer'; // ✅ NAYA: Image upload ke liye
import * as ctrl from './auth.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authLimiter } from '../../middlewares/rateLimit.middleware.js';
import { loginValidation, changePasswordValidation } from './auth.validation.js';

const router = Router();

// ✅ Multer Setup (Image ko memory me rakhega, phir cloudinary bhejenge)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

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

// ✅ Profile update route me multer add kiya
router.patch(
  '/profile',
  authenticate,
  upload.single('profilePhoto'), // Is naam se frontend se image aayegi
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