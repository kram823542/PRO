import { body } from 'express-validator';

export const submitValidation = [
  body('description').trim().isLength({ min: 10, max: 3000 }),
];

export const rejectValidation = [
  body('reason').trim().isLength({ min: 5, max: 1000 }).withMessage('Reason required'),
];