// backend/index.js
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

app.post('/api/auth', async (req, res) => {
  try {
    const { initData } = req.body;
    const params = new URLSearchParams(initData);
    const rawUser = params.get('user');

    if (!rawUser) return res.status(400).json({ error: 'No user in initData' });

    const parsedUser = JSON.parse(rawUser);

    await pool.query(
      `INSERT INTO ggusers (id, username, first_name, last_name, is_admin) 
       VALUES ($1, $2, $3, $4, false)
       ON CONFLICT (id) DO NOTHING`,
      [
        parsedUser.id,
        parsedUser.username || '',
        parsedUser.first_name || '',
        parsedUser.last_name || '',
      ]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/matches', (req, res) => {
  const matches = [
    { team1: 'Team A', team2: 'Team B', time: Date.now() + 3600000 },
    { team1: 'Team C', team2: 'Team D', time: Date.now() + 7200000 },
  ];
  res.json({ matches });
});

app.listen(port, () => {
  console.log(`Backend запущено на порту ${port}`);
});
