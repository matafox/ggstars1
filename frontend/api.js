const PANDA_SCORE_API_TOKEN = "zsH2ngzJ0h2pQ0tu3PukEU_5Yp9ERc3lJgfWbdmnjsMqi8jIpJ0";
const PANDA_SCORE_API_URL = "https://api.pandascore.co/csgo/matches/upcoming";

async function getMatches() {
  const response = await fetch(PANDA_SCORE_API_URL, {
    headers: {
      Authorization: Bearer ${PANDA_SCORE_API_TOKEN}
    }
  });
  const matches = await response.json();
  return matches;
}

export { getMatches };
