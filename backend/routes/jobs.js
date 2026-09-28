const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// CREATE JOB
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      service,
      city,
      employmentType,
      paymentType,
      budget,
      description,
      showEmployerEmail,
      showEmployerPhone,
    } = req.body;

    if (
      !service ||
      !city ||
      !employmentType ||
      !paymentType ||
      !budget ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "ყველა აუცილებელი ველი შეავსე.",
      });
    }

    const numericBudget = Number(budget);

    if (!Number.isFinite(numericBudget) || numericBudget <= 0) {
      return res.status(400).json({
        success: false,
        message: "ანაზღაურება არასწორია.",
      });
    }

    const userResult = await pool.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        account_type
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

    const canShareEmail = showEmployerEmail === true && Boolean(user.email);

    const canSharePhone = showEmployerPhone === true && Boolean(user.phone);

    const jobId = crypto.randomUUID();

    const result = await pool.query(
      `
      INSERT INTO jobs (
        id,
        owner_id,
        service,
        city,
        employment_type,
        payment_type,
        budget,
        description,
        show_employer_email,
        show_employer_phone,
        status
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, 'active'
      )
      RETURNING *
      `,
      [
        jobId,
        req.user.userId,
        service,
        city,
        employmentType,
        paymentType,
        numericBudget,
        description.trim(),
        canShareEmail,
        canSharePhone,
      ],
    );

    const job = result.rows[0];

    return res.status(201).json({
      success: true,
      job: {
        id: job.id,
        ownerId: job.owner_id,
        service: job.service,
        city: job.city,
        employmentType: job.employment_type,
        paymentType: job.payment_type,
        budget: Number(job.budget),
        description: job.description,

        employerName: `${user.first_name || ""} ${user.last_name || ""}`.trim(),

        showEmployerEmail: job.show_employer_email,
        showEmployerPhone: job.show_employer_phone,

        employerEmail: job.show_employer_email ? user.email || "" : "",

        employerPhone: job.show_employer_phone ? user.phone || "" : "",

        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      },
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: "განცხადების გამოქვეყნება ვერ მოხერხდა.",
    });
  }
});
// ========================================
// GET MY JOBS
// ========================================

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        owner_id,
        service,
        city,
        employment_type,
        payment_type,
        budget,
        description,
        show_employer_email,
        show_employer_phone,
        status,
        created_at,
        updated_at
      FROM jobs
      WHERE owner_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.userId],
    );

    const jobs = result.rows.map((job) => ({
      id: job.id,
      ownerId: job.owner_id,

      service: job.service,
      city: job.city,

      employmentType: job.employment_type,
      paymentType: job.payment_type,

      budget: Number(job.budget),
      description: job.description,

      showEmployerEmail: job.show_employer_email,
      showEmployerPhone: job.show_employer_phone,

      status: job.status,

      createdAt: job.created_at,
      updatedAt: job.updated_at,
    }));

    return res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Get my jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "ჩემი განცხადებების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// GET ALL ACTIVE JOBS
// ========================================

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        jobs.id,
        jobs.owner_id,
        jobs.service,
        jobs.city,
        jobs.employment_type,
        jobs.payment_type,
        jobs.budget,
        jobs.description,
        jobs.show_employer_email,
        jobs.show_employer_phone,
        jobs.status,
        jobs.created_at,
        jobs.updated_at,
        users.first_name,
        users.last_name
      FROM jobs
      JOIN users
        ON users.id = jobs.owner_id
      WHERE jobs.status = 'active'
      ORDER BY jobs.created_at DESC
    `);

    const jobs = result.rows.map((job) => ({
      id: job.id,
      ownerId: job.owner_id,

      service: job.service,
      city: job.city,
      employmentType: job.employment_type,
      paymentType: job.payment_type,

      budget: Number(job.budget),
      description: job.description,

      employerName: `${job.first_name || ""} ${job.last_name || ""}`.trim(),

      showEmployerEmail: job.show_employer_email,
      showEmployerPhone: job.show_employer_phone,

      // პირადი კონტაქტები საჯარო მოთხოვნაში არ იგზავნება
      employerEmail: "",
      employerPhone: "",

      status: job.status,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
    }));

    return res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "განცხადებების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// CHANGE JOB STATUS
// ========================================

router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // მხოლოდ ეს ორი სტატუსია ნებადართული
    if (!["active", "closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "განცხადების სტატუსი არასწორია.",
      });
    }

    const result = await pool.query(
      `
      UPDATE jobs
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND owner_id = $3
      RETURNING
        id,
        owner_id,
        service,
        city,
        employment_type,
        payment_type,
        budget,
        description,
        show_employer_email,
        show_employer_phone,
        status,
        created_at,
        updated_at
      `,
      [status, id, req.user.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განცხადება ვერ მოიძებნა.",
      });
    }

    const job = result.rows[0];

    return res.json({
      success: true,
      message: "განცხადების სტატუსი განახლდა.",

      job: {
        id: job.id,
        ownerId: job.owner_id,
        service: job.service,
        city: job.city,
        employmentType: job.employment_type,
        paymentType: job.payment_type,
        budget: Number(job.budget),
        description: job.description,
        showEmployerEmail: job.show_employer_email,
        showEmployerPhone: job.show_employer_phone,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      },
    });
  } catch (error) {
    console.error("Change job status error:", error);

    return res.status(500).json({
      success: false,
      message: "განცხადების სტატუსის შეცვლა ვერ მოხერხდა.",
    });
  }
});

// ========================================
// DELETE MY JOB
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM jobs
      WHERE id = $1
        AND owner_id = $2
      RETURNING id
      `,
      [id, req.user.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განცხადება ვერ მოიძებნა.",
      });
    }

    return res.json({
      success: true,
      message: "განცხადება წარმატებით წაიშალა.",
      jobId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Delete job error:", error);

    return res.status(500).json({
      success: false,
      message: "განცხადების წაშლა ვერ მოხერხდა.",
    });
  }
});

// ========================================
// GET ONE OF MY JOBS
// ========================================

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        owner_id,
        service,
        city,
        employment_type,
        payment_type,
        budget,
        description,
        show_employer_email,
        show_employer_phone,
        status,
        created_at,
        updated_at
      FROM jobs
      WHERE id = $1
        AND owner_id = $2
      `,
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განცხადება ვერ მოიძებნა.",
      });
    }

    const job = result.rows[0];

    return res.json({
      success: true,
      job: {
        id: job.id,
        ownerId: job.owner_id,
        service: job.service,
        city: job.city,
        employmentType: job.employment_type,
        paymentType: job.payment_type,
        budget: Number(job.budget),
        description: job.description,
        showEmployerEmail: job.show_employer_email,
        showEmployerPhone: job.show_employer_phone,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      },
    });
  } catch (error) {
    console.error("GET ONE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "განცხადების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// UPDATE MY JOB
// ========================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      service,
      city,
      employmentType,
      paymentType,
      budget,
      description,
      showEmployerEmail,
      showEmployerPhone,
    } = req.body;

    if (
      !service ||
      !city ||
      !employmentType ||
      !paymentType ||
      !budget ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "ყველა აუცილებელი ველი შეავსე.",
      });
    }

    const numericBudget = Number(budget);

    if (
      !Number.isFinite(numericBudget) ||
      numericBudget <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "ანაზღაურება არასწორია.",
      });
    }

    // მიმდინარე მომხმარებლის მონაცემები
    const userResult = await pool.query(
      `
      SELECT email, phone
      FROM users
      WHERE id = $1
      `,
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "მომხმარებელი ვერ მოიძებნა.",
      });
    }

    const user = userResult.rows[0];

    const canShareEmail =
      showEmployerEmail === true &&
      Boolean(user.email);

    const canSharePhone =
      showEmployerPhone === true &&
      Boolean(user.phone);

    // განცხადების განახლება
    const result = await pool.query(
      `
      UPDATE jobs
      SET
        service = $1,
        city = $2,
        employment_type = $3,
        payment_type = $4,
        budget = $5,
        description = $6,
        show_employer_email = $7,
        show_employer_phone = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
        AND owner_id = $10
      RETURNING
        id,
        owner_id,
        service,
        city,
        employment_type,
        payment_type,
        budget,
        description,
        show_employer_email,
        show_employer_phone,
        status,
        created_at,
        updated_at
      `,
      [
        service,
        city,
        employmentType,
        paymentType,
        numericBudget,
        description.trim(),
        canShareEmail,
        canSharePhone,
        id,
        req.user.userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განცხადება ვერ მოიძებნა.",
      });
    }

    const job = result.rows[0];

    return res.json({
      success: true,
      message: "განცხადება წარმატებით განახლდა.",

      job: {
        id: job.id,
        ownerId: job.owner_id,
        service: job.service,
        city: job.city,
        employmentType: job.employment_type,
        paymentType: job.payment_type,
        budget: Number(job.budget),
        description: job.description,
        showEmployerEmail: job.show_employer_email,
        showEmployerPhone: job.show_employer_phone,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      },
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "განცხადების განახლება ვერ მოხერხდა.",
    });
  }
});

module.exports = router;
