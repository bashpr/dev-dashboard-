import { WebSocketServer, WebSocket } from 'ws';
import axios from 'axios';

const PORT = parseInt(process.env.PORT || '8080', 10);
const wss = new WebSocketServer({ port: PORT });

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

const clients = new Set<WebSocket>();
let cachedData: Record<string, any> | null = null;

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  console.log('Client connected, total clients:', clients.size);


  if (cachedData) {
    ws.send(JSON.stringify(cachedData));
  }

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected, total clients:', clients.size);
  });
});


const pollAndBroadcast = async () => {
  cachedData = await getEndpointData();

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(cachedData));
    }
  }
};

pollAndBroadcast();
setInterval(pollAndBroadcast, 30000);
