bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Відкрити GGStars',
            web_app: { url: 'https://jovial-alpaca-bcc007.netlify.app/' }
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Ласкаво просимо в GGStars!', keyboard);
});
