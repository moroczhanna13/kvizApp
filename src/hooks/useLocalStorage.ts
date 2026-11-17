import { useEffect, useState } from 'react';

//használata: QuizProvider-ben, a beállítások és a ranglista mentésére

/**
 * Olyan állapot, ami localStorage-ba is mentődik, így újratöltés után is megmarad.
 * @param key - A localStorage kulcs.
 * @param defaultValue - Ezt használjuk, ha még nincs mentett érték.
 * @returns Az érték és a beállító függvény, ugyanúgy mint a useState-nél.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return defaultValue;
    try {
      return JSON.parse(saved);
    } catch {
      // Ha valami rossz van elmentve, az alapértéket használjuk
      return defaultValue;
    }
  });

  // Minden változásnál elmentjük az új értéket
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
