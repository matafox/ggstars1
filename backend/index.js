import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", (req, res) => {
  res.send("pong");
});

app.post("/api/save-user", async (req, res) => {
  try {
    const { telegram_id, username, first_name, last_name, referral_code, referred_by } = req.body;

    const result = await pool.query(
      `INSERT INTO ggusers (telegram_id, username, first_name, last_name, referral_code, referred_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (telegram_id) DO UPDATE SET username = $2, first_name = $3, last_name = $4
       RETURNING *`,
      [telegram_id, username, first_name, last_name, referral_code, referred_by]
    );

    const row = result.rows[0];

    res.json({
      telegram_id: row.telegram_id,
      username: row.username,
      first_name: row.first_name,
      last_name: row.last_name,
      referral_code: row.referral_code,
      referred_by: row.referred_by,
      is_admin: row.is_admin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
