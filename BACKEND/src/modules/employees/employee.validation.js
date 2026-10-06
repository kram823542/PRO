import { body } from 'express-validator';

export const createEmployeeValidation = [
  body('employeeCode').trim().isLength({ min: 2, max: 30 }).matches(/^[A-Z0-9-]+$/i),
  body('name').trim().notEmpty(),
  body('mobile').isMobilePhone('en-IN'),
  body('designation').trim().notEmpty(),
  body('joiningDate').isISO8601(),
  body('workLocation.panchayat').trim().notEmpty(),
  body('aadhaarNumber').optional().isLength({ min: 12, max: 12 }).isNumeric(),
  body('bankDetails.accountNumber').optional().isLength({ min: 8, max: 20 }).isNumeric(),
  body('bankDetails.ifsc').optional().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/i),
];

export const updateEmployeeValidation = [
  body('mobile').optional().isMobilePhone('en-IN'),
  body('joiningDate').optional().isISO8601(),
  body('workLocation.panchayat').optional().trim().notEmpty(),
];