const getName = require("../supabase/queries");

const getStudentName = async (req, res) => {
  try {
    await getName(req, res); // Correctly invoking getName
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getStudentName;
