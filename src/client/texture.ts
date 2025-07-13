import * as THREE from 'three';

export function createTextureFromData(
  width: number,
  height: number,
  data: number[]
): THREE.DataTexture {
  const texture = new THREE.DataTexture(
    new Uint8Array(data), width, height, THREE.RGBAFormat
  );
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;
  return texture;
}