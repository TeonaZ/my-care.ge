const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const jobsRoutes = require("./routes/jobs");
const applicationsRoutes = require("./routes/applications");
const interestsRoutes = require("./routes/interests");
const specialistsRoutes = require("./routes/specialists");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/specialists", specialistsRoutes);

// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "Care Georgia API მუშაობს! 🇬🇪",
  });
});

// ========================================
// DATABASE TEST
// ========================================

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.json({
      success: true,
      message: "PostgreSQL დაკავშირებულია!",
      databaseTime: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ========================================
// ROUTES
// ========================================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/interests", interestsRoutes);

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`Care Georgia backend მუშაობს: http://localhost:${PORT}`);
});
