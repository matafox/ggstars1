const express = require('express');
const fetch = require('node-fetch'); // додати node-fetch (npm install node-fetch)
const app = express();

// Інші налаштування (cors, bodyParser, db)

// Додаємо новий роут для матчів
app.get('/api/matches', async (req, res) => {
  try {
    const response = await fetch('https://api.pandascore.co/csgo/matches/upcoming', {
      headers: {
        Authorization: `Bearer ${process.env.PANDASCORE_API_TOKEN}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Твій сервер
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
