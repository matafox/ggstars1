
import { useEffect, useState } from 'react';
import { saveUser, getPing } from './api';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getPing().then(data => setMsg(data.message));

    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      saveUser({
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }).catch(() => {
        alert("Не вдалося авторизувати користувача через Telegram.");
      });
    } else {
      console.warn("Telegram WebApp not detected.");
    }
  }, []);

  return <h1>{msg || "Waiting for Telegram WebApp..."}</h1>;
}

export default App;
