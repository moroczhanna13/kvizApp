// Rövid WAV hangfájlok generálása a public/sounds mappába (internetes letöltés nélkül).
// Futtatás: npm run sounds
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SAMPLE_RATE = 44100;
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sounds');

/**
 * Hangjegyek sorozatából 16 bites mono PCM mintákat állít elő.
 * @param {{ freq: number, duration: number, wave?: 'sine' | 'square' }[]} notes - A lejátszandó hangok.
 * @param {number} volume - Hangerő 0 és 1 között.
 * @returns {Int16Array} A generált minták.
 */
function synthesize(notes, volume) {
  const total = notes.reduce((sum, n) => sum + Math.floor(n.duration * SAMPLE_RATE), 0);
  const samples = new Int16Array(total);
  let offset = 0;
  for (const note of notes) {
    const length = Math.floor(note.duration * SAMPLE_RATE);
    for (let i = 0; i < length; i++) {
      const t = i / SAMPLE_RATE;
      const phase = Math.sin(2 * Math.PI * note.freq * t);
      const raw = note.wave === 'square' ? Math.sign(phase) * 0.5 : phase;
      // Rövid fel- és lefutó burkológörbe, hogy ne legyen kattanás a hang elején és végén
      const fade = Math.min(1, i / 400, (length - i) / 400);
      samples[offset + i] = Math.round(raw * fade * volume * 32767);
    }
    offset += length;
  }
  return samples;
}

/**
 * PCM mintákat WAV fájlformátumba (RIFF fejléc + adat) csomagol.
 * @param {Int16Array} samples - 16 bites mono minták.
 * @returns {Buffer} A teljes WAV fájl tartalma.
 */
function toWav(samples) {
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // fmt blokk mérete
  buffer.writeUInt16LE(1, 20); // PCM formátum
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28); // bájt / másodperc
  buffer.writeUInt16LE(2, 32); // blokk igazítás
  buffer.writeUInt16LE(16, 34); // bit / minta
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) {
    buffer.writeInt16LE(samples[i], 44 + i * 2);
  }
  return buffer;
}

mkdirSync(outDir, { recursive: true });

// Helyes válasz: két emelkedő, tiszta hang (C6 → E6)
const correct = synthesize(
  [
    { freq: 1046.5, duration: 0.12 },
    { freq: 1318.5, duration: 0.22 },
  ],
  0.5,
);

// Helytelen válasz: két mély, ereszkedő, tompa négyszögjel
const wrong = synthesize(
  [
    { freq: 220, duration: 0.15, wave: 'square' },
    { freq: 165, duration: 0.3, wave: 'square' },
  ],
  0.35,
);

writeFileSync(join(outDir, 'correct.wav'), toWav(correct));
writeFileSync(join(outDir, 'wrong.wav'), toWav(wrong));
console.log(`Hangfájlok elkészültek: ${outDir}`);
