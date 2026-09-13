// const multer = require('multer');
// const path = require('path');

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 5MB limit
//   fileFilter: fileFilter,
// });

// // Middleware for single photo upload
// const uploadSinglePhoto = upload.single('photo');

// // Middleware for multiple photos (if needed later)
// const uploadMultiplePhotos = upload.array('photos', 5);

// module.exports = {
//   upload,
//   uploadSinglePhoto,
//   uploadMultiplePhotos,
// };


const multer = require('multer');

// ✅ Memory storage — file RAM mein rahegi, disk pe nahi
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    file.originalname.toLowerCase().split('.').pop()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: fileFilter,
});

// Middleware for single photo upload
const uploadSinglePhoto = upload.single('photo');

// Middleware for multiple photos
const uploadMultiplePhotos = upload.array('photos', 5);

module.exports = {
  upload,
  uploadSinglePhoto,
  uploadMultiplePhotos,
};