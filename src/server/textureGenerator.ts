import FastNoiseLite from 'fastnoise-lite';

export interface TextureData {
  width: number;
  height: number;
  data: Uint8Array;
}

export class TextureGenerator {
  private noise: FastNoiseLite;

  constructor(seed: number = 2000) {
    this.noise = new FastNoiseLite();
    this.noise.SetSeed(seed);
    this.noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
    this.noise.SetFractalOctaves(12);
    this.noise.SetFractalType(FastNoiseLite.FractalType.FBm);
    this.noise.SetFrequency(0.001);
    this.noise.SetFractalLacunarity(2.2);
  }

  generate(width: number, height: number): TextureData {
    const size = width * height * 4;
    const data = new Uint8Array(size);

    for (let i = 0; i < size; i += 4) {
      const row = Math.floor((i / 4) / width);
      const column = (i / 4) % width;
      let noiseVal = (this.noise.GetNoise(row, column) + 1) / 2;

      data[i]     = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;

      if (noiseVal >= 0.6) {
        data[i + 1] = 255 * (noiseVal - 0.6);
      } else {
        data[i + 2] = 255 * noiseVal;
      }
    }

    return { width, height, data };
  }
}