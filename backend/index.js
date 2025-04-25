
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

app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Backend is running');
});
