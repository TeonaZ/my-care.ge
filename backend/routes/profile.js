const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// GET MY PROFILE
// ========================================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
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
        created_at
      FROM users
      WHERE id = $1
      `,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "მომხმარებელი ვერ მოიძებნა.",
      });
    }

    const user = result.rows[0];

    return res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone || "",
        accountType: user.account_type,
        service: user.service || "",
        city: user.city || "",
        showPhone: user.show_phone === true,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "პროფილის მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// UPDATE MY PROFILE
// ========================================

router.put("/", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, showPhone } = req.body;

    const cleanFirstName = String(firstName || "").trim();
    const cleanLastName = String(lastName || "").trim();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const cleanPhone = String(phone || "").trim();

    if (!cleanFirstName || !cleanLastName || !normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: "სახელი, გვარი და ელ. ფოსტა აუცილებელია.",
      });
    }

    // შევამოწმოთ Email სხვა მომხმარებელს ხომ არ ეკუთვნის
    const existingEmail = await pool.query(
      `
      SELECT id
      FROM users
      WHERE LOWER(email) = LOWER($1)
        AND id <> $2
      `,
      [normalizedEmail, req.user.userId]
    );

    if (existingEmail.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "ამ ელ. ფოსტას უკვე სხვა ანგარიში იყენებს.",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        show_phone = $5
      WHERE id = $6
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
        created_at
      `,
      [
        cleanFirstName,
        cleanLastName,
        normalizedEmail,
        cleanPhone || null,
        showPhone === true,
        req.user.userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "მომხმარებელი ვერ მოიძებნა.",
      });
    }

    const user = result.rows[0];

    return res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone || "",
        accountType: user.account_type,
        service: user.service || "",
        city: user.city || "",
        showPhone: user.show_phone === true,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "პროფილის განახლება ვერ მოხერხდა.",
    });
  }
});

module.exports = router;