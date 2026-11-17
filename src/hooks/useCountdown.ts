import { useEffect, useState } from 'react';

/**
 * Visszaszámláló, ami másodpercenként eggyel csökken, és nullánál meghívja az onTimeout-ot.
 * Új kérdésnél a komponens key-e változik, így a számláló elölről indul.
 * @param seconds - Kezdő érték másodpercben.
 * @param running - Fut-e a számláló (válasz után megáll).
 * @param onTimeout - Ezt hívjuk meg, ha lejárt az idő.
 * @returns A hátralévő másodpercek.
 */
export function useCountdown(seconds: number, running: boolean, onTimeout: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!running) return;
    if (timeLeft === 0) {
      onTimeout();
      return;
    }
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    // Ha közben válaszolt, vagy eltűnik a komponens, leállítjuk az időzítőt
    return () => clearTimeout(id);
  }, [timeLeft, running]);

  return timeLeft;
}
