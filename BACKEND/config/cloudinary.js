// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// // Verify configuration
// const verifyCloudinary = async () => {
//   try {
//     const result = await cloudinary.api.ping();
//     return { success: true, result };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// module.exports = cloudinary;
// module.exports.verifyCloudinary = verifyCloudinary;

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
//   timeout: 120000,   // ✅ Global 120 second timeout
// });

// // Verify configuration
// const verifyCloudinary = async () => {
//   try {
//     const result = await cloudinary.api.ping();
//     return { success: true, result };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// module.exports = cloudinary;
// module.exports.verifyCloudinary = verifyCloudinary;

const cloudinary = require('cloudinary').v2;

// 🔍 Debug — check what values are loaded
console.log('\n=== CLOUDINARY CONFIG LOADING ===');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING');
console.log('API Key:', process.env.CLOUDINARY_API_KEY 
  ? process.env.CLOUDINARY_API_KEY.substring(0, 6) + '...' 
  : '❌ MISSING');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET 
  ? '✅ SET (' + process.env.CLOUDINARY_API_SECRET.length + ' chars)' 
  : '❌ MISSING');
console.log('=================================\n');

// ✅ Hard-coded fallback (agar env na mile toh)
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dsjnikk42';
const API_KEY = process.env.CLOUDINARY_API_KEY || '274313742818653';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'u4SLkFcwvVqORcVhR6tFfb7Gcq8';

console.log('=== USING VALUES ===');
console.log('Cloud Name:', CLOUD_NAME);
console.log('API Key:', API_KEY);
console.log('API Secret Length:', API_SECRET.length);
console.log('====================\n');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
  timeout: 120000,
});

const verifyCloudinary = async () => {
  try {
    const result = await cloudinary.api.ping();
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = cloudinary;
module.exports.verifyCloudinary = verifyCloudinary;