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

// Запуск сервера
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
