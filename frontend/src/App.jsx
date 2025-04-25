
import { useEffect, useState } from 'react';
import { saveUser, getPing } from './api';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe.user;

    if (user) {
      saveUser({
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      });
    }

    getPing().then(data => setMsg(data.message));
  }, []);

  return <h1>Server says: {msg}</h1>;
}

export default App;
