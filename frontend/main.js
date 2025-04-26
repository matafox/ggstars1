import { getMatches } from './src/api.js';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.opacity = '0';
    document.getElementById('preloader').style.transition = 'opacity 0.5s ease';
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 500);
  }, 2000);

  loadMatches();
  setInterval(loadMatches, 30000);
});

async function loadMatches() {
  const slider = document.getElementById('matches-slider');
  slider.innerHTML = '';
  const matches = await getMatches();
  
  matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'match';
    div.innerHTML = `
      <strong>${match.name}</strong><br>
      ${match.teams}
    `;
    slider.appendChild(div);
  });
}

function openReferral() {
  alert('Твоє реферальне посилання: https://t.me/GGStars1Bot?start=webapp\n\n1 TELEGRAM STARS за одного запрошеного користувача ⭐');
}
