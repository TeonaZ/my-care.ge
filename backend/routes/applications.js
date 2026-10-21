
const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const ALLOWED_STATUSES = [
  "pending",
  "reviewed",
  "next-stage",
  "completed",
  "not-selected",
];

const mapApplication = (row) => ({
  id: row.id,
  jobId: row.job_id,
  applicantUserId: row.applicant_id,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// ========================================
// SEND APPLICATION
// POST /api/applications
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.accountType !== "provider") {
      return res.status(403).json({
        success: false,
        message: "განაცხადის გაგზავნა მხოლოდ სპეციალისტს შეუძლია.",
      });
    }

    const { jobId } = req.body;

    if (!jobId || !crypto.validateUUID?.(jobId) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(jobId))) {
      return res.status(400).json({
        success: false,
        message: "განცხადების ID არასწორია.",
      });
    }

    const jobResult = await pool.query(
      `
      SELECT id, owner_id, status, service
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

    if (job.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "ეს განცხადება აღარ არის აქტიური.",
      });
    }

    if (String(job.owner_id) === String(req.user.userId)) {
      return res.status(400).json({
        success: false,
        message: "საკუთარ განცხადებაზე განაცხადს ვერ გააგზავნი.",
      });
    }

    const existing = await pool.query(
      `
      SELECT id
      FROM applications
      WHERE job_id = $1 AND applicant_id = $2
      `,
      [jobId, req.user.userId]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "ამ განცხადებაზე განაცხადი უკვე გაგზავნილი გაქვს.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO applications (
        id, job_id, applicant_id, status
      )
      VALUES ($1, $2, $3, 'pending')
      RETURNING *
      `,
      [crypto.randomUUID(), jobId, req.user.userId]
    );

    return res.status(201).json({
      success: true,
      message: "განაცხადი წარმატებით გაიგზავნა.",
      application: mapApplication(result.rows[0]),
    });
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "ამ განცხადებაზე განაცხადი უკვე გაგზავნილი გაქვს.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "განაცხადის გაგზავნა ვერ მოხერხდა.",
    });
  }
});

// ========================================
// MY SENT APPLICATIONS
// GET /api/applications/my
// ========================================

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        a.*,
        j.service,
        j.city,
        j.employment_type,
        j.payment_type,
        j.budget,
        j.description,
        j.status AS job_status
      FROM applications a
      JOIN jobs j ON j.id = a.job_id
      WHERE a.applicant_id = $1
      ORDER BY a.created_at DESC
      `,
      [req.user.userId]
    );

    const applications = result.rows.map((row) => ({
      ...mapApplication(row),
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
      applications,
    });
  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "განაცხადების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// APPLICATIONS RECEIVED BY EMPLOYER
// GET /api/applications/received
// ========================================

router.get("/received", authMiddleware, async (req, res) => {
  try {
    if (req.user.accountType !== "client") {
      return res.status(403).json({
        success: false,
        message: "მიღებული განაცხადების ნახვა მხოლოდ დამსაქმებელს შეუძლია.",
      });
    }

    const result = await pool.query(
      `
      SELECT
        a.*,
        j.service,
        j.city,
        j.employment_type,
        j.status AS job_status,
        u.first_name,
        u.last_name,
        sp.id AS specialist_profile_id,
        sp.profession,
        sp.city AS specialist_city
      FROM applications a
      JOIN jobs j ON j.id = a.job_id
      JOIN users u ON u.id = a.applicant_id
       LEFT JOIN specialist_profiles sp
  ON sp.owner_id = a.applicant_id
  AND sp.profession = j.service
      WHERE j.owner_id = $1
      ORDER BY a.created_at DESC
      `,
      [req.user.userId]
    );

    const applications = result.rows.map((row) => ({
      ...mapApplication(row),
      applicant: {
        userId: row.applicant_id,
        firstName: row.first_name,
        lastName: row.last_name,
        specialistProfileId: row.specialist_profile_id,
        profession: row.profession,
        city: row.specialist_city,
      },
      job: {
        id: row.job_id,
        service: row.service,
        city: row.city,
        employmentType: row.employment_type,
        status: row.job_status,
      },
    }));

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("GET RECEIVED APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "მიღებული განაცხადების მიღება ვერ მოხერხდა.",
    });
  }
});

// ========================================
// EMPLOYER UPDATES APPLICATION STATUS
// PATCH /api/applications/:id/status
// ========================================

router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.accountType !== "client") {
      return res.status(403).json({
        success: false,
        message: "სტატუსის შეცვლა მხოლოდ დამსაქმებელს შეუძლია.",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "განაცხადის სტატუსი არასწორია.",
      });
    }

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return res.status(400).json({
        success: false,
        message: "განაცხადის ID არასწორია.",
      });
    }

    const result = await pool.query(
      `
      UPDATE applications a
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      FROM jobs j
      WHERE a.id = $2
        AND j.id = a.job_id
        AND j.owner_id = $3
        AND a.status <> 'not-selected'
      RETURNING
        a.id,
        a.job_id,
        a.applicant_id,
        a.status,
        a.created_at,
        a.updated_at
      `,
      [status, id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "განაცხადი ვერ მოიძებნა ან მისი შეცვლა შეუძლებელია.",
      });
    }

    return res.json({
      success: true,
      message: "განაცხადის სტატუსი განახლდა.",
      application: mapApplication(result.rows[0]),
    });
  } catch (error) {
    console.error("UPDATE APPLICATION STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "განაცხადის სტატუსის შეცვლა ვერ მოხერხდა.",
    });
  }
});

module.exports = router;
