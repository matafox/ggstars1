
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    console.log("=== useEffect started ===");

    if (!tg?.initDataUnsafe?.user) {
      console.warn("Telegram WebApp not detected or no user data.");
      return;
    }

    const user = tg.initDataUnsafe.user;
    console.log("Telegram user:", user);

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ User saved:", data);
      })
      .catch((err) => {
        console.error("❌ Error saving user:", err.message);
      });
  }, []);

  return (
    <div style={{ background: "#222", color: "#fff", padding: "2rem" }}>
      <h1>GGStars</h1>
      <p>Telegram WebApp debug</p>
    </div>
  );
}

export default App;
