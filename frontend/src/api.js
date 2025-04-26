export async function fetchLiveMatches() {
  const response = await fetch('https://api.pandascore.co/csgo/matches/upcoming', {
    headers: {
      Authorization: Bearer zsH2ngzJ0h2pQ0tu3PukEU_5Yp9ERc3lJgfWbdmnjsMqi8jIpJ0,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  const matches = await response.json();
  return matches.map(m => ({
    id: m.id,
    team1: m.opponents[0]?.opponent?.name || 'TBD',
    team2: m.opponents[1]?.opponent?.name || 'TBD',
    time: new Date(m.begin_at).toLocaleString(),
    status: m.status === 'running' ? 'LIVE' : 'UPCOMING',
  }));
}
