
import { useEffect, useState } from 'react';
import { getPing } from './api';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getPing().then(data => setMsg(data.message));
  }, []);

  return <h1>Server says: {msg}</h1>;
}

export default App;
