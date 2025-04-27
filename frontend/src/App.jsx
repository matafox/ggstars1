import React, { useEffect, useState } from 'react'
import { getMatches } from './api'   // див. пункт 3
import './style.css'                // твій CSS для кнопок, прелоадера, лого

function App() {
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 1) прелоадер на 2 секунди
    setTimeout(() => setLoading(false), 2000)

    // 2) авторизація Telegram
    const initData = window.Telegram?.WebApp?.initData
    if (initData) {
      fetch('https://GGSTARS_BACKEND/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ initData })
      })
      .then(r => r.json())
      .then(d => {
        if (d.success) setUser(d.user)
        console.log('User:', d)
      })
      .catch(console.error)
    } else {
      console.warn('No initData from Telegram')
    }

    // 3) завантажити матчі
    getMatches().then(setMatches).catch(console.error)

  }, [])

  if (loading) return <div className="preloader">Завантаження…</div>

  return (
    <div className="app-container">
      <header>
        <img src="/ggstarslogo.png" alt="GGStars" className="logo"/>
        {user && <p className="welcome">Привіт, <strong>{user.first_name}</strong>!</p>}
      </header>

      <section className="matches">
        {matches.length>0 ? matches.map((m,i)=>(
          <div key={i} className="match">
            <strong>{m.opponents?.[0]?.opponent?.name || '–'}</strong>
            vs
            <strong>{m.opponents?.[1]?.opponent?.name || '–'}</strong>
            <div className="time">{ new Date(m.begin_at).toLocaleString() }</div>
          </div>
        )) : <p>Немає матчів</p>}
      </section>

      <nav className="menu">
        <button>Мої ставки</button>
        <button>Мій профіль</button>
        <button>Реферальна система</button>
      </nav>
    </div>
  )
}

export default App
