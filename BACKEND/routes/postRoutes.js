// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const {
//     createPost,
//     getPosts,
//     getPostById,
//     updatePost,
//     deletePost
// } = require('../controllers/postController');
// const upload = require('../middleware/uploadMiddleware');

// // Public routes
// router.get('/', getPosts);
// router.get('/:id', getPostById);

// // Protected routes (require login)
// router.post('/', protect, upload.single('image'), createPost);
// router.put('/:id', protect, upload.single('image'), updatePost);
// router.delete('/:id', protect, deletePost);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsByAuthor,
    getPostsByCategory
} = require('../controllers/postController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/author/:authorId', getPostsByAuthor);
router.get('/category/:category', getPostsByCategory);

// Protected routes (require login)
router.post('/', 
    protect, 
    uploadMiddleware, // This handles multiple images
    createPost
);

router.put('/:id', 
    protect, 
    uploadMiddleware, // This handles multiple images for update
    updatePost
);

router.delete('/:id', protect, deletePost);

module.exports = router;