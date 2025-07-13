import * as THREE from 'three';
import FastNoiseLite from 'fastnoise-lite';

export function createRandomTexture(width, height) {
  const size = width * height * 4;
  const data = new Uint8Array(size);
  const noise = new FastNoiseLite();

  noise.SetSeed(2000);
  noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
  noise.SetFractalOctaves(12);
  noise.SetFractalType(FastNoiseLite.FractalType.FBm);
  noise.SetFrequency(0.001);
  noise.SetFractalLacunarity(2.2);

  for (let i = 0; i < size; i += 4) {
    const row = Math.floor((i / 4) / width);
    const column = (i / 4) % width;
    let noiseVal = (noise.GetNoise(row, column) + 1) / 2;

    data[i]     = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 255;

    if (noiseVal >= 0.6) {
        data[i + 1] = 255 * (noiseVal - 0.6);
    }
    else {
        data[i + 2] = 255 * noiseVal;
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;

  return texture;
}