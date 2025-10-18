const express = require('express');
const {
  likePost,
  unlikePost,
  checkLike,
  getLikesCount
} = require('../controllers/likeController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/like', protect, likePost);
router.post('/unlike', protect, unlikePost);
router.get('/check/:postId', protect, checkLike);
router.get('/count/:postId', getLikesCount);

module.exports = router;