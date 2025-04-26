export async function getMatches() {
  const response = await fetch('https://api.pandascore.co/csgo/matches/upcoming', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PANDASCORE_API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  const data = await response.json();
  return data.map(match => ({
    team1: match.opponents?.[0]?.opponent?.name || "Unknown",
    team2: match.opponents?.[1]?.opponent?.name || "Unknown",
    time: match.begin_at
  }));
}
