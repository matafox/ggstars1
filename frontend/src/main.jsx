import React from 'react';
import ReactDOM from 'react-dom/client';

// Підключаємо стилі _до того_, як завантажиться App
import './style.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
