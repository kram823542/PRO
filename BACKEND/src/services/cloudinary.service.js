import cloudinary from '../config/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export const uploadBuffer = (buffer, folder = 'clf-portal') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1600, height: 1600, crop: 'limit' },
          { quality: 'auto:good' },
        ],
      },
      (err, result) => {
        if (err) {
          logger.error(`Cloudinary upload error: ${err.message}`);
          return reject(ApiError.internal('Image upload failed'));
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });

export const deleteImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    logger.warn(`Cloudinary delete failed: ${err.message}`);
  }
};