const cloudinary = require("cloudinary").v2;
const { getName, getAvatar, getNotification } = require("../supabase/queries");
const supabase = require('../supabase/db-connection')
require("dotenv").config();


cloudinary.config({
  cloud_name: "diw1xi3xn",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getStudentName = async (req, res) => {
  try {
    await getName(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvatarImage = async (req, res) => {
  try {
    await getAvatar(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentNotification = async (req, res) => {
  try {
    await getNotification(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { email, title } = req.body;

    if (!email || !title) {
      return res.status(400).json({ error: "Email and title are required" });
    }

    console.log('Uploading avatar:', req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log('Cloudinary upload result:', result);

    const { data, error } = await supabase
      .from("avatars")
      .insert({
        title: title,
        url: result.secure_url,
        email: email,
      });

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return res.status(500).json({ error: "Failed to save avatar to database" });
    }

    res.status(200).json({
      status: "success",
      message: "Avatar uploaded successfully",
      data: data[0],
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = { getStudentName, getAvatarImage, uploadAvatar, getStudentNotification };
