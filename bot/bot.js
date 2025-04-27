// bot/bot.js
import 'dotenv/config';                    // читаємо BOT_TOKEN
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://jovial-alpaca-bcc007.netlify.app'; // твій Netlify URL

  const keyboard = {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 Відкрити GGStars',
          web_app: { url: webAppUrl }
        }
      ]]
    }
  };

  bot.sendMessage(chatId, 'Ласкаво просимо в GGStars!', keyboard);
});
