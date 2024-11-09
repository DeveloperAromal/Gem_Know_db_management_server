const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  getStudentName,
  getAvatarImage,
  uploadAvatar,
} = require("./controls/student-controls");
const { upload } = require("./cloud_bucket_upload/cloudinary");



const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/name", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getStudentName(req, res);
});

app.get("/avatar", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getAvatarImage(req, res);
});


app.post("/upload-avatar", upload.single("avatar"), uploadAvatar); // Handles image upload and saving


app.listen(port, () => {
  console.log(`\n ✓ Server is running on port ${port} 🔥`);
  console.log(` ✓ Follow this link: http://localhost:${port}`);
});
