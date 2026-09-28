const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// CREATE APPLICATION
// POST /api/applications
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "განცხადების ID აუცილებელია.",
      });
    }

    // ========================================
    // CHECK JOB
    // ========================================

    const jobResult = await pool.query(
      `
      SELECT
        id,
        owner_id,
        status
      FROM jobs
      WHERE id = $1
      `,
      [jobId]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განცხადება ვერ მოიძებნა.",
      });
    }

    const job = jobResult.rows[0];

    // ========================================
    // CLOSED JOB
    // ========================================

    if (job.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "ეს განცხადება აღარ არის აქტიური.",
      });
    }

    // ========================================
    // CANNOT APPLY TO OWN JOB
    // ========================================

    if (
      String(job.owner_id) ===
      String(req.user.userId)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "საკუთარ განცხადებაზე განაცხადს ვერ გააგზავნი.",
      });
    }

    // ========================================
    // CHECK EXISTING APPLICATION
    // ========================================

    const existingApplication =
      await pool.query(
        `
        SELECT id
        FROM applications
        WHERE job_id = $1
          AND applicant_id = $2
        `,
        [jobId, req.user.userId]
      );

    if (existingApplication.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "ამ განცხადებაზე განაცხადი უკვე გაგზავნილი გაქვს.",
      });
    }

    // ========================================
    // CREATE APPLICATION
    // ========================================

    const applicationId = crypto.randomUUID();

    const result = await pool.query(
      `
      INSERT INTO applications (
        id,
        job_id,
        applicant_id,
        status
      )
      VALUES ($1, $2, $3, 'sent')
      RETURNING
        id,
        job_id,
        applicant_id,
        status,
        created_at,
        updated_at
      `,
      [
        applicationId,
        jobId,
        req.user.userId,
      ]
    );

    const application = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "განაცხადი წარმატებით გაიგზავნა.",

      application: {
        id: application.id,
        jobId: application.job_id,
        applicantUserId:
          application.applicant_id,
        status: application.status,
        createdAt: application.created_at,
        updatedAt: application.updated_at,
      },
    });
  } catch (error) {
    console.error(
      "CREATE APPLICATION ERROR:",
      error
    );

    // დამატებითი დაცვა UNIQUE constraint-ისთვის
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message:
          "ამ განცხადებაზე განაცხადი უკვე გაგზავნილი გაქვს.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "განაცხადის გაგზავნა ვერ მოხერხდა.",
    });
  }
});

// ========================================
// GET MY SENT APPLICATIONS
// GET /api/applications/my
// ========================================

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        a.id,
        a.job_id,
        a.applicant_id,
        a.status,
        a.created_at,
        a.updated_at,

        j.service,
        j.city,
        j.employment_type,
        j.payment_type,
        j.budget,
        j.description,
        j.status AS job_status

      FROM applications a

      JOIN jobs j
        ON j.id = a.job_id

      WHERE a.applicant_id = $1

      ORDER BY a.created_at DESC
      `,
      [req.user.userId]
    );

    const applications = result.rows.map(
      (row) => ({
        id: row.id,

        jobId: row.job_id,

        applicantUserId:
          row.applicant_id,

        status: row.status,

        createdAt: row.created_at,
        updatedAt: row.updated_at,

        job: {
          id: row.job_id,
          service: row.service,
          city: row.city,

          employmentType:
            row.employment_type,

          paymentType:
            row.payment_type,

          budget: Number(row.budget),

          description:
            row.description,

          status: row.job_status,
        },
      })
    );

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(
      "GET MY APPLICATIONS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "განაცხადების მიღება ვერ მოხერხდა.",
    });
  }
});

module.exports = router;