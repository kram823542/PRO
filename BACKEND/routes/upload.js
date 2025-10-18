const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Upload image to Cloudinary - CORRECTED VERSION
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received:', req.file ? 'File present' : 'No file');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    console.log('File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert buffer to base64 for Cloudinary
    const fileBuffer = req.file.buffer;
    const fileBase64 = `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`;

    // Upload to Cloudinary using upload method (not upload_stream)
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: 'climate-blog',
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto'
    });

    console.log('Cloudinary upload successful:', {
      url: result.secure_url,
      public_id: result.public_id
    });

    res.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error details:', error);
    
    // More specific error messages
    let errorMessage = 'Server error during upload';
    
    if (error.message.includes('File size too large')) {
      errorMessage = 'File size must be less than 5MB';
    } else if (error.message.includes('Invalid image file')) {
      errorMessage = 'Invalid image file format';
    } else if (error.message.includes('Cloudinary')) {
      errorMessage = 'Cloudinary service error';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 5MB'
      });
    }
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Upload failed'
  });
});

module.exports = router;