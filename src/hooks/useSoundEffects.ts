import { useCallback, useRef } from 'react';

/** A useSoundEffects hook visszatérési értéke. */
export interface SoundEffects {
  /** A helyes válasz hangjának lejátszása. */
  playCorrect: () => void;
  /** A helytelen válasz hangjának lejátszása. */
  playWrong: () => void;
}

/** A hangfájlok elérési útja a public mappán belül. */
const SOUND_URLS = {
  correct: `${import.meta.env.BASE_URL}sounds/correct.wav`,
  wrong: `${import.meta.env.BASE_URL}sounds/wrong.wav`,
} as const;

/**
 * Hangeffektek lejátszása HTMLAudioElement segítségével. Az Audio objektumok
 * ref-ben tárolódnak, és csak az első lejátszáskor jönnek létre.
 * @param enabled - Engedélyezettek-e a hangok.
 * @returns A hangokat lejátszó függvények.
 */
export function useSoundEffects(enabled: boolean): SoundEffects {
  const audioRef = useRef<Partial<Record<keyof typeof SOUND_URLS, HTMLAudioElement>>>({});

  const play = useCallback(
    (name: keyof typeof SOUND_URLS) => {
      if (!enabled) return;
      try {
        let audio = audioRef.current[name];
        if (!audio) {
          audio = new Audio(SOUND_URLS[name]);
          audioRef.current[name] = audio;
        }
        // Elölről indítjuk, ha az előző lejátszás még tartana
        audio.currentTime = 0;
        // A play() Promise-t ad; a böngésző autoplay-tiltása esetén csendben elnyeljük a hibát
        void audio.play().catch(() => undefined);
      } catch {
        // Az Audio API nem elérhető – a játék hang nélkül folytatódik
      }
    },
    [enabled],
  );

  const playCorrect = useCallback(() => play('correct'), [play]);
  const playWrong = useCallback(() => play('wrong'), [play]);

  return { playCorrect, playWrong };
}
