// const express = require('express');
// const router = express.Router();
// const { login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// // Public routes
// router.post('/login', login);

// // Protected routes
// router.get('/me', protect, getMe);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  uploadProfilePicture,
  removeProfilePicture,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { uploadSinglePhoto } = require('../middleware/uploadMiddleware');

// ==============================
// PUBLIC ROUTES
// ==============================
router.post('/login', login);

// ==============================
// PROTECTED ROUTES (Login required)
// ==============================
router.get('/me', protect, getMe);

// Profile Picture Routes
router.post(
  '/upload-profile-picture',
  protect,
  uploadSinglePhoto,
  uploadProfilePicture
);
router.delete('/remove-profile-picture', protect, removeProfilePicture);

module.exports = router;