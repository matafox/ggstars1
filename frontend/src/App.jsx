import { useEffect, useState } from 'react';
import { getMatches } from './api';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error('Помилка завантаження матчів', error);
      }
    }
    loadMatches();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <h1>Живі матчі</h1>
      {matches.map((match, idx) => (
        <div key={idx} style={{ marginBottom: '15px', background: '#1e1e1e', padding: '10px', borderRadius: '8px' }}>
          <div><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></div>
          <small>{new Date(match.time).toLocaleString()}</small>
        </div>
      ))}

      <footer style={{ position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#1e1e1e', padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
        <button>Мої ставки</button>
        <button>Мій профіль</button>
        <button>Реферальна система</button>
      </footer>
    </div>
  );
}

export default App;
