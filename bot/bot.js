import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
const port = process.env.PORT || 10000;

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://jovial-alpaca-bcc007.netlify.app'; // твій фронтенд

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Відкрити GGStars', web_app: { url: webAppUrl } }]
      ]
    }
  };

  bot.sendMessage(chatId, 'Ласкаво просимо в GGStars!', keyboard);
});

// Просто створюємо простий ендпоінт щоб Render бачив активний сервер
app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
