const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  getStudentName,
  getAvatarImage,
  uploadAvatar,
  getStudentNotification,
} = require("./controls/student-controls");
const { upload } = require("./cloud_bucket_upload/cloudinary");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/name", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    await getStudentName(req, res);
  } catch (error) {
    console.error("Error in /name route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/avatar", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    await getAvatarImage(req, res);
  } catch (error) {
    console.error("Error in /avatar route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/notification", async (req, res) => {
  try {
    const { email, class: className, div } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    await getStudentNotification(req, res);
  } catch (error) {
    console.error("Error in /notification route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/upload-avatar", upload.single("avatar"), uploadAvatar);


app.listen(port, () => {
  console.log(`\n ✓ Server is running on port ${port} 🔥`);
  console.log(` ✓ Follow this link: http://localhost:${port}`);
});
