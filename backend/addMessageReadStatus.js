
const pool = require("./db");

async function addMessageReadStatus() {
  try {
    await pool.query(`
      ALTER TABLE messages
      ADD COLUMN IF NOT EXISTS read_at TIMESTAMP DEFAULT NULL;
    `);

    console.log("✅ შეტყობინებების წაკითხვის ველი დაემატა!");
  } catch (error) {
    console.error("❌ შეცდომა:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

addMessageReadStatus();
