
import { useEffect, useState } from "react";
import { saveUser, getPing } from "./api";

const ADMIN_ID = 315343752; // Павло - адмін
const API_URL = import.meta.env.VITE_API_URL;
const tg = window.Telegram?.WebApp;

function App() {
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAction, setAdminAction] = useState('');

  useEffect(() => {
    console.log("=== useEffect started ===");
    console.log("API URL:", API_URL);

    getPing().then(data => setMsg(data.message));

    if (!tg?.initDataUnsafe?.user) {
      console.warn("Telegram WebApp not detected or no user data.");
      return;
    }

    const tgUser = tg.initDataUnsafe.user;
    console.log("Telegram user:", tgUser);
    setUser(tgUser);

    if (tgUser.id === ADMIN_ID) {
      setIsAdmin(true);
    }

    saveUser({
      telegram_id: tgUser.id,
      username: tgUser.username,
      first_name: tgUser.first_name,
      last_name: tgUser.last_name
    }).catch((err) => {
      console.error("Save user failed:", err);
    });
  }, []);

  const handleAction = (action) => {
    setAdminAction(action);
    console.log("Admin action:", action);
  };

  return (
    <div style={{ background: "#222", color: "#fff", padding: "2rem" }}>
      <h1>GGStars</h1>
      <p>{msg || "Waiting for Telegram WebApp..."}</p>

      {isAdmin && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Адмін панель</h2>
          <button onClick={() => handleAction('view_users')}>Перегляд всіх юзерів</button>
          <button onClick={() => handleAction('add_bonus')} style={{ marginLeft: "10px" }}>Додавання бонусу</button>
          <button onClick={() => handleAction('stats')} style={{ marginLeft: "10px" }}>Статистика</button>

          {adminAction && (
            <div style={{ marginTop: "1rem", background: "#333", padding: "1rem" }}>
              <strong>Вибрана дія:</strong> {adminAction}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
