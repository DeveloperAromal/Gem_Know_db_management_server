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

async function getAvatar(req, res) {
  const { email } = req.query;

  try {
    const { data, error } = await supabase
      .from("avatars")
      .select("url, title")
      .eq("email", email);

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

module.exports = { getName, getAvatar };
