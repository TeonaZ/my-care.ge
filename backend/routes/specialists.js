const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const normalizeProfession = (value) => {
  const profession = String(value || "").trim().toLowerCase();

  if (profession === "dogwalker") {
    return "dog-walker";
  }

  return profession;
};

const allowedProfessions = [
  "nanny",
  "caregiver",
  "driver",
  "tutor",
  "housekeeper",
  "dog-walker",
];

const mapProfile = (row, includeContacts = false) => ({
  id: row.id,
  ownerId: row.owner_id,
  profession: row.profession,

  firstName: row.first_name,
  lastName: row.last_name,

  city: row.city,
  experience: row.experience,
  employmentType: row.employment_type,
  paymentType: row.payment_type,
  priceValue: Number(row.price_value || 0),

  description: row.description || "",
  ageGroupsText: row.age_groups_text || "",

  showEmail: row.show_email === true,
  showPhone: row.show_phone === true,

  // პირადი მონაცემები საჯარო პროფილების სიაში არ ბრუნდება.
  email:
    includeContacts && row.show_email === true
      ? row.email
      : null,

  phone:
    includeContacts && row.show_phone === true
      ? row.phone
      : null,

  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// ========================================
// PUBLIC SPECIALIST LIST
// GET /api/specialists
//
// Email/phone intentionally excluded.
// ========================================

router.get("/", async (req, res) => {
  try {
    const profession = req.query.profession
      ? normalizeProfession(req.query.profession)
      : null;

    const values = [];
    let professionFilter = "";

    if (profession) {
      if (!allowedProfessions.includes(profession)) {
        return res.status(400).json({
          success: false,
          message: "პროფესია არასწორია.",
        });
      }

      values.push(profession);
      professionFilter = `AND sp.profession = $${values.length}`;
    }

    const result = await pool.query(
      `
      SELECT
        sp.*,
        u.first_name,
        u.last_name

      FROM specialist_profiles sp

      JOIN users u
        ON u.id = sp.owner_id

      WHERE sp.status = 'active'
        ${professionFilter}

      ORDER BY sp.created_at DESC
      `,
      values,
    );

    return res.json({
      success: true,
      specialists: result.rows.map((row) =>
        mapProfile(row, false),
      ),
    });
  } catch (error) {
    console.error("GET SPECIALISTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "სპეციალისტების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// MY SPECIALIST PROFILE
// GET /api/specialists/me
// ========================================

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        sp.*,
        u.first_name,
        u.last_name,
        u.email,
        u.phone

      FROM specialist_profiles sp

      JOIN users u
        ON u.id = sp.owner_id

      WHERE sp.owner_id = $1

      LIMIT 1
      `,
      [req.user.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "სპეციალისტის პროფილი ვერ მოიძებნა.",
      });
    }

    const row = result.rows[0];

    return res.json({
      success: true,

      profile: {
        ...mapProfile(row, true),

        // საკუთარ პროფილზე მომხმარებელი ყოველთვის ხედავს
        // საკუთარ საკონტაქტო ინფორმაციას.
        email: row.email,
        phone: row.phone,
      },
    });
  } catch (error) {
    console.error("GET MY SPECIALIST PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "პროფილის მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// PUBLIC SINGLE SPECIALIST
// GET /api/specialists/:id
//
// Contact data is NOT returned here.
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        sp.*,
        u.first_name,
        u.last_name

      FROM specialist_profiles sp

      JOIN users u
        ON u.id = sp.owner_id

      WHERE sp.id = $1
        AND sp.status = 'active'

      LIMIT 1
      `,
      [req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "სპეციალისტი ვერ მოიძებნა.",
      });
    }

    return res.json({
      success: true,
      specialist: mapProfile(result.rows[0], false),
    });
  } catch (error) {
    console.error("GET SPECIALIST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "სპეციალისტის მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// CREATE SPECIALIST PROFILE
// POST /api/specialists
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.accountType !== "provider") {
      return res.status(403).json({
        success: false,
        message:
          "სპეციალისტის პროფილის შექმნა შეუძლია მხოლოდ სამუშაოს მაძიებელს.",
      });
    }

    const {
      profession,
      city,
      experience = "",
      employmentType = "",
      paymentType = "hourly",
      priceValue = 0,
      description = "",
      ageGroupsText = "",
      showEmail = false,
      showPhone = false,
    } = req.body;

    const normalizedProfession =
      normalizeProfession(profession);

    if (!allowedProfessions.includes(normalizedProfession)) {
      return res.status(400).json({
        success: false,
        message: "აირჩიეთ სწორი პროფესია.",
      });
    }

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "ქალაქი აუცილებელია.",
      });
    }

    const userResult = await pool.query(
      `
      SELECT
        id,
        email,
        phone
      FROM users
      WHERE id = $1
      `,
      [req.user.userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "მომხმარებელი ვერ მოიძებნა.",
      });
    }

    const user = userResult.rows[0];

    const safeShowEmail =
      showEmail === true && Boolean(user.email);

    const safeShowPhone =
      showPhone === true && Boolean(user.phone);

    const existingResult = await pool.query(
      `
      SELECT id
      FROM specialist_profiles
      WHERE owner_id = $1
      LIMIT 1
      `,
      [req.user.userId],
    );

    if (existingResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "თქვენ უკვე გაქვთ სპეციალისტის პროფილი.",
      });
    }

    const id = crypto.randomUUID();

    const result = await pool.query(
      `
      INSERT INTO specialist_profiles (
        id,
        owner_id,
        profession,
        city,
        experience,
        employment_type,
        payment_type,
        price_value,
        description,
        age_groups_text,
        show_email,
        show_phone,
        status
      )

      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, 'active'
      )

      RETURNING *
      `,
      [
        id,
        req.user.userId,
        normalizedProfession,
        city,
        experience,
        employmentType,
        paymentType,
        Number(priceValue) || 0,
        description,
        ageGroupsText,
        safeShowEmail,
        safeShowPhone,
      ],
    );

    const profileResult = await pool.query(
      `
      SELECT
        sp.*,
        u.first_name,
        u.last_name,
        u.email,
        u.phone

      FROM specialist_profiles sp

      JOIN users u
        ON u.id = sp.owner_id

      WHERE sp.id = $1
      `,
      [result.rows[0].id],
    );

    const row = profileResult.rows[0];

    return res.status(201).json({
      success: true,
      message: "სპეციალისტის პროფილი შეიქმნა.",

      profile: {
        ...mapProfile(row, true),
        email: row.email,
        phone: row.phone,
      },
    });
  } catch (error) {
    console.error("CREATE SPECIALIST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "სპეციალისტის პროფილის შექმნა ვერ მოხერხდა.",
    });
  }
});

// ========================================
// UPDATE MY SPECIALIST PROFILE
// PUT /api/specialists/me
// ========================================

router.put("/me", authMiddleware, async (req, res) => {
  try {
    const {
      profession,
      city,
      experience = "",
      employmentType = "",
      paymentType = "hourly",
      priceValue = 0,
      description = "",
      ageGroupsText = "",
      showEmail = false,
      showPhone = false,
    } = req.body;

    const normalizedProfession =
      normalizeProfession(profession);

    if (!allowedProfessions.includes(normalizedProfession)) {
      return res.status(400).json({
        success: false,
        message: "აირჩიეთ სწორი პროფესია.",
      });
    }

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "ქალაქი აუცილებელია.",
      });
    }

    const userResult = await pool.query(
      `
      SELECT email, phone
      FROM users
      WHERE id = $1
      `,
      [req.user.userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "მომხმარებელი ვერ მოიძებნა.",
      });
    }

    const user = userResult.rows[0];

    const safeShowEmail =
      showEmail === true && Boolean(user.email);

    const safeShowPhone =
      showPhone === true && Boolean(user.phone);

    const result = await pool.query(
      `
      UPDATE specialist_profiles

      SET
        profession = $1,
        city = $2,
        experience = $3,
        employment_type = $4,
        payment_type = $5,
        price_value = $6,
        description = $7,
        age_groups_text = $8,
        show_email = $9,
        show_phone = $10,
        updated_at = CURRENT_TIMESTAMP

      WHERE owner_id = $11

      RETURNING *
      `,
      [
        normalizedProfession,
        city,
        experience,
        employmentType,
        paymentType,
        Number(priceValue) || 0,
        description,
        ageGroupsText,
        safeShowEmail,
        safeShowPhone,
        req.user.userId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "სპეციალისტის პროფილი ვერ მოიძებნა.",
      });
    }

    const profileResult = await pool.query(
      `
      SELECT
        sp.*,
        u.first_name,
        u.last_name,
        u.email,
        u.phone

      FROM specialist_profiles sp

      JOIN users u
        ON u.id = sp.owner_id

      WHERE sp.owner_id = $1
      `,
      [req.user.userId],
    );

    const row = profileResult.rows[0];

    return res.json({
      success: true,
      message: "სპეციალისტის პროფილი განახლდა.",

      profile: {
        ...mapProfile(row, true),
        email: row.email,
        phone: row.phone,
      },
    });
  } catch (error) {
    console.error("UPDATE SPECIALIST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "სპეციალისტის პროფილის განახლება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// CLOSE MY SPECIALIST PROFILE
// PATCH /api/specialists/me/close
// ========================================

router.patch(
  "/me/close",
  authMiddleware,
  async (req, res) => {
    try {
      const result = await pool.query(
        `
        UPDATE specialist_profiles

        SET
          status = 'inactive',
          updated_at = CURRENT_TIMESTAMP

        WHERE owner_id = $1

        RETURNING id
        `,
        [req.user.userId],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "სპეციალისტის პროფილი ვერ მოიძებნა.",
        });
      }

      return res.json({
        success: true,
        message: "სპეციალისტის პროფილი დაიხურა.",
      });
    } catch (error) {
      console.error("CLOSE SPECIALIST ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "პროფილის დახურვა ვერ მოხერხდა.",
      });
    }
  },
);

// ==========================================
// ACTIVATE MY SPECIALIST PROFILE
// ==========================================

router.patch("/me/activate", authMiddleware, async (req, res) => {
  try {
    if (req.user.accountType !== "provider") {
      return res.status(403).json({
        message: "Only providers can activate specialist profiles.",
      });
    }

    const result = await pool.query(
      `
        UPDATE specialist_profiles
        SET
          status = 'active',
          updated_at = CURRENT_TIMESTAMP
        WHERE owner_id = $1
        RETURNING *
      `,
      [req.user.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Specialist profile not found.",
      });
    }

    return res.json({
      message: "Specialist profile activated successfully.",
      profile: result.rows[0],
    });
  } catch (error) {
    console.error("Activate specialist profile error:", error);

    return res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;