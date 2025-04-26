import { useEffect } from 'react';
import { saveUserData } from './api';

function App() {
  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    telegram.ready();

    const telegramUser = telegram.initDataUnsafe.user;

    if (telegramUser) {
      const userData = {
        telegram_id: telegramUser.id,
        username: telegramUser.username,
        first_name: telegramUser.first_name,
        last_name: telegramUser.last_name,
        referral_code: null,
        referred_by: null
      };

      saveUserData(userData)
        .then(() => {
          console.log('User saved successfully');
        })
        .catch((error) => {
          console.error('Error saving user:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>GGStars</h1>
      {/* Тут буде твій слайдер матчів і кнопки */}
    </div>
  );
}

export default App;
