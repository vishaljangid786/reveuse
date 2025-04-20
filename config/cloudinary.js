const cloudinary = require("cloudinary").v2;
const CLOUDINARY_CLOUD_NAME = "djvxynk2f";
const CLOUDINARY_API_KEY = "917629743935231";
const CLOUDINARY_API_SECRET = "6-nMEpJVIa1_RUj_aeiR6hsGFw8";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
