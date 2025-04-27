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

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Твій токен Pandascore
const PANDASCORE_API_TOKEN = process.env.PANDASCORE_API_TOKEN;

// Маршрут для матчів
app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch('https://api.pandascore.co/csgo/matches/upcoming', {
      headers: {
        Authorization: `Bearer ${PANDASCORE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch matches' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Маршрут для авторизації користувача
app.post('/api/auth', async (req, res) => {
  try {
    const { initData } = req.body;
    if (!initData) {
      return res.status(400).json({ error: 'initData missing' });
    }

    const params = new URLSearchParams(initData);
    const rawUser = params.get('user');

    if (!rawUser) {
      return res.status(400).json({ error: 'No user in initData' });
    }

    const parsedUser = JSON.parse(rawUser);
    const user = {
      id: parsedUser.id,
      first_name: parsedUser.first_name,
      last_name: parsedUser.last_name,
      username: parsedUser.username,
    };

    if (!user.id || !user.first_name) {
      return res.status(400).json({ error: 'Invalid user data' });
    }

    const existingUser = await pool.query(
      'SELECT * FROM ggusers WHERE telegram_id = $1',
      [user.id]
    );

    if (existingUser.rows.length === 0) {
      await pool.query(
        'INSERT INTO ggusers (telegram_id, first_name, last_name, username) VALUES ($1, $2, $3, $4)',
        [user.id, user.first_name, user.last_name, user.username]
      );
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
