import { useEffect, useState } from 'react';
import { getMatches } from './api';
import './style.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initApp() {
      try {
        const initData = window.Telegram?.WebApp?.initData;
        console.log('initData:', initData);

        if (initData) {
          await fetch('https://ggstars.onrender.com/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ initData }),
          });
        } else {
          console.warn('No initData available');
        }

        const matchesData = await getMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error('Error during init:', error);
      } finally {
        setLoading(false);
      }
    }

    initApp();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Живі матчі</h1>
      {matches.length > 0 ? (
        matches.map((match, idx) => (
          <div key={idx} className="match-card">
            <div><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></div>
            <small>{new Date(match.time).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>Наразі матчів немає.</p>
      )}

      <footer className="footer">
        <button>Мої ставки</button>
        <button>Мій профіль</button>
        <button>Реферальна система</button>
      </footer>
    </div>
  );
}

export default App;
