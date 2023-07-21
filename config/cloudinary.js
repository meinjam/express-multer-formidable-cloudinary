const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const initializeCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
};

const uploadCloudinary = async (path) => {
  const uploadImageToCloudinary = await cloudinary.uploader.upload(path, {
    use_filename: true,
    // folder: 'demo_img_check',
  });

  return uploadImageToCloudinary;
};

module.exports = { initializeCloudinary, uploadCloudinary };
