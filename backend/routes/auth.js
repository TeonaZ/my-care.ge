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

    // Email უკვე გამოყენებულია?
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

    // პაროლის უსაფრთხო hash
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
    console.error("Register error:", error);

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

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ელ. ფოსტა და პაროლი აუცილებელია.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

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

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "ელ. ფოსტა ან პაროლი არასწორია.",
      });
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "ელ. ფოსტა ან პაროლი არასწორია.",
      });
    }

    // JWT token - მოქმედებს 7 დღე
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
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "ავტორიზაციისას მოხდა შეცდომა.",
    });
  }
});

module.exports = router;