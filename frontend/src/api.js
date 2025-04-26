const API_URL = import.meta.env.VITE_API_URL;

export async function saveUserData(userData) {
  const response = await fetch(`${API_URL}/save-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Failed to save user.');
  }

  return await response.json();
}
