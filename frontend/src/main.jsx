import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // імпортуємо App
import './style.css'; // імпортуємо стилі (якщо потрібні)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
