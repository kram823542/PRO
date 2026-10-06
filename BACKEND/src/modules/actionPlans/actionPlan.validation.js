import { body } from 'express-validator';

export const submitValidation = [
  body('plan').trim().isLength({ min: 5, max: 2000 }).withMessage('Plan must be 5-2000 chars'),
];