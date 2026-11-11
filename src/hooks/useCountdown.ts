import { useEffect, useRef, useState } from 'react';

/**
 * Másodpercenként csökkenő visszaszámláló. Amíg `running` igaz, egy setInterval
 * léptet; nullánál egyszer meghívja az `onExpire` függvényt.
 * Új kérdésnél a hívó komponenst újra kell csatolni (key), így a számláló újraindul.
 * @param duration - A kezdő érték másodpercben.
 * @param running - Fut-e a visszaszámlálás.
 * @param onExpire - Az idő lejártakor meghívott függvény.
 * @returns A hátralévő másodpercek száma.
 */
export function useCountdown(duration: number, running: boolean, onExpire: () => void): number {
  const [timeLeft, setTimeLeft] = useState(duration);
  // Az intervallum azonosítója ref-ben, hogy a takarítás biztosan a jót állítsa le
  const intervalRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Időzítő: csak futó állapotban léptet, leálláskor és lecsatoláskor takarít
  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  // Lejárat figyelése: nullánál leállítjuk az intervallumot és jelzünk a hívónak
  useEffect(() => {
    if (!running || timeLeft > 0) return;
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onExpireRef.current();
  }, [running, timeLeft]);

  return timeLeft;
}
