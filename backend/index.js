import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

dotenv.config();

const app = express();
// Забираємо порт із середовища або за замовчуванням 10000
const PORT = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
// Пул для NeonDB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());

// --- Статика фронтенду ---
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

// --- Маршрут отримання матчів ---
app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch('https://api.pandascore.co/csgo/matches/upcoming', {
      headers: { Authorization: `Bearer ${process.env.PANDASCORE_API_TOKEN}` }
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch matches' });
    }
    const data = await response.json();
    // за бажанням відфільтруйте/підготуйте data
    res.json(data);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Маршрут авторизації Telegram WebApp ---
app.post('/api/auth', async (req, res) => {
  try {
    const { initData } = req.body;
    if (!initData) {
      return res.status(400).json({ error: 'initData missing' });
    }

    // initData — рядок виду "field1=...&field2=..."
    const params = new URLSearchParams(initData);
    const rawUser = params.get('user');
    if (!rawUser) {
      return res.status(400).json({ error: 'No user in initData' });
    }

    
    const parsedUser = JSON.parse(rawUser);
    const user = {
      telegram_id: parsedUser.id,        // використовуємо telegram_id як PK
      username: parsedUser.username || '',
      first_name: parsedUser.first_name,
      last_name: parsedUser.last_name || '',
      is_admin: false                      // за замовчуванням
    };

    // Перевіряємо чи є такий у базі
    const { rows } = await pool.query(
      'SELECT * FROM ggusers WHERE id = $1',
      [user.id]
    );

    if (rows.length === 0) {
      // Вставка в Neon (таблиця ggusers)
    await pool.query(
      `INSERT INTO ggusers (telegram_id, username, first_name, last_name, is_admin)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (telegram_id) DO NOTHING`,
      [user.telegram_id, user.username, user.first_name, user.last_name, user.is_admin]
    );

 
    }

    // Повертаємо юзера у фронтенд
    res.json({ success: true, user });
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Для SPA: всі інші запити віддаємо index.html ---
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// --- Старт сервера ---
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
