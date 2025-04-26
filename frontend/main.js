const matches = [
  "Матч 1: Natus Vincere vs Vitality",
  "Матч 2: FaZe vs G2",
  "Матч 3: Astralis vs Heroic",
];

const slider = document.getElementById('slider');

matches.forEach(match => {
  const div = document.createElement('div');
  div.className = 'match';
  div.textContent = match;
  slider.appendChild(div);
});