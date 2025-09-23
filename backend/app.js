const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/auth/login", (req, res) => {
  const { username, password, role } = req.body;
  if (username === "student1" && password === "1234" && role === "student") {
    res.json({ message: "✅ Login successful" });
  } else {
    res.status(401).json({ message: "❌ Invalid credentials" });
  }
});

module.exports = app;
