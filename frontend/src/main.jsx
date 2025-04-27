import React from 'react';
import ReactDOM from 'react-dom/client';

// Підключаємо глобальні стилі ще до того, як вмонтуємо App
import './style.css';
import './preloader.css';

import App from './App';



  useEffect(() => {
    // 1) Авторизація Telegram
    (async () => {
      const initData = window.Telegram?.WebApp?.initData;
      if (initData) {
        try {
          const res = await fetch('https://ggstars.onrender.com/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ initData }),
          });
          const json = await res.json();
          if (json.user) setUser(json.user);
        } catch (e) {
          console.error('Auth error', e);
        }
      } else {
        console.warn('No initData (не через Telegram)');
      }
    })();

    // 2) Завантаження матчів
    (async () => {
      try {
        const res = await fetch('https://ggstars.onrender.com/api/matches');
        const data = await res.json();
        setMatches(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Fetch matches error', e);
      }
    })();

    // 3) Прелоадер 2 секунди
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="preloader"><h1>Завантаження...</h1></div>;
  }

  return (
    <div className="container">
      <div className="logo">
        <img src="/ggstarslogo.png" alt="GGStars" />
      </div>
      {user && <div className="welcome">Привіт, {user.first_name}!</div>}
      <div className="matches-slider">
        <h1>Живі матчі</h1>
        {matches.length > 0 ? matches.map((m, i) => (
          <div key={i} className="match-card">
            <strong>
              {m.opponents?.[0]?.opponent?.name || 'TBD'} vs {m.opponents?.[1]?.opponent?.name || 'TBD'}
            </strong>
            <div>{m.begin_at ? new Date(m.begin_at).toLocaleString() : '—'}</div>
          </div>
        )) : <div>Немає матчів</div>}
      </div>
      <div className="menu">
        <button>Мої ставки</button>
        <button>Мій профіль</button>
        <button>Реферальна система</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
