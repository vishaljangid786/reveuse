const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const CLOUDINARY_CLOUD_NAME = "djvxynk2f";
const CLOUDINARY_API_KEY = "917629743935231";
const CLOUDINARY_API_SECRET = "6-nMEpJVIa1_RUj_aeiR6hsGFw8";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Configure multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/avif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and JPG are allowed."));
    }
  },
});

module.exports = { cloudinary, upload };
