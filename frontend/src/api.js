export async function getMatches() {
  const response = await fetch('/api/matches')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  // відповідь з бекенду — масив матчів
  return data
}
