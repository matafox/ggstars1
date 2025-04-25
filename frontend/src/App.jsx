
import { useEffect, useState } from 'react';
import { saveUser, getPing } from './api';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);

    getPing().then(data => setMsg(data.message));

    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (user) {
      console.log("Telegram user:", user);
      saveUser({
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }).catch((err) => {
        alert("Не вдалося авторизувати користувача через Telegram.");
        console.error("Save user failed:", err);
      });
    } else {
      console.warn("Telegram WebApp not detected or no user data.");
    }
  }, []);

  return <h1>{msg || "Waiting for Telegram WebApp..."}</h1>;
}

export default App;
