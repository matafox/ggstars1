
export const getPing = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ping`);
  return await res.json();
};

export const saveUser = async (userData) => {
  console.log("Sending user to backend:", userData);
  await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
};
