const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// მთავარი სატესტო route
app.get("/", (req, res) => {
  res.json({
    message: "Care Georgia API მუშაობს! 🇬🇪",
  });
});

// PostgreSQL connection test
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

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

// Authentication routes
app.use("/api/auth", authRoutes);

// Server
app.listen(PORT, () => {
  console.log(
    `Care Georgia backend მუშაობს: http://localhost:${PORT}`
  );
});