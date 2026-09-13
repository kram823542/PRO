const express = require('express');
const router = express.Router();
const {
  createCLF,
  getCLFs,
  getCLF,
  updateCLF,
  deleteCLF,
} = require('../controllers/adminClfController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public (authenticated)
router.use(protect);

// Super Admin only routes
router.post('/', authorize('SUPER_ADMIN'), createCLF);
router.put('/:id', authorize('SUPER_ADMIN'), updateCLF);
router.delete('/:id', authorize('SUPER_ADMIN'), deleteCLF);

// All authenticated users can view CLFs
router.get('/', getCLFs);
router.get('/:id', getCLF);

module.exports = router;