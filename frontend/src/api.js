export async function getMatches() {
  const response = await fetch("https://api.pandascore.co/matches/upcoming", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PANDASCORE_API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  const data = await response.json();
  return data;
}
