import { useEffect, useState } from 'react';
import './index.css'; // Import the CSS file

type Status = {
  [region: string]: {
    status: string;
    data?: any;
    error?: string;
  };
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">DevOps Status Dashboard</h1>
      
      <div className="regions-grid">
        {Object.entries(status).map(([region, info]) => (
          <div 
            key={region} 
            className={`region-card ${info.status === 'ok' ? 'region-card-healthy' : 'region-card-error'}`}
          >
            <h3 className="region-header">
              {region.toUpperCase()}
              <span className="region-status">
                {info.status === 'ok' ? '✅' : '❌'}
              </span>
            </h3>
            
            {info.status === 'ok' ? (
              <div>
                <div className="metric-row">
                  <strong>Servers:</strong> {info.data?.results?.stats?.servers_count || 'N/A'}
                </div>
                <div className="metric-row">
                  <strong>Connections:</strong> {info.data?.results?.stats?.server?.active_connections || 'N/A'}
                </div>
                <div className="metric-row">
                  <strong>CPU Load:</strong> {info.data?.results?.stats?.server?.cpu_load ? 
                    `${(info.data.results.stats.server.cpu_load * 100).toFixed(1)}%` : 'N/A'}
                </div>
              </div>
            ) : (
              <div className="error-message">Error: {info.error}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;