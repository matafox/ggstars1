import { getMatches } from './api';

window.onload = async () => {
  const app = document.getElementById('app');

  if (!app) {
    console.error('Element #app not found');
    return;
  }

  // Прелоадер
  app.innerHTML = `
    <div id="preloader" style="text-align:center; padding: 50px; color: white;">Loading...</div>
  `;

  try {
    const matches = await getMatches();

    // Після завантаження даних — малюємо сторінку
    app.innerHTML = `
      `<div style="text-align: center; margin-top: 20px;"`>
        <img src="/logo.png" alt="GGStars" style="width: 150px; margin-bottom: 20px;" />
      </div>

      <div id="matches-slider" style="display: flex; overflow-x: auto; gap: 10px; padding: 20px;">
        ${matches.map(m => `
          <div style="background: #333; padding: 15px; border-radius: 10px; min-width: 200px; color: white;">
            <div><strong>${m.opponents?.[0]?.opponent?.name⠞⠺⠺⠺⠺⠟⠺⠺⠵⠵⠺⠟⠺⠟⠟⠞⠞⠵⠵⠵⠵⠺⠞⠟⠵⠵⠵⠟⠞⠞⠟⠞⠵⠵⠵⠞⠺⠟⠵⠵⠺⠟⠺⠵⠞⠟⠟⠵'TBD'}</strong></div>
            <div>${m.begin_at ? new Date(m.begin_at).toLocaleString() : 'Date unknown'}</div>
          </div>
        `).join('')}
      </div>

      <div style="position: fixed; bottom: 0; width: 100%; background: black; display: flex; justify-content: center; gap: 10px; padding: 10px;">
        <button onclick="openBets()" style="padding: 10px 20px; background: yellow; border: none; border-radius: 5px;">Мої ставки</button>
        <button onclick="openProfile()" style="padding: 10px 20px; background: yellow; border: none; border-radius: 5px;">Мій профіль</button>
        <button onclick="openReferral()" style="padding: 10px 20px; background: yellow; border: none; border-radius: 5px;">Реферальна система</button>
      </div>
    `;
  } catch (error) {
    console.error('Error loading matches:', error);
    app.innerHTML = <div style="color: red; text-align: center;">Помилка завантаження матчів</div>;
  }
};

// Пусті функції для кнопок (додаси потім що потрібно)
function openBets() {
  alert('Мої ставки');
}

function openProfile() {
  alert('Мій профіль');
}

function openReferral() {
  alert('Реферальна система');
}
