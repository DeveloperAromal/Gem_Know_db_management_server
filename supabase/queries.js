const supabase = require("./db-connection");

async function getName(req, res) {
  const { email } = req.query;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("name, date_of_birth")
      .eq("email", email);

    if (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getUserData(req, res) {
  const { email } = req.query;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error fetching userData:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getAvatar(req, res) {
  const { admNo } = req.query;

  try {
    const { data, error } = await supabase
      .from("avatars")
      .select("url, title")
      .eq("admNo", admNo);

    if (error) {
      console.error("Error fetching avatar:", error);
      return res.status(500).json({ error: "Avatar not found" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Avatar not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getNotification(req, res) {
  const { email, className, div } = req.query;

  try {
    const { data, error } = await supabase
      .from("notification")
      .select("message, title, created_at")
      .eq("email", email)
      .eq("className", className)
      .eq("div", div);

    if (error) {
      console.error("Error occurred while fetching notification:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "No notifications found" });
    }

    res.json({ status: "success", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getAbsentese(req, res) {
  const { admNo } = req.query;

  try {
    const { data, error } = await supabase
      .from("absent")
      .select("monthData")
      .eq("admNo", admNo);

    if (error) {
      console.error("Error occurred while fetching notification:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "No notifications found" });
    }

    res.json({ status: "success", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getTimeTable(req, res) {
  const { className, div } = req.query;

  try {
    const { data, error } = await supabase
      .from("timetable")
      .select("url, title")
      .eq("className", className)
      .eq("div", div);

    if (error) {
      console.error("Error fetching timetable:", error);
      return res.status(500).json({ error: "timetable not found" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "timetable not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getClassNotes(req, res) {
  const { className, div } = req.query;

  try {
    const { data, error } = await supabase
      .from("notes")
      .select("url, title")
      .eq("className", className)
      .eq("div", div);

    if (error) {
      console.error("Error fetching timetable:", error);
      return res.status(500).json({ error: "notes not found" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "notes not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getResult(req, res) {
  const { admNo, examName } = req.query;

  try {
    const { data, error } = await supabase
      .from("result")
      .select("*")
      .eq("admNo", admNo)
      .eq("examName", examName);

    if (error) {
      console.error("Error fetching exam result:", error);
      return res.status(500).json({ error: "exam result not found" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "exam result not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getFeesData(req, res) {
  const { admNo } = req.query;

  try {
    const { data, error } = await supabase
      .from("fees")
      .select("*")
      .eq("admNo", admNo)

    if (error) {
      console.error("Error fetching Fees data:", error);
      return res.status(500).json({ error: "Fees data not found" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Fees data not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}


async function getTicketData(req, res) {
  const { admNo } = req.query;

  try {
    const { data, error } = await supabase
      .from("ticket")
      .select("*")
      .eq("admNo", admNo);

    if (error) {
      console.error("Error fetching userData:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ status: "success", data: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

module.exports = {
  getName,
  getAvatar,
  getNotification,
  getUserData,
  getAbsentese,
  getTimeTable,
  getTicketData,
  getClassNotes,
  getResult,
  getFeesData
};
