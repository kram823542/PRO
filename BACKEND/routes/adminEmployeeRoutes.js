

// const express = require('express');
// const router = express.Router();
// const {
//   getDesignations,
//   createEmployee,
//   getEmployees,
//   getEmployee,
//   updateEmployee,
//   deleteEmployee,
//   resetEmployeePassword,
// } = require('../controllers/adminEmployeeController');
// const { protect } = require('../middleware/authMiddleware');
// const { authorize } = require('../middleware/roleMiddleware');

// // All routes require authentication
// router.use(protect);

// // ✅ Designations list — MUST BE BEFORE /:id route
// router.get(
//   '/designations',
//   authorize('SUPER_ADMIN', 'CLF_ADMIN'),
//   getDesignations
// );

// // Routes accessible by SUPER_ADMIN and CLF_ADMIN
// router.post('/', authorize('SUPER_ADMIN', 'CLF_ADMIN'), createEmployee);
// router.get('/', getEmployees);
// router.get('/:id', getEmployee);
// router.put('/:id', authorize('SUPER_ADMIN', 'CLF_ADMIN'), updateEmployee);
// router.delete('/:id', authorize('SUPER_ADMIN', 'CLF_ADMIN'), deleteEmployee);
// router.post(
//   '/:id/reset-password',
//   authorize('SUPER_ADMIN', 'CLF_ADMIN'),
//   resetEmployeePassword
// );

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getDesignations,
  getBanks,
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

// ✅ Designations list — MUST BE BEFORE /:id
router.get(
  '/designations',
  authorize('SUPER_ADMIN', 'CLF_ADMIN'),
  getDesignations
);

// ✅ Banks list — MUST BE BEFORE /:id
router.get(
  '/banks',
  authorize('SUPER_ADMIN', 'CLF_ADMIN'),
  getBanks
);

// Routes accessible by SUPER_ADMIN and CLF_ADMIN
router.post('/', authorize('SUPER_ADMIN', 'CLF_ADMIN'), createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', authorize('SUPER_ADMIN', 'CLF_ADMIN'), updateEmployee);
router.delete('/:id', authorize('SUPER_ADMIN', 'CLF_ADMIN'), deleteEmployee);
router.post(
  '/:id/reset-password',
  authorize('SUPER_ADMIN', 'CLF_ADMIN'),
  resetEmployeePassword
);

module.exports = router;