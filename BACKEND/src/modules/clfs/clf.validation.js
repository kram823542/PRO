import { body } from 'express-validator';

export const createCLFValidation = [
  body('name').trim().notEmpty(),
  body('code').trim().isLength({ min: 2, max: 20 }).matches(/^[A-Z0-9-]+$/i),
  body('contact').optional().isMobilePhone('en-IN'),
  body('email').optional().isEmail(),
  body('blockId').optional().isMongoId(),
];