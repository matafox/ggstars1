
import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/api/users", async (req, res) => {
  const { telegram_id, username, first_name, last_name } = req.body;
  console.log("Received user data:", req.body);

  if (!telegram_id) {
    console.error("No telegram_id provided!");
    return res.status(400).json({ error: "Missing telegram_id" });
  }

  try {
    const result = await pool.query(
      \`
      INSERT INTO ggusers (telegram_id, username, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (telegram_id) DO UPDATE
      SET username = EXCLUDED.username,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name
      RETURNING *;
      \`,
      [telegram_id, username, first_name, last_name]
    );
    console.log("User saved:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Insert error:", err.message);
    res.status(500).json({ error: "User insert error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
