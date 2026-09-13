const express = require('express');
const router = express.Router();
const {
  getMonthlyAttendance,
  getAttendanceSummary,
  getEmployeeAttendance,
} = require('../controllers/adminAttendanceController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.get('/monthly', getMonthlyAttendance);
router.get('/summary', getAttendanceSummary);
router.get('/employee/:employeeId', getEmployeeAttendance);

module.exports = router;