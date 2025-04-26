const PANDA_SCORE_API_TOKEN = "zsH2ngzJ0h2pQ0tu3PukEU_5Yp9ERc3lJgfWbdmnjsMqi8jIpJ0";

export async function getLiveMatches() {
  const response = await fetch("https://api.pandascore.co/csgo/matches/upcoming", {
    headers: {
      Authorization: Bearer ${VITE_PANDA_SCORE_API_TOKEN},
    },
  });

  const allMatches = await response.json();
  return allMatches.map(m => ({
    id: m.id,
    teams: m.opponents[0]?.opponent?.name + ' vs ' + m.opponents[1]?.opponent?.name,
    status: m.status === 'running' ? 'LIVE' : new Date(m.begin_at).toLocaleTimeString()
  }));
}
