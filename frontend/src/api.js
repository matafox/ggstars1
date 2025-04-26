export async function getMatches() {
  try {
    const response = await fetch('https://ggstars.onrender.com/api/matches');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}
