const API_URL = import.meta.env.VITE_API_URL;
const PANDA_SCORE_API_TOKEN = import.meta.env.VITE_PANDASCORE_API_TOKEN;

export const fetchUserData = async (telegramData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(telegramData),
  });

  if (!response.ok) {
    throw new Error('Failed to save user.');
  }

  return await response.json();
};

export const fetchLiveMatches = async () => {
  const response = await fetch('https://api.pandascore.co/csgo/matches/upcoming', {
    headers: {
      Authorization: Bearer ${PANDA_SCORE_API_TOKEN}
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch live matches.');
  }

  const data = await response.json();
  return data.map(m => ({
    id: m.id,
    teams: m.opponents?.map(o => o.opponent.name).join(' vs '),
    time: m.begin_at
  }));
};
