import { useEffect, useState } from 'react';

type Status = {
  [region: string]: {
    status: string;
    data?: any;
    error?: string;
  }
};

function App() {
  const [status, setStatus] = useState<Status>({});

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data);
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>DevOps Status Dashboard</h1>
      {Object.entries(status).map(([region, info]) => (
        <div key={region} style={{ margin: '10px 0' }}>
          <strong>{region.toUpperCase()}:</strong>{' '}
          {info.status === 'ok' ? '✅ Online' : `❌ Error - ${info.error}`}
        </div>
      ))}
    </div>
  );
}

export default App;
