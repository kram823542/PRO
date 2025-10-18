const express = require('express');
const cloudinary = require('../config/cloudinary');
const router = express.Router();

// Test Cloudinary connection
router.get('/test', async (req, res) => {
  try {
    console.log('🔍 Testing Cloudinary Connection...');
    
    // Simple Cloudinary ping test
    const result = await cloudinary.api.ping();
    
    console.log('✅ Cloudinary Ping Result:', result);
    
    res.status(200).json({
      success: true,
      message: 'Cloudinary Connected Successfully!',
      data: result
    });
  } catch (error) {
    console.log('❌ Cloudinary Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Cloudinary Connection Failed',
      error: error.message
    });
  }
});

// Test image upload
router.post('/test-upload', async (req, res) => {
  try {
    console.log('🔍 Testing Cloudinary Upload...');
    
    // Test with a simple image from Unsplash
    const result = await cloudinary.uploader.upload(
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      { folder: 'test-uploads' }
    );

    console.log('✅ Cloudinary Upload Success:', result.public_id);
    
    res.status(200).json({
      success: true,
      message: 'Image Upload Test Successful!',
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format
      }
    });
  } catch (error) {
    console.log('❌ Cloudinary Upload Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Image Upload Test Failed',
      error: error.message
    });
  }
});

module.exports = router;