const { insertNotifications, getStudentData, insertAbsentese, insertFees, getPaidStudentsThisMonth } = require("../supabase/adminQuery");

const insertNotification = async (notificationData, res) => {
  try {
    if (!notificationData.message || !notificationData.title || !notificationData.className || !notificationData.div) {
      return res.status(400).json({ error: "Missing required fields: message, title, className, div" });
    }
    console.log("Notification Data:", notificationData);
    const result = await insertNotifications(notificationData);
    if (!result.data || result.data.length === 0) {
      return res.status(404).json({ error: "No notifications inserted." });
    }
    res.status(200).json({ status: "success", data: result.data });
  } catch (error) {
    console.error("Error in insertNotification:", error);
    res.status(500).json({ error: "Failed to insert notification." });
  }
};

const insertAbsentData = async (absenteseData, res) => {
  try {
    if (!absenteseData.monthData || !absenteseData.admNo) {
      return res.status(400).json({ error: "Missing required fields: monthData, admNo" });
    }
    console.log("absent Data:", absenteseData);
    const result = await insertAbsentese(absenteseData);
    if (!result.data || result.data.length === 0) {
      return res.status(404).json({ error: "No notifications inserted." });
    }
    res.status(200).json({ status: "success", data: result.data });
  } catch (error) {
    console.error("Error in insertNotification:", error);
    res.status(500).json({ error: "Failed to insert notification." });
  }
};

const insertFeesData = async (fees) => {
  try {
    console.log("Processing fees data:", fees);

    const result = await insertFees(fees);

    if (result.error) {
      console.error("Error in insertFees:", result.error);
      return { error: result.error };
    }

    console.log("Insert success:", result.data);
    return { status: "success", data: result.data };
  } catch (error) {
    console.error("Unexpected error in insertFeesData:", error);
    return { error: "Failed to insert fees data." };
  }
};



const getStudents = async (req, res) => {
  try {
    await getStudentData(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentsPaidDetails = async (req, res) => {
  try {
    await getPaidStudentsThisMonth(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  insertNotification,
  getStudents,
  insertAbsentData,
  insertFeesData,
  getStudentsPaidDetails,
};
