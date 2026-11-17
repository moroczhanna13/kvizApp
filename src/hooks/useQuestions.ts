import { useState } from 'react';
import type { Question, QuizSettings } from '../types/quiz';
import { fetchQuestions } from '../utils/api';

/**
 * Kérdések lekérése gombnyomásra (nem automatikusan, mert az API-nak szigorú a limitje).
 * @returns A betöltés és hiba állapota, és a load függvény, ami visszaadja a kérdéseket.
 */
export function useQuestions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load(settings: QuizSettings): Promise<Question[] | undefined> {
    setLoading(true);
    setError('');
    try {
      return await fetchQuestions(settings);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ismeretlen hiba történt.');
      return undefined;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, load };
}
