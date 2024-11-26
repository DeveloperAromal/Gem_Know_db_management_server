const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  getStudentName,
  getAvatarImage,
  uploadAvatar,
  getStudentNotification,
  getStudentData,
  getStudentAbsentese,
  uploadTimetable,
  getStudentsTimeTable,
  getStudentsTicket,
  getStudentsExamResult,
  getStudentsFeesData,
} = require("./controls/student-controls");
const { upload } = require("./cloud_bucket_upload/cloudinary");
const {
  insertNotification,
  getStudents,
  insertAbsentData,
  insertFeesData,
  getStudentsPaidDetails
} = require("./controls/admin-controls");

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

app.get("/userdata", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    await getStudentData(req, res);
  } catch (error) {
    console.error("Error in /userdata route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/avatar", async (req, res) => {
  try {
    const { admNo } = req.query;
    if (!admNo) {
      return res.status(400).json({ error: "admNo parameter is required" });
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

app.get("/absentlist", async (req, res) => {
  try {
    const { admNo } = req.query;
    if (!admNo) {
      return res.status(400).json({ error: "admNo parameter is required" });
    }
    await getStudentAbsentese(req, res);
  } catch (error) {
    console.error("Error in /notification route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/timetable", async (req, res) => {
  try {
    const { className, div } = req.query;
    if (!className || !div) {
      return res
        .status(400)
        .json({ error: "class, and div parameters are required" });
    }
    await getStudentsTimeTable(req, res);
  } catch (error) {
    console.error("Error in /avatar route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/ticket", async (req, res) => {
  try {
    const { admNo } = req.query;
    if (!admNo) {
      return res.status(400).json({ error: "admNo parameter is required" });
    }
    await getStudentsTicket(req, res);
  } catch (error) {
    console.error("Error in /notification route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const { className, div } = req.query;
    if (!className || !div) {
      return res
        .status(400)
        .json({ error: "class, and div parameters are required" });
    }
    await getStudentsTimeTable(req, res);
  } catch (error) {
    console.error("Error in /notes route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/result", async (req, res) => {
  try {
    const { admNo, examName } = req.query;
    if (!admNo || !examName) {
      return res.status(400).json({ error: "admNo parameters are required" });
    }
    await getStudentsExamResult(req, res);
  } catch (error) {
    console.error("Error in /result route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/fees", async (req, res) => {
  try {
    const { admNo } = req.query;
    if (!admNo) {
      return res.status(400).json({ error: "admNo parameters are required" });
    }
    await getStudentsFeesData(req, res);
  } catch (error) {
    console.error("Error in /fees route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/upload-avatar", upload.single("avatar"), uploadAvatar);
app.post("/upload-timetable", upload.single("timetable"), uploadTimetable);

// ================== ADMIN POSTS =====================

app.post("/push-notification", async (req, res) => {
  try {
    const { message, title, className, div } = req.body;

    if (!message || !title || !className || !div) {
      if (!res.headersSent) {
        return res.status(400).json({
          error: "message, title, className, div are required",
        });
      }
    }

    const result = await insertNotification(req.body, res);
    if (result.error) {
      if (!res.headersSent) {
        return res.status(500).json({ error: result.error });
      }
    }
    if (!res.headersSent) {
      return res.status(200).json({ status: "success", data: result.data });
    }
  } catch (error) {
    console.error("Error in /push-notification route:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});


app.post("/push-absentese", async (req, res) => {
  try {
    const { monthData, admNo } = req.body;

    if (!monthData || !admNo) {
      if (!res.headersSent) {
        return res.status(400).json({
          error: "monthData & admNo are required",
        });
      }
    }

    const result = await insertAbsentData(req.body, res);
    if (result.error) {
      if (!res.headersSent) {
        return res.status(500).json({ error: result.error });
      }
    }
    if (!res.headersSent) {
      return res.status(200).json({ status: "success", data: result.data });
    }
  } catch (error) {
    console.error("Error in /push-absentese route:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

app.post('/push-feesdata', async (req, res) => {
  const { feesData, admNo } = req.body;

  console.log("Received data:", { feesData, admNo });

  try {
    const result = await insertFeesData({ feesData, admNo });

    if (result.error) {
      console.error("Error inserting fees data:", result.error);
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json({ message: "Fees data successfully inserted", data: result.data });
  } catch (err) {
    console.error("Unexpected error inserting fees data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/studentdata", async (req, res) => {
  try {
    const { className, div } = req.query;
    if (!className || !div) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    await getStudents(req, res);
  } catch (error) {
    console.error("Error in /userdata route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/fees-paid-this-month", async (req, res) => {
  try {
    const { className, div } = req.query;
    if (!className || !div) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    await getStudentsPaidDetails(req, res);
  } catch (error) {
    console.error("Error in /fees-paid-this-month route:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.listen(port, () => {
  console.log("\x1b[32m%s\x1b[0m", `\n ✓ Server is running on port ${port} 🔥`);
  console.log("\x1b[31m%s\x1b[0m", " ✓ Happy Hacking !");
  console.log(
    "\x1b[36m%s\x1b[0m",
    ` ✓ Follow this link: http://localhost:${port}`
  );
});
