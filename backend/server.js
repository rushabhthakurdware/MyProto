const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy users
const users = [
  { username: "student1", password: "1234", role: "student" },
  { username: "teacher1", password: "1234", role: "teacher" },
  { username: "admin1", password: "1234", role: "admin" }
];

// Login route
app.post("/auth/login", (req, res) => {
  const { username, password, role } = req.body;
  console.log("Login attempt:", req.body); // Debug

  // Find user with case-insensitive username and role
  const user = users.find(
    u => u.username.toLowerCase() === username.toLowerCase() &&
         u.password === password &&
         u.role.toLowerCase() === role.toLowerCase()
  );

  if (user) {
    res.json({
      message: "✅ Login successful",
      username: user.username,
      role: user.role
    });
  } else {
    console.log("Invalid credentials"); // Debug
    res.status(401).json({ message: "❌ Invalid credentials" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
