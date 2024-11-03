const supabase = require("./db-connection");

async function getName(req, res) {
  const { email } = req.query;
  const { data, error } = await supabase
    .from("users")
    .select("name, date_of_birth")
    .eq("email", email);

  if (error) {
    res.status(500).json({ error: "Failed to fetch data" });
    throw error; // You might not need to throw here if you're handling the error already
  }
  res.json(data);
}

module.exports = getName;
