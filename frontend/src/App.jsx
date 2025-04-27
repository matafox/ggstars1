import { useEffect, useState } from 'react'
import { getMatches } from './api'
import './style.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState([])
  const [user, setUser] = useState(null)

  // Прелоадер 2 секунди
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Авторизація + завантаження матчів
  useEffect(() => {
    async function authorize() {
      const initData = window.Telegram?.WebApp?.initData
      console.log('initData:', initData)
      if (!initData) return

      try {
        const resp = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData })
        })
        const result = await resp.json()
        console.log('User authorized:', result)
        if (result.success) {
          setUser(result.user)
        }
      } catch (e) {
        console.error('Authorization error:', e)
      }
    }

    async function loadMatches() {
      try {
        const data = await getMatches()
        setMatches(data)
      } catch (e) {
        console.error('Failed to fetch matches:', e)
      }
    }

    authorize()
    loadMatches()
  }, [])

  if (loading) {
    return (
      <div className="preloader">
        <h1>Завантаження…</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="logo">
        <img src="/ggstarslogo.png" alt="GGStars Logo" />
      </div>

      {user && (
        <div className="welcome">
          Вітаємо, <strong>{user.first_name}</strong>!
        </div>
      )}

      <div className="matches-slider">
        {matches.length > 0 ? (
          matches.map((m, i) => (
            <div key={i} className="match-card">
              <strong>
                {m.opponents?.[0]?.opponent?.name ?? 'TBD'} vs{' '}
                {m.opponents?.[1]?.opponent?.name ?? 'TBD'}
              </strong>
              <div>
                {m.begin_at
                  ? new Date(m.begin_at).toLocaleString()
                  : 'Дата невідома'}
              </div>
            </div>
          ))
        ) : (
          <div>Немає матчів</div>
        )}
      </div>

      <div className="menu">
        <button>Мої ставки</button>
        <button>Мій профіль</button>
        <button>Реферальна система</button>
      </div>
    </div>
  )
}

export default App
