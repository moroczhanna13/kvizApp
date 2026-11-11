import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * Egy localStorage-ban (JSON-ként) megőrzött állapotot kezelő hook.
 * Hibás vagy hiányzó tárolt értéknél, illetve elérhetetlen localStorage esetén
 * az alapértelmezett értéket használja, kivételt nem dob.
 * @param key - A localStorage kulcs.
 * @param defaultValue - Az alapértelmezett érték.
 * @param isValid - Opcionális ellenőrző függvény a beolvasott érték alakjára.
 * @returns Az aktuális érték és a beállító függvény, mint a useState-nél.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  isValid?: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  // Lusta kezdőérték: a localStorage-ot csak az első rendereléskor olvassuk
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return defaultValue;
      const parsed: unknown = JSON.parse(stored);
      if (isValid && !isValid(parsed)) return defaultValue;
      return parsed as T;
    } catch {
      return defaultValue;
    }
  });

  // Minden változáskor visszaírjuk az értéket; a tárhely megtelése vagy tiltása nem okozhat hibát
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // A localStorage nem elérhető (pl. privát mód) – az alkalmazás tárolás nélkül is működik
    }
  }, [key, value]);

  return [value, setValue];
}
