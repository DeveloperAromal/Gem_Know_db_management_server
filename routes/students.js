const express = require("express");
const {
  getName,
  getAvatar,
  getUserData,
  getNotification,
  getAbsentese,
  getTimeTable,
  getClassNotes,
  getresult
} = require("../supabase/queries");
const {
  uploadAvatar,
  uploadTimetable,
} = require("../controls/student-controls");
const { upload } = require("../cloud_bucket_upload/cloudinary");

const router = express.Router();

router.get("/name", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getName(req, res);
});

router.get("/userdata", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getUserData(req, res);
});

router.get("/avatar", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  await getAvatar(req, res);
});

router.get("/notification", async (req, res) => {
  const { email, class: className, div } = req.query;

  if (!email || !className || !div) {
    return res
      .status(400)
      .json({ error: "Email, class, and div parameters are required" });
  }

  await getNotification(req, res);
});

router.get("/absentlist", async (req, res) => {
  const { email, class: className, div } = req.query;

  if (!email || !className || !div) {
    return res
      .status(400)
      .json({ error: "Email, class, and div parameters are required" });
  }

  await getAbsentese(req, res);
});

router.get("/ticket", async (req, res) => {
  const { admNo } = req.query;

  if (!admNo) {
    return res
      .status(400)
      .json({ error: "admNo parameters are required" });
  }

  await getTicketData(req, res);
});


router.get("/timetable", async (req, res) => {
  const { className, div } = req.query;

  if (!className || !div) {
    return res
      .status(400)
      .json({ error: "class, and div parameters are required" });
  }

  await getTimeTable(req, res);
});

router.get("/notes", async (req, res) => {
  const { className, div } = req.query;

  if (!className || !div) {
    return res
      .status(400)
      .json({ error: "class, and div parameters are required" });
  }

  await getClassNotes(req, res);
});

router.get("/result", async (req, res) => {
  const { admNo, examName } = req.query;

  if (!admNo || !examName) {
    return res
      .status(400)
      .json({ error: "admNo, and examName parameters are required" });
  }

  await getresult(req, res);
});

router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);
router.post("/upload-timetable", upload.single("timetable"), uploadTimetable);

module.exports = router;
