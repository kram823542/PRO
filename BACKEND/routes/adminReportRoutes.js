const express = require('express');
const router = express.Router();
const {
  getAttendanceReport,
  exportAttendanceExcel,
  getCLFSummaryReport,
} = require('../controllers/adminReportController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(protect);

// Reports accessible by admins only
router.get('/attendance', authorize('SUPER_ADMIN', 'CLF_ADMIN'), getAttendanceReport);
router.get('/attendance/excel', authorize('SUPER_ADMIN', 'CLF_ADMIN'), exportAttendanceExcel);

// Super Admin only
router.get('/clf-summary', authorize('SUPER_ADMIN'), getCLFSummaryReport);

module.exports = router;