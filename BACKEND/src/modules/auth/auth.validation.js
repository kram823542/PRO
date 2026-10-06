import { body } from 'express-validator';

export const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
];

export const changePasswordValidation = [
  body('oldPassword').notEmpty(),
  body('newPassword')
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .withMessage('Password must contain letters and numbers (min 8 chars)'),
];