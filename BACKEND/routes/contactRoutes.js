const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

// Public route (no auth required)
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/stats', protect, adminOnly, getContactStats);
router.get('/', protect, adminOnly, getContacts);
router.get('/:id', protect, adminOnly, getContactById);
router.put('/:id', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContact);

module.exports = router;