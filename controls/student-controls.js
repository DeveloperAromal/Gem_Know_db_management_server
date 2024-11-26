const cloudinary = require("cloudinary").v2;
const {
  getName,
  getAvatar,
  getNotification,
  getUserData,
  getAbsentese,
  getTimeTable,
  getTicketData,
  getClassNotes,
  getresult,
  getFeesData
} = require("../supabase/queries");
const supabase = require("../supabase/db-connection");
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

const getStudentData = async (req, res) => {
  try {
    await getUserData(req, res);
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

const getStudentAbsentese = async (req, res) => {
  try {
    await getAbsentese(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsTimeTable = async (req, res) => {
  try {
    await getTimeTable(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsTicket = async (req, res) => {
  try {
    await getTicketData(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsNotes = async (req, res) => {
  try {
    await getClassNotes(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsExamResult = async (req, res) => {
  try {
    await getresult(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsFeesData = async (req, res) => {
  try {
    await getFeesData(req, res);
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

    console.log("Uploading avatar:", req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload result:", result);

    const { data, error } = await supabase.from("avatars").insert({
      title: title,
      url: result.secure_url,
      email: email,
    });

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return res
        .status(500)
        .json({ error: "Failed to save avatar to database" });
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

const uploadTimetable = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { className, title, div } = req.body;

    if (!className || !title || !div) {
      return res
        .status(400)
        .json({ error: "className, title and div are required" });
    }

    console.log("Uploading Timetable:", req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload result:", result);

    const { data, error } = await supabase.from("timetable").insert({
      title: title,
      url: result.secure_url,
      className: className,
      div: div,
    });

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return res
        .status(500)
        .json({ error: "Failed to save timetable to database" });
    }

    res.status(200).json({
      status: "success",
      message: "Time table uploaded successfully",
      data: data[0],
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};


module.exports = {
  getStudentName,
  getAvatarImage,
  uploadAvatar,
  getStudentNotification,
  getStudentData,
  getStudentAbsentese,
  uploadTimetable,
  getStudentsTimeTable,
  getStudentsTicket,
  getStudentsNotes,
  getStudentsExamResult,
  getStudentsFeesData,
};
