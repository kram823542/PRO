import { body } from 'express-validator';

export const createBPMValidation = [
  body('username').trim().isLength({ min: 4, max: 30 }).matches(/^[a-z0-9_]+$/i),
  body('name').trim().notEmpty(),
  body('blockId').isMongoId(),
  body('email').optional().isEmail(),
  body('mobile').optional().isMobilePhone('en-IN'),
];

export const setStatusValidation = [
  body('status').isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
];

export const changeBlockValidation = [body('blockId').isMongoId()];