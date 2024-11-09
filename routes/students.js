const express = require("express");
const { getName, getAvatar } = require("../supabase/queries");
const { uploadAvatar } = require("../controls/student-controls");
const { upload } = require("../cloud_bucket_upload/cloudinary");


const router = express.Router();

// Route to fetch student name
router.get("/name", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getName(req, res);
});

// Route to fetch student avatar
router.get("/avatar", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getAvatar(req, res);
});

router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

module.exports = router;
