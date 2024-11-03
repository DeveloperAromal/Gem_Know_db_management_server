const express = require("express");
const cors = require('cors')
require("dotenv").config();
const app = express();
app.use(cors())
const port = 5000;

app.use(express.json());
const studentsRoute = require("./routes/students");
app.use("/students", studentsRoute);

app.listen(port, () => {
  console.log(`\n ✓ server is running on port ${port}`);
  console.log(` ✓ Follow this link: http://localhost:${port}`);
});
