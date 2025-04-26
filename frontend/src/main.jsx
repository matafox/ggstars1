import { getMatches } from './api';

async function loadMatches() {
  const matchesContainer = document.getElementById('matches');
  if (!matchesContainer) return;

  const matches = await getMatches();
  matchesContainer.innerHTML = '';

  matches.forEach(match => {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    matchCard.innerHTML = `
      <div>${match.opponents ? match.opponents.map(o => o.name).join(' vs ') : 'Unknown Teams'}</div>
      <div>${new Date(match.begin_at).toLocaleString() || 'No date'}</div>
    `;
    matchesContainer.appendChild(matchCard);
  });
}

// Викликаємо після авторизації Telegram
window.addEventListener('load', () => {
  loadMatches();
});
