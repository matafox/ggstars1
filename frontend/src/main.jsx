import { getMatches } from './api';

// Показати прелоадер
document.getElementById('app').innerHTML = <div class="preloader">Loading...</div>;

// Після завантаження Telegram WebApp
window.addEventListener('load', () => {
  Telegram.WebApp.ready();

  const user = Telegram.WebApp.initDataUnsafe?.user;
  if (!user) {
    document.getElementById('app').innerHTML = '<p>Waiting for Telegram WebApp...</p>';
    return;
  }

  renderApp();
});

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="logo">
      <img src="/logo.png" alt="GGStars" style="width: 120px; margin: 20px auto;">
    </div>

    <div id="slider" style="overflow: hidden; width: 100%;">
      <div id="slider-track" style="display: flex; transition: transform 0.5s ease;"></div>
    </div>

    <div class="buttons">
      <button onclick="openBets()">Мої ставки</button>
      <button onclick="openProfile()">Мій профіль</button>
      <button onclick="openReferral()">Реферальна система</button>
    </div>
  `;

  loadMatches();
}

// Завантажити матчі
async function loadMatches() {
  const matches = await getMatches();
  const track = document.getElementById('slider-track');
  if (!track) return;

  matches.forEach(match => {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    matchCard.style.minWidth = '200px';
    matchCard.style.margin = '0 10px';
    matchCard.innerHTML = `
      <div><strong>${match.name || 'Unknown Match'}</strong></div>
      <div style="font-size: 12px;">${match.begin_at ? new Date(match.begin_at).toLocaleString() : 'No date'}</div>
    `;
    track.appendChild(matchCard);
  });

  startSlider();
}

// Автоскрол
function startSlider() {
  const track = document.getElementById('slider-track');
  let scrollAmount = 0;
  setInterval(() => {
    scrollAmount += 1;
    track.style.transform = `translateX(-${scrollAmount}px)`;
    if (scrollAmount >= track.scrollWidth / 2) {
      scrollAmount = 0;
    }
  }, 30);
}

// Кнопки
window.openBets = function () {
  alert('Мої ставки');
};

window.openProfile = function () {
  alert('Мій профіль');
};

window.openReferral = function () {
  alert('Реферальна система');
};
