import { createTextureFromData } from './texture';
import * as THREE from 'three';

export function loadTextureFromServer(
  url: string,
  onTexture: (texture: THREE.DataTexture) => void
) {
  const socket = new WebSocket(url);

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    const { width, height, data } = msg;
    const texture = createTextureFromData(width, height, data);
    onTexture(texture);
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };
}