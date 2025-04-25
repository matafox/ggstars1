
import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth', async (req, res) => {
  const user = req.body;
  console.log('Received user data:', user);

  try {
    const result = await pool.query(
      `INSERT INTO ggusers (telegram_id, username, first_name, last_name, token)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (telegram_id) DO NOTHING`,
      [user.telegram_id, user.username, user.first_name, user.last_name, user.token]
    );
    console.log('Insert result:', result);
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).json({ error: 'db error' });
  }
});

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
