
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/api/users', async (req, res) => {
  const { telegram_id, username, first_name, last_name } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO ggusers (telegram_id, username, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (telegram_id) DO UPDATE
      SET username = EXCLUDED.username,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name
      RETURNING *;
    `, [telegram_id, username, first_name, last_name]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'User insert error' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Backend is running');
});
