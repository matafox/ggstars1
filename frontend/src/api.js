export async function getMatches() {
  try {
    const response = await fetch('https://ggstars.onrender.com/api/matches');
    const matches = await response.json();
    return matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}
