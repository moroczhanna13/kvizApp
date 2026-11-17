import { useRef } from 'react';

/**
 * Hangok lejátszása helyes és rossz válasznál (Audio API).
 * @param enabled - Be van-e kapcsolva a hang.
 * @returns A két lejátszó függvény.
 */
export function useSoundEffects(enabled: boolean) {
  // Ref-ben tároljuk, hogy ne jöjjön létre minden rendernél új lejátszó
  const correctSound = useRef(new Audio('/sounds/correct.wav'));
  const wrongSound = useRef(new Audio('/sounds/wrong.wav'));

  function play(audio: HTMLAudioElement) {
    if (!enabled) return;
    audio.currentTime = 0;
    // A böngésző néha letiltja a lejátszást, ilyenkor nem csinálunk semmit
    audio.play().catch(() => {});
  }

  return {
    playCorrect: () => play(correctSound.current),
    playWrong: () => play(wrongSound.current),
  };
}
