// backend/index.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Підключення до Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Токен для PandaScore (з .env: PANDASCORE_API_TOKEN=твій_токен)
const PANDASCORE_API_TOKEN = process.env.PANDASCORE_API_TOKEN;

// --- Маршрут /api/matches ---
app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.pandascore.co/csgo/matches/upcoming',
      { headers: { Authorization: `Bearer ${PANDASCORE_API_TOKEN}` } }
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch matches' });
    }
    const data = await response.json();
    res.json(data); // повертаємо масив матчів
  } catch (err) {
    console.error('Error fetching matches:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Маршрут /api/auth ---
app.post('/api/auth', async (req, res) => {
  try {
    const { initData } = req.body;
    if (!initData) return res.status(400).json({ error: 'No initData provided' });

    // Парсимо initData із Telegram WebApp
    const params = new URLSearchParams(initData);
    const rawUser = params.get('user');
    if (!rawUser) return res.status(400).json({ error: 'No user in initData' });

    const parsed = JSON.parse(rawUser);
    const user = {
      id: parsed.id,
      username: parsed.username || '',
      first_name: parsed.first_name || '',
      last_name: parsed.last_name || '',
    };

    // Перевіряємо, чи є такий user.id
    const { rows } = await pool.query(
      'SELECT 1 FROM ggusers WHERE id = $1',
      [user.id]
    );
    if (rows.length === 0) {
      // Якщо нема — додаємо
      await pool.query(
        `INSERT INTO ggusers (id, username, first_name, last_name, is_admin)
         VALUES ($1, $2, $3, $4, false)`,
        [user.id, user.username, user.first_name, user.last_name]
      );
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Старт сервера
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
