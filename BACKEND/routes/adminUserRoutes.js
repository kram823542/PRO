const express = require('express');
const router = express.Router();
const {
  createAdminUser,
  getAdminUsers,
  updateAdminUser,
  deleteAdminUser,
} = require('../controllers/adminUserController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes require authentication and SUPER_ADMIN role
router.use(protect);
router.use(authorize('SUPER_ADMIN'));

router.post('/', createAdminUser);
router.get('/', getAdminUsers);
router.put('/:id', updateAdminUser);
router.delete('/:id', deleteAdminUser);

module.exports = router;