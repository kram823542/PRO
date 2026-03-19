// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'admin-posts',
//         allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
//         transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024 // 5MB limit
//     }
// });

// module.exports = upload;


const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage for multiple images
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Create different folders based on file type
        let folder = 'admin-posts';
        
        return {
            folder: folder,
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            transformation: [{ width: 1200, height: 1200, crop: 'limit' }],
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
        };
    }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB per file limit
    }
});

// Middleware for handling multiple image uploads (max 5)
const uploadTeamPhotos = upload.array('teamPhotos', 5);

// Error handling wrapper
const uploadMiddleware = (req, res, next) => {
    uploadTeamPhotos(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({
                    success: false,
                    message: 'Maximum 5 images allowed'
                });
            }
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'File too large. Maximum size is 5MB'
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

module.exports = uploadMiddleware;