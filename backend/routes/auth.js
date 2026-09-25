const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../db");

const router = express.Router();

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      accountType,
      service,
      city,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !accountType ||
      !service ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "ყველა აუცილებელი ველი შეავსე.",
      });
    }

    if (!["client", "provider"].includes(accountType)) {
      return res.status(400).json({
        success: false,
        message: "ანგარიშის ტიპი არასწორია.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "ამ ელ. ფოსტით მომხმარებელი უკვე რეგისტრირებულია.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = crypto.randomUUID();

    const result = await pool.query(
      `INSERT INTO users (
        id,
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        account_type,
        service,
        city,
        show_phone
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING
        id,
        first_name,
        last_name,
        email,
        phone,
        account_type,
        service,
        city,
        show_phone,
        subscription_status,
        created_at`,
      [
        userId,
        firstName.trim(),
        lastName.trim(),
        normalizedEmail,
        phone?.trim() || null,
        passwordHash,
        accountType,
        service,
        city,
        false,
      ]
    );

    const user = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "რეგისტრაცია წარმატებით დასრულდა.",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        accountType: user.account_type,
        service: user.service,
        city: user.city,
        showPhone: user.show_phone,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "რეგისტრაციისას მოხდა შეცდომა.",
    });
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("\n========== LOGIN REQUEST ==========");
    console.log("Email received:", email);
    console.log(
      "Password length:",
      typeof password === "string" ? password.length : "not a string"
    );

    if (!email || !password) {
      console.log("RESULT: Email or password missing");
      console.log("===================================\n");

      return res.status(400).json({
        success: false,
        message: "ელ. ფოსტა და პაროლი აუცილებელია.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log("Normalized email:", normalizedEmail);

    const result = await pool.query(
      `SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        account_type,
        service,
        city,
        show_phone,
        subscription_status,
        created_at
      FROM users
      WHERE email = $1`,
      [normalizedEmail]
    );

    console.log("Users found:", result.rows.length);

    if (result.rows.length === 0) {
      console.log("RESULT: USER NOT FOUND");
      console.log("===================================\n");

      return res.status(401).json({
        success: false,
        message: "ელ. ფოსტა ან პაროლი არასწორია.",
      });
    }

    const user = result.rows[0];

    console.log("Database email:", user.email);

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log("Password matches:", passwordMatches);

    if (!passwordMatches) {
      console.log("RESULT: PASSWORD DOES NOT MATCH");
      console.log("===================================\n");

      return res.status(401).json({
        success: false,
        message: "ელ. ფოსტა ან პაროლი არასწორია.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        accountType: user.account_type,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("RESULT: LOGIN SUCCESS");
    console.log("===================================\n");

    return res.json({
      success: true,
      message: "ავტორიზაცია წარმატებულია.",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        accountType: user.account_type,
        service: user.service,
        city: user.city,
        showPhone: user.show_phone,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "ავტორიზაციისას მოხდა შეცდომა.",
    });
  }
});

module.exports = router;