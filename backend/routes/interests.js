const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const normalizeService = (value) => {
  const service = String(value || "").trim().toLowerCase();

  if (service === "dog-walker") {
    return "dogwalker";
  }

  return service;
};

// ========================================
// SEND INTEREST
// POST /api/interests
// Employer -> Specialist
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      jobId,
      specialistId,
      showSenderEmail = false,
      showSenderPhone = false,
    } = req.body;

    if (!jobId || !specialistId) {
      return res.status(400).json({
        success: false,
        message: "ვაკანსია და სპეციალისტი აუცილებელია.",
      });
    }

    const jobResult = await pool.query(
      `
      SELECT
        id,
        owner_id,
        service,
        status
      FROM jobs
      WHERE id = $1
      `,
      [jobId],
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განცხადება ვერ მოიძებნა.",
      });
    }

    const job = jobResult.rows[0];

    if (String(job.owner_id) !== String(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message:
          "ამ განცხადებიდან დაინტერესების გაგზავნის უფლება არ გაქვს.",
      });
    }

    if (job.status !== "active") {
      return res.status(400).json({
        success: false,
        message:
          "დახურული განცხადებიდან დაინტერესებას ვერ გააგზავნი.",
      });
    }

    if (String(specialistId) === String(req.user.userId)) {
      return res.status(400).json({
        success: false,
        message:
          "საკუთარ პროფილზე დაინტერესებას ვერ გააგზავნი.",
      });
    }

    // CHECK SPECIALIST

    const specialistResult = await pool.query(
      `
      SELECT
        id,
        account_type,
        service
      FROM users
      WHERE id = $1
      `,
      [specialistId],
    );

    if (specialistResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "სპეციალისტი ვერ მოიძებნა.",
      });
    }

    const specialist = specialistResult.rows[0];

    if (specialist.account_type !== "provider") {
      return res.status(400).json({
        success: false,
        message:
          "არჩეული მომხმარებელი სპეციალისტი არ არის.",
      });
    }

    if (
      normalizeService(specialist.service) &&
      normalizeService(job.service) !==
        normalizeService(specialist.service)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "ეს ვაკანსია სპეციალისტის სერვისს არ ემთხვევა.",
      });
    }

    // CHECK SENDER CONTACT DATA

    const senderResult = await pool.query(
      `
      SELECT email, phone
      FROM users
      WHERE id = $1
      `,
      [req.user.userId],
    );

    const sender = senderResult.rows[0];

    const safeShowSenderEmail =
      showSenderEmail === true && Boolean(sender?.email);

    const safeShowSenderPhone =
      showSenderPhone === true && Boolean(sender?.phone);

    // Prevent duplicate interest:
    // same sender + same specialist + same service

    const existingResult = await pool.query(
      `
      SELECT i.id
      FROM interests i

      JOIN jobs j
        ON j.id = i.job_id

      WHERE i.sender_id = $1
        AND i.specialist_id = $2
        AND (
          LOWER(j.service) = LOWER($3)
          OR (
            LOWER(j.service) IN ('dogwalker', 'dog-walker')
            AND LOWER($3) IN ('dogwalker', 'dog-walker')
          )
        )

      LIMIT 1
      `,
      [
        req.user.userId,
        specialistId,
        job.service,
      ],
    );

    if (existingResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "ამ სპეციალისტთან ამ სერვისზე დაინტერესება უკვე გაგზავნილი გაქვს.",
      });
    }

    // CREATE

    const interestId = crypto.randomUUID();

    const result = await pool.query(
      `
      INSERT INTO interests (
        id,
        job_id,
        sender_id,
        specialist_id,
        status,
        show_sender_email,
        show_sender_phone,
        is_seen
      )
      VALUES ($1, $2, $3, $4, 'sent', $5, $6, FALSE)

      RETURNING
        id,
        job_id,
        sender_id,
        specialist_id,
        status,
        show_sender_email,
        show_sender_phone,
        is_seen,
        created_at,
        updated_at
      `,
      [
        interestId,
        jobId,
        req.user.userId,
        specialistId,
        safeShowSenderEmail,
        safeShowSenderPhone,
      ],
    );

    const interest = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "დაინტერესება წარმატებით გაიგზავნა.",

      interest: {
        id: interest.id,
        jobId: interest.job_id,
        senderId: interest.sender_id,
        specialistId: interest.specialist_id,
        status: interest.status,
        showSenderEmail: interest.show_sender_email,
        showSenderPhone: interest.show_sender_phone,
        isSeen: interest.is_seen,
        createdAt: interest.created_at,
        updatedAt: interest.updated_at,

        job: {
          id: job.id,
          service: job.service,
        },
      },
    });
  } catch (error) {
    console.error("CREATE INTEREST ERROR:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "დაინტერესება უკვე გაგზავნილი გაქვს.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "დაინტერესების გაგზავნა ვერ მოხერხდა.",
    });
  }
});

// ========================================
// SENT INTERESTS
// GET /api/interests/sent
// ========================================

router.get("/sent", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        i.id,
        i.job_id,
        i.sender_id,
        i.specialist_id,
        i.status,
        i.show_sender_email,
        i.show_sender_phone,
        i.is_seen,
        i.created_at,
        i.updated_at,

        j.service,
        j.city,
        j.employment_type,
        j.payment_type,
        j.budget,
        j.description,
        j.status AS job_status,

        u.first_name AS specialist_first_name,
        u.last_name AS specialist_last_name,
        u.email AS specialist_email,
        u.phone AS specialist_phone,

        sp.show_email AS specialist_show_email,
        sp.show_phone AS specialist_show_phone

      FROM interests i

      JOIN jobs j
        ON j.id = i.job_id

      JOIN users u
        ON u.id = i.specialist_id

      JOIN specialist_profiles sp
        ON sp.owner_id = i.specialist_id

      WHERE i.sender_id = $1

      ORDER BY i.created_at DESC
      `,
      [req.user.userId],
    );

    const interests = result.rows.map((row) => ({
      id: row.id,
      jobId: row.job_id,
      senderId: row.sender_id,
      specialistId: row.specialist_id,
      status: row.status,
      isSeen: row.is_seen,

      showSenderEmail: row.show_sender_email,
      showSenderPhone: row.show_sender_phone,

      createdAt: row.created_at,
      updatedAt: row.updated_at,

      specialist: {
        id: row.specialist_id,
        firstName: row.specialist_first_name,
        lastName: row.specialist_last_name,

        email:
          row.specialist_show_email === true
            ? row.specialist_email
            : null,

        phone:
          row.specialist_show_phone === true
            ? row.specialist_phone
            : null,

        showEmail: row.specialist_show_email === true,
        showPhone: row.specialist_show_phone === true,
      },

      job: {
        id: row.job_id,
        service: row.service,
        city: row.city,
        employmentType: row.employment_type,
        paymentType: row.payment_type,
        budget: Number(row.budget),
        description: row.description,
        status: row.job_status,
      },
    }));

    return res.json({
      success: true,
      interests,
    });
  } catch (error) {
    console.error("GET SENT INTERESTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "დაინტერესებების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// RECEIVED INTERESTS
// GET /api/interests/received
// ========================================

router.get(
  "/received",
  authMiddleware,
  async (req, res) => {
    try {
      const result = await pool.query(
        `
        SELECT
          i.id,
          i.job_id,
          i.sender_id,
          i.specialist_id,
          i.status,
          i.show_sender_email,
          i.show_sender_phone,
          i.is_seen,
          i.created_at,
          i.updated_at,

          j.service,
          j.city,
          j.employment_type,
          j.payment_type,
          j.budget,
          j.description,
          j.status AS job_status,

          u.first_name AS sender_first_name,
          u.last_name AS sender_last_name,
          u.email AS sender_email,
          u.phone AS sender_phone

        FROM interests i

        JOIN jobs j
          ON j.id = i.job_id

        JOIN users u
          ON u.id = i.sender_id

        WHERE i.specialist_id = $1

        ORDER BY i.created_at DESC
        `,
        [req.user.userId],
      );

      const interests = result.rows.map((row) => ({
        id: row.id,
        jobId: row.job_id,
        senderId: row.sender_id,
        specialistId: row.specialist_id,
        status: row.status,
        isSeen: row.is_seen,
        createdAt: row.created_at,
        updatedAt: row.updated_at,

        employer: {
          id: row.sender_id,
          firstName: row.sender_first_name,
          lastName: row.sender_last_name,

          email:
            row.show_sender_email === true
              ? row.sender_email
              : null,

          phone:
            row.show_sender_phone === true
              ? row.sender_phone
              : null,

          showEmail: row.show_sender_email === true,
          showPhone: row.show_sender_phone === true,
        },

        job: {
          id: row.job_id,
          service: row.service,
          city: row.city,
          employmentType: row.employment_type,
          paymentType: row.payment_type,
          budget: Number(row.budget),
          description: row.description,
          status: row.job_status,
        },
      }));

      return res.json({
        success: true,
        interests,
      });
    } catch (error) {
      console.error(
        "GET RECEIVED INTERESTS ERROR:",
        error,
      );

      return res.status(500).json({
        success: false,
        message:
          "მიღებული დაინტერესებების მიღება ვერ მოხერხდა.",
      });
    }
  },
);

// ========================================
// MARK RECEIVED INTERESTS AS SEEN
// PATCH /api/interests/received/seen
// ========================================

router.patch(
  "/received/seen",
  authMiddleware,
  async (req, res) => {
    try {
      const result = await pool.query(
        `
        UPDATE interests

        SET
          is_seen = TRUE,
          updated_at = CURRENT_TIMESTAMP

        WHERE specialist_id = $1
          AND is_seen = FALSE

        RETURNING id
        `,
        [req.user.userId],
      );

      return res.json({
        success: true,
        markedCount: result.rowCount,
      });
    } catch (error) {
      console.error(
        "MARK INTERESTS AS SEEN ERROR:",
        error,
      );

      return res.status(500).json({
        success: false,
        message:
          "შეტყობინებების ნანახად მონიშვნა ვერ მოხერხდა.",
      });
    }
  },
);

// ========================================
// UPDATE STATUS
// PATCH /api/interests/:id/status
// ========================================

router.patch(
  "/:id/status",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatuses = [
        "accepted",
        "declined",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "სტატუსი არასწორია.",
        });
      }

      const result = await pool.query(
        `
        UPDATE interests

        SET
          status = $1,
          is_seen = TRUE,
          updated_at = CURRENT_TIMESTAMP

        WHERE id = $2
          AND specialist_id = $3

        RETURNING
          id,
          job_id,
          sender_id,
          specialist_id,
          status,
          is_seen,
          created_at,
          updated_at
        `,
        [
          status,
          id,
          req.user.userId,
        ],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "დაინტერესება ვერ მოიძებნა ან მისი შეცვლის უფლება არ გაქვს.",
        });
      }

      const interest = result.rows[0];

      return res.json({
        success: true,

        message:
          status === "accepted"
            ? "დაინტერესება მიღებულია."
            : "დაინტერესება უარყოფილია.",

        interest: {
          id: interest.id,
          jobId: interest.job_id,
          senderId: interest.sender_id,
          specialistId: interest.specialist_id,
          status: interest.status,
          isSeen: interest.is_seen,
          createdAt: interest.created_at,
          updatedAt: interest.updated_at,
        },
      });
    } catch (error) {
      console.error(
        "UPDATE INTEREST ERROR:",
        error,
      );

      return res.status(500).json({
        success: false,
        message:
          "დაინტერესების სტატუსის შეცვლა ვერ მოხერხდა.",
      });
    }
  },
);

module.exports = router;