import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.listen(10000, () => {
  console.log('✅ Backend is running on port 10000 and connected to Neon');
});

.catch((err) => {
  console.error("Insert error:", err);
  res.status(500).send("Failed to save user");
});
