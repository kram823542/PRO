// const express = require('express');
// const router = express.Router();
// const {
//   submitWork,
//   getPendingSubmissions,
//   getSubmission,
//   approveSubmission,
//   rejectSubmission,
//   getWorkHistory,
// } = require('../controllers/adminWorkController');
// const { protect } = require('../middleware/authMiddleware');
// const { authorize } = require('../middleware/roleMiddleware');
// // const { uploadSinglePhoto } = require('../middleware/uploadMiddleware');

// // All routes require authentication
// router.use(protect);

// // Employee routes
// router.post('/submit', authorize('EMPLOYEE'), uploadSinglePhoto, submitWork);
// // router.post('/submit', authorize('EMPLOYEE'), submitWork);
// router.get('/history', getWorkHistory);

// // Admin routes
// router.get('/pending', authorize('SUPER_ADMIN', 'CLF_ADMIN'), getPendingSubmissions);
// router.get('/:id', getSubmission);
// router.put('/:id/approve', authorize('SUPER_ADMIN', 'CLF_ADMIN'), approveSubmission);
// router.put('/:id/reject', authorize('SUPER_ADMIN', 'CLF_ADMIN'), rejectSubmission);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  submitWork,
  getPendingSubmissions,
  getSubmission,
  approveSubmission,
  rejectSubmission,
  getWorkHistory,
} = require('../controllers/adminWorkController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { uploadSinglePhoto } = require('../middleware/uploadMiddleware'); // ✅ Comment hataya

// All routes require authentication
router.use(protect);

// Employee routes
router.post('/submit', authorize('EMPLOYEE'), uploadSinglePhoto, submitWork);
router.get('/history', getWorkHistory);

// Admin routes
router.get('/pending', authorize('SUPER_ADMIN', 'CLF_ADMIN'), getPendingSubmissions);
router.get('/:id', getSubmission);
router.put('/:id/approve', authorize('SUPER_ADMIN', 'CLF_ADMIN'), approveSubmission);
router.put('/:id/reject', authorize('SUPER_ADMIN', 'CLF_ADMIN'), rejectSubmission);

module.exports = router;