// const express = require('express');
// const router = express.Router();
// const { registerAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminController');
// const { protect } = require('../middleware/authMiddleware');

// // Public routes
// router.post('/register', registerAdmin);
// router.post('/login', loginAdmin);

// // Protected routes
// router.get('/profile', protect, getAdminProfile);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { 
    registerAdmin, 
    loginAdmin, 
    getAdminProfile,
    updateAdminProfile 
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerAdmin);  // नया एडमिन बनाने के लिए
router.post('/login', loginAdmin);        // लॉगिन के लिए

// Protected routes
router.get('/profile', protect, getAdminProfile);     // प्रोफाइल देखने के लिए
router.put('/profile', protect, updateAdminProfile);  // प्रोफाइल अपडेट के लिए

module.exports = router;