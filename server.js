const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from your frontend (Live Server runs on port 5500 usually)
app.use(cors());
app.use(express.json());

// Handle preflight requests (important for POST)
app.options("/track", cors());

app.post("/track", (req, res) => {
  console.log("📩 Event received:", req.body);
  res.status(200).json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
