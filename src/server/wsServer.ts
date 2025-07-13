import { WebSocketServer } from 'ws';
import { TextureGenerator } from './textureGenerator';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
const generator = new TextureGenerator();

wss.on('connection', ws => {
  // You could receive a message from the client to specify width/height
  const width = 1600, height = 800;
  const texture = generator.generate(width, height);

  ws.send(JSON.stringify({
    width: texture.width,
    height: texture.height,
    data: Array.from(texture.data) // Convert Uint8Array to Array for JSON
  }));
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);