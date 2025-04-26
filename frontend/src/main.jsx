
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
function openReferral() {
  alert("Ваше реферальне посилання тут: t.me/твійбот?start=referralcode");
}
