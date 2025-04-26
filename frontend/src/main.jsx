import { getMatches } from './api';

window.addEventListener('load', async () => {
  const matches = await getMatches();
  
  const matchesContainer = document.createElement('div');
  matchesContainer.style.color = 'white';

  matches.forEach(match => {
    const matchDiv = document.createElement('div');
    matchDiv.textContent = `${match.name || 'No name'} — ${match.status}`;
    matchesContainer.appendChild(matchDiv);
  });

  document.body.appendChild(matchesContainer);
});
