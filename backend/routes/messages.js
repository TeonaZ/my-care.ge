
const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// ჩატების სია
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        c.id,
        c.client_id,
        c.provider_id,
        c.created_at,
        u.first_name,
        u.last_name,
        (
          SELECT m.message_text
          FROM messages m
          WHERE m.conversation_id = c.id
          ORDER BY m.created_at DESC, m.id DESC
          LIMIT 1
        ) AS last_message
      FROM conversations c
      JOIN users u
        ON u.id = CASE
          WHEN c.client_id = $1 THEN c.provider_id
          ELSE c.client_id
        END
      WHERE c.client_id = $1 OR c.provider_id = $1
      ORDER BY c.created_at DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      conversations: result.rows,
    });
  } catch (error) {
    console.error("Load conversations:", error);
    res.status(500).json({ message: "ჩატების ჩატვირთვა ვერ მოხერხდა." });
  }
});

// ჩატის დაწყება — მხოლოდ დამსაქმებლის მიერ
router.post("/start", async (req, res) => {
  try {
    const clientId = req.user.userId;
    const { providerId } = req.body;

    if (req.user.accountType !== "client") {
      return res.status(403).json({
        message: "ჩატის დაწყება შეუძლია მხოლოდ დამსაქმებელს.",
      });
    }

    if (
      typeof providerId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(providerId)
    ) {
      return res.status(400).json({
        message: "სპეციალისტის ID არასწორია.",
      });
    }

    if (providerId === clientId) {
      return res.status(400).json({
        message: "საკუთარ თავთან ჩატის დაწყება შეუძლებელია.",
      });
    }

    const provider = await pool.query(
      `SELECT id FROM users
       WHERE id = $1 AND account_type = 'provider'`,
      [providerId]
    );

    if (provider.rows.length === 0) {
      return res.status(404).json({
        message: "სპეციალისტი ვერ მოიძებნა.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO conversations (client_id, provider_id)
      VALUES ($1, $2)
      ON CONFLICT (client_id, provider_id)
      DO UPDATE SET client_id = EXCLUDED.client_id
      RETURNING id
      `,
      [clientId, providerId]
    );

    res.json({
      success: true,
      conversationId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Start conversation:", error);
    res.status(500).json({ message: "ჩატის დაწყება ვერ მოხერხდა." });
  }
});

// კონკრეტული ჩატის შეტყობინებები
router.get("/:id", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    const userId = req.user.userId;

    if (!Number.isSafeInteger(conversationId) || conversationId <= 0) {
      return res.status(400).json({ message: "ჩატის ID არასწორია." });
    }

    const conversation = await pool.query(
      `SELECT id FROM conversations
       WHERE id = $1 AND (client_id = $2 OR provider_id = $2)`,
      [conversationId, userId]
    );

    if (conversation.rows.length === 0) {
      return res.status(404).json({ message: "ჩატი ვერ მოიძებნა." });
    }

    const messages = await pool.query(
      `
      SELECT id, sender_id, message_text, created_at
      FROM messages
      WHERE conversation_id = $1
      ORDER BY created_at ASC, id ASC
      `,
      [conversationId]
    );

    res.json({
      success: true,
      messages: messages.rows,
    });
  } catch (error) {
    console.error("Load messages:", error);
    res.status(500).json({ message: "შეტყობინებების ჩატვირთვა ვერ მოხერხდა." });
  }
});

// შეტყობინების გაგზავნა
router.post("/:id", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    const senderId = req.user.userId;
    const { text } = req.body;

    if (!Number.isSafeInteger(conversationId) || conversationId <= 0) {
      return res.status(400).json({ message: "ჩატის ID არასწორია." });
    }

    if (typeof text !== "string" || !text.trim() || text.length > 5000) {
      return res.status(400).json({
        message: "შეტყობინება უნდა შეიცავდეს 1-დან 5000 სიმბოლომდე ტექსტს.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO messages (conversation_id, sender_id, message_text)
      SELECT c.id, $2, $3
      FROM conversations c
      WHERE c.id = $1
        AND (c.client_id = $2 OR c.provider_id = $2)
      RETURNING id, sender_id, message_text, created_at
      `,
      [conversationId, senderId, text.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "ჩატი ვერ მოიძებნა ან წვდომა არ გაქვთ.",
      });
    }

    res.status(201).json({
      success: true,
      message: result.rows[0],
    });
  } catch (error) {
    console.error("Send message:", error);
    res.status(500).json({ message: "შეტყობინების გაგზავნა ვერ მოხერხდა." });
  }
});


/* წაუკითხავი შეტყობინებების რაოდენობა */
router.get("/unread/count", async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT COUNT(*)::integer AS unread_count
      FROM messages m
      JOIN conversations c
        ON c.id = m.conversation_id
      WHERE
        (c.client_id = $1 OR c.provider_id = $1)
        AND m.sender_id <> $1
        AND m.read_at IS NULL
      `,
      [userId]
    );

    res.json({
      success: true,
      unreadCount: result.rows[0].unread_count,
    });
  } catch (error) {
    console.error("Unread messages error:", error);
    res.status(500).json({
      success: false,
      message: "წაუკითხავი შეტყობინებების დათვლა ვერ მოხერხდა.",
    });
  }
});

/* ჩატის შეტყობინებების წაკითხულად მონიშვნა */
router.patch("/:id/read", async (req, res) => {
  try {
    const conversationId = Number(req.params.id);
    const userId = req.user.userId;

    if (!Number.isSafeInteger(conversationId) || conversationId <= 0) {
      return res.status(400).json({
        message: "ჩატის ID არასწორია.",
      });
    }

    const result = await pool.query(
      `
      UPDATE messages m
      SET read_at = CURRENT_TIMESTAMP
      FROM conversations c
      WHERE m.conversation_id = c.id
        AND c.id = $1
        AND (c.client_id = $2 OR c.provider_id = $2)
        AND m.sender_id <> $2
        AND m.read_at IS NULL
      RETURNING m.id
      `,
      [conversationId, userId]
    );

    res.json({
      success: true,
      markedRead: result.rowCount,
    });
  } catch (error) {
    console.error("Mark messages read error:", error);
    res.status(500).json({
      success: false,
      message: "შეტყობინებების წაკითხულად მონიშვნა ვერ მოხერხდა.",
    });
  }
});


module.exports = router;
