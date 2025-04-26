import { useEffect, useState } from 'react';
import './style.css';

const API_URL = 'https://ggstars.onrender.com/api';

async function fetchMatches() {
  const response = await fetch(`${API_URL}/matches`);
  const data = await response.json();
  return data;
}

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches()
      .then(data => {
        setMatches(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        Завантаження GGStars...
      </div>
    );
  }

  return (
    <div className="app">
      <img src="/logo.png" alt="GGStars Logo" className="logo" />

      <div className="matches-slider">
        {matches.map((m, index) => (
          <div key={index} className="match-card">
            <div className="teams">
              <strong>
                {(m.opponents?.[0]?.opponent?.name  'TBD')} vs {(m.opponents?.[1]?.opponent?.name || 'TBD')}
              </strong>
            </div>
            <div className="time">
              {m.begin_at ? new Date(m.begin_at).toLocaleString() : 'Дата невідома'}
            </div>
          </div>
        ))}
      </div>

      <div className="menu">
        <button>Мої ставки</button>
        <button>Мій профіль</button>
        <button>Реферальна система</button>
      </div>
    </div>
  );
}

export default App;
