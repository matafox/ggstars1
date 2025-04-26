import { useEffect, useState } from 'react';
import './style.css'; // Якщо є стилі

function App() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Прелоадер 2 секунди
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Завантаження матчів
    fetch('https://ggstars.onrender.com/api/matches')
      .then((res) => res.json())
      .then((data) => {
        setMatches(data || []);
      })
      .catch((error) => {
        console.error('Failed to fetch matches:', error);
      });

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <h1>Завантаження...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Лого */}
      <div className="logo">
        <img src="/logo.png" alt="GGStars" style={{ width: '150px', marginBottom: '20px' }} />
      </div>

      {/* Живі матчі */}
      <div className="matches-slider">
        {matches.length > 0 ? (
          matches.map((m, idx) => (
            <div key={idx} className="match-card">
              <strong>
                {m.opponents?.[0]?.opponent?.name || 'TBD'} vs {m.opponents?.[1]?.opponent?.name || 'TBD'}
              </strong>
              <div>{m.begin_at ? new Date(m.begin_at).toLocaleString() : 'Дата невідома'}</div>
            </div>
          ))
        ) : (
          <div>Немає матчів</div>
        )}
      </div>

      {/* Кнопки */}
      <div className="menu">
        <button onClick={() => alert('Мої ставки')}>Мої ставки</button>
        <button onClick={() => alert('Мій профіль')}>Мій профіль</button>
        <button onClick={() => alert('Реферальна система')}>Реферальна система</button>
      </div>
    </div>
  );
}

export default App;

