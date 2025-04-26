export async function fetchMatches() {
  const response = await fetch("https://api.pandascore.co/matches/upcoming", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PANDASCORE_API_TOKEN}`
    }
  });
  const data = await response.json();
  return data;
}
