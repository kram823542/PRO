const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  resetEmployeePassword,
} = require('../controllers/adminEmployeeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(protect);

// Routes accessible by SUPER_ADMIN and CLF_ADMIN
router.post('/', authorize('SUPER_ADMIN', 'CLF_ADMIN'), createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', authorize('SUPER_ADMIN', 'CLF_ADMIN'), updateEmployee);
router.delete('/:id', authorize('SUPER_ADMIN', 'CLF_ADMIN'), deleteEmployee);
router.post('/:id/reset-password', authorize('SUPER_ADMIN', 'CLF_ADMIN'), resetEmployeePassword);

module.exports = router;