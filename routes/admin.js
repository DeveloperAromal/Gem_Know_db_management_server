const express = require("express");
const { insertNotifications, insertAbsentese, insertFees } = require("../supabase/adminQuery");
const {insertFeesData} = require ("../controls/admin-controls.js")

const router = express.Router();

router.post("/push-notification", async (req, res) => {
    try {
      const { message, title, className, div } = req.body;
  
      if (!message || !title || !className || !div) {
        return res.status(400).json({ error: "All fields are required." });
      }
      await insertNotifications({ message, title, className, div }, res);
    } catch (error) {
      console.error("Error in /push-notification route:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  router.post("/push-absentese", async (req, res) => {
    try {
      const { monthData, admNo } = req.body;
  
      if (!monthData || !admNo) {
        return res.status(400).json({ error: "All fields are required." });
      }
      await insertAbsentese({ monthData, admNo }, res);
    } catch (error) {
      console.error("Error in /push-absentes route:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
  router.post("/push-feesdata", async (req, res) => {
    try {
      const { feesData, admNo } = req.body;
  
      if (!feesData || !admNo) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const result = await insertFeesData({ feesData, admNo });
  
      if (result.error) {
        return res.status(500).json({ error: result.error });
      }
  
      res.status(200).json({ message: "Fees data successfully inserted", data: result.data });
    } catch (error) {
      console.error("Error in /push-feesdata route:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
router.get("/studentdata", async (req, res) => {
    const { className, div } = req.query;
  
    if (!className || !div) {
      return res.status(400).json({ error: "parameters are required" });
    }
  
    await getStudent(req, res);
  });

  router.get("/fees-paid-this-month", async (req, res) => {
    const { className, div } = req.query;
  
    if (!className || !div) {
      return res.status(400).json({ error: "parameters are required" });
    }
  
    await getPaidStudentsThisMonth(req, res);
  });
  
module.exports = router;
