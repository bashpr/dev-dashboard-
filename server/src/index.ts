import { WebSocketServer, WebSocket } from 'ws';
import axios from 'axios';

const wss = new WebSocketServer({ port: 8080 });
const regions = ['us-east', 'eu-west', 'eu-central', 'us-west', 'sa-east', 'ap-southeast'];

const getEndpointData = async () => {
  const results: Record<string, any> = {};

  await Promise.all(
    regions.map(async (region) => {
      try {
        const url = `https://data--${region}.upscope.io/status?stats=1`;
        const { data } = await axios.get(url, { timeout: 5000 });
        results[region] = { status: 'ok', data };
      } catch (error: unknown) {
        if (error instanceof Error) {
          results[region] = { status: 'error', error: error.message };
        } else {
          results[region] = { status: 'error', error: 'Unknown error' };
        }
      }
    })
  );

  return results;
};

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  const sendData = async () => {
    const data = await getEndpointData();
    ws.send(JSON.stringify(data));
  };

  sendData();
  const interval = setInterval(sendData, 30000);

  ws.on('close', () => clearInterval(interval));
});
