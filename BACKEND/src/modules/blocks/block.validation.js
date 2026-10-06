import { body } from 'express-validator';

export const createBlockValidation = [
  body('name').trim().notEmpty(),
  body('code').trim().isLength({ min: 2, max: 10 }).matches(/^[A-Z0-9]+$/i),
];