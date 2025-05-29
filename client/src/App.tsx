import { useEffect, useState } from 'react';
import './index.css';

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
  const socket = new WebSocket('wss://dev-dashboard-production.up.railway.app');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setStatus(data);
  };
  return () => socket.close();
}, []);


  const getCpuLoadStatus = (load: number) => {
    if (load < 0.7) return 'cpu-healthy';    
    if (load < 0.9) return 'cpu-degraded';    
    return 'cpu-error';                       
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">DevOps Status Dashboard</h1>

      <div className="regions-grid">
        {Object.entries(status).map(([region, info]) => {
          const cpuLoad = info.data?.results?.stats?.server?.cpu_load;
          const cpuClass = cpuLoad !== undefined ? getCpuLoadStatus(cpuLoad) : '';

          const dbStatus = info.data?.results?.services?.database;
          const redisStatus = info.data?.results?.services?.redis;

          return (
            <div
              key={region}
              className={`region-card ${info.status === 'ok' ? 'region-card-healthy' : 'region-card-error'}`}
            >
              <h3 className="region-header">
                {region.toUpperCase()}
                <span className="region-status">{info.status === 'ok' ? '✅' : '❌'}</span>
              </h3>

              {info.status === 'ok' ? (
                <div>
                  <div className="metric-row">
                    <strong>Servers:</strong> {info.data?.results?.stats?.servers_count || 'N/A'}
                  </div>
                  <div className="metric-row">
                    <strong>Connections:</strong> {info.data?.results?.stats?.server?.active_connections || 'N/A'}
                  </div>
                  <div className={`metric-row ${cpuClass}`}>
                    <strong>CPU Load:</strong>{' '}
                    {cpuLoad !== undefined
                      ? `${(cpuLoad * 100).toFixed(1)}%`
                      : 'N/A'}
                    {' '}
                    {cpuLoad !== undefined && (cpuLoad < 0.7 ? '✅' : cpuLoad < 0.9 ? '⚠️' : '❌')}
                  </div>

                  <div className="metric-row">
                    <strong>Online Users:</strong> {info.data?.results?.stats?.online ?? 'N/A'}
                  </div>
                  <div className="metric-row">
                    <strong>Database Service:</strong> {dbStatus === true ? '🟢' : dbStatus === false ? '🔴' : 'N/A'}
                  </div>
                  <div className="metric-row">
                    <strong>Redis Service:</strong> {redisStatus === true ? '🟢' : redisStatus === false ? '🔴' : 'N/A'}
                  </div>
                  <div className="metric-row">
                    <strong>CPUs:</strong> {info.data?.results?.stats?.server?.cpus ?? 'N/A'}
                  </div>
                  <div className="metric-row">
                    <strong>Wait Time:</strong> {info.data?.results?.stats?.server?.wait_time ?? 'N/A'} ms
                  </div>
                  <div className="metric-row">
                    <strong>Timers:</strong> {info.data?.results?.stats?.server?.timers ?? 'N/A'}
                  </div>
                </div>
              ) : (
                <div className="error-message">Error: {info.error}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
