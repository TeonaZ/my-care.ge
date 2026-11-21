
const pool = require("./db");

async function createChatTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        client_id UUID NOT NULL REFERENCES users(id),
        provider_id UUID NOT NULL REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (client_id, provider_id),
        CHECK (client_id <> provider_id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER NOT NULL
          REFERENCES conversations(id) ON DELETE CASCADE,
        sender_id UUID NOT NULL REFERENCES users(id),
        message_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK (length(trim(message_text)) > 0)
      );
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_messages_conversation
      ON messages(conversation_id, created_at, id);
    `);

    console.log("✅ ჩატის ცხრილები წარმატებით შეიქმნა!");
  } catch (error) {
    console.error("❌ შეცდომა:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

createChatTables();
