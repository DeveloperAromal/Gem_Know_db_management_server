const express = require("express");
const getName = require("../supabase/queries"); // Corrected import

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await getName(req, res); // Correctly invoking getName with req and res
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
