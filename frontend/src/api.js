
export const getPing = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ping`);
  return await res.json();
};
