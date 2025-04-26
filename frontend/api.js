const TOKEN = 'zsH2ngzJ0h2pQ0tu3PukEU_5Yp9ERc3lJgfWbdmnjsMqi8jIpJ0';

export async function getMatches() {
  try {
    const live = await fetch(`https://api.pandascore.co/csgo/matches/running?token=${TOKEN}`);
    const upcoming = await fetch(`https://api.pandascore.co/csgo/matches/upcoming?token=${TOKEN}`);

    const liveMatches = await live.json();
    const upcomingMatches = await upcoming.json();

    const allMatches = [...liveMatches, ...upcomingMatches];

    return allMatches.map(m => ({
      name: ${m.opponents[0]?.opponent?.name || ''} vs ${m.opponents[1]?.opponent?.name || ''},
      teams: m.status === 'running' ? 'LIVE' : new Date(m.begin_at).toLocaleTimeString()
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
