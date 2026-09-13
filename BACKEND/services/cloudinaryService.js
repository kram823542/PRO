// const cloudinary = require('../config/cloudinary');
// const fs = require('fs');

// const uploadToCloudinary = async (filePath, folder = 'attendance_photos') => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: folder,
//       resource_type: 'image',
//       transformation: [
//         { quality: 'auto' },
//         { fetch_format: 'auto' },
//         { width: 800, crop: 'limit' },
//       ],
//     });

//     // Delete local file after upload
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     return {
//       url: result.secure_url,
//       publicId: result.public_id,
//       width: result.width,
//       height: result.height,
//       format: result.format,
//     };
//   } catch (error) {
//     console.error('Cloudinary Upload Error:', error);
//     throw new Error('Failed to upload image to Cloudinary');
//   }
// };

// const deleteFromCloudinary = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     return result;
//   } catch (error) {
//     console.error('Cloudinary Delete Error:', error);
//     throw new Error('Failed to delete image from Cloudinary');
//   }
// };

// module.exports = {
//   uploadToCloudinary,
//   deleteFromCloudinary,
// };



const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (fileBuffer, folder = 'attendance_photos') => {
  try {
    console.log('\n=== CLOUDINARY UPLOAD START ===');
    console.log('File Buffer Size:', (fileBuffer.length / 1024).toFixed(2), 'KB');
    console.log('Folder:', folder);

    // ✅ Convert buffer to base64 data URI
    const base64Data = fileBuffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Data}`;

    console.log('Data URI Length:', dataUri.length);

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: 'image',
      timeout: 120000,
      transformation: [
        { quality: 'auto:low' },
        { fetch_format: 'auto' },
        { width: 800, crop: 'limit' },
      ],
    });

    console.log('✅ Cloudinary Upload Success');
    console.log('URL:', result.secure_url);
    console.log('===============================\n');

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error('\n❌ CLOUDINARY UPLOAD ERROR:');
    console.error('Full Error:', JSON.stringify(error, null, 2));
    console.error('===========================================\n');
    throw new Error(
      'Failed to upload image to Cloudinary: ' +
        (error.message || error.error?.message || 'Unknown error')
    );
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};