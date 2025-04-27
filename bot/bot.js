import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🚀 Відкрити GGStars', web_app: { url: 'https://jovial-alpaca-bcc007.netlify.app' } }
        ],
        [
          { text: '📄 Мої ставки', callback_data: 'my_bets' },
          { text: '👤 Мій профіль', callback_data: 'my_profile' }
        ],
        [
          { text: '🎁 Реферальна система', callback_data: 'referral_system' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Ласкаво просимо в GGStars!', keyboard);
});
