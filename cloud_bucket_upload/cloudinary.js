const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinarySecretKey = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: "diw1xi3xn",
  api_key: cloudinaryApiKey,
  api_secret: cloudinarySecretKey,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    format: async (req, file) => "png", 
    public_id: (req, file) => path.parse(file.originalname).name, 
  },
});

const upload = multer({ storage });

module.exports = { upload };
