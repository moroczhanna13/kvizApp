import { useCallback, useEffect, useState } from 'react';
import type { ApiErrorKind, Category } from '../types/quiz';
import { fetchCategories, isAbortError, QuizApiError } from '../utils/api';

/** A useCategories hook visszatérési értéke. */
export interface UseCategoriesResult {
  /** A betöltött kategóriák. */
  categories: Category[];
  /** Folyamatban van-e a betöltés. */
  loading: boolean;
  /** A hiba fajtája, ha a betöltés sikertelen volt. */
  error: ApiErrorKind | null;
  /** A betöltés újrapróbálása. */
  retry: () => void;
}

/**
 * Lekéri az Open Trivia DB kategóriáit a komponens megjelenésekor.
 * @returns A kategóriák, a betöltési és hibaállapot, valamint az újrapróbáló függvény.
 */
export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorKind | null>(null);
  // Növelésével újraindítható a lekérés
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // A "mounted" flag megakadályozza, hogy megszűnt komponens állapotát frissítsük
    let mounted = true;
    const controller = new AbortController();

    fetchCategories(controller.signal)
      .then((data) => {
        if (!mounted) return;
        setCategories(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!mounted || isAbortError(err)) return;
        setError(err instanceof QuizApiError ? err.kind : 'network');
        setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    setAttempt((n) => n + 1);
  }, []);

  return { categories, loading, error, retry };
}
