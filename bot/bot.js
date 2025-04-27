bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Відкрити GGStars',
            web_app: { url: 'https://твій-сайт-на-Netlify' }
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Ласкаво просимо в GGStars!', keyboard);
});
