import { useEffect, useState } from 'react';
import type { Category } from '../types/quiz';
import { fetchCategories } from '../utils/api';

/**
 * Betölti a témaköröket az API-ból.
 * @returns A témakörök, a betöltés és hiba állapota, és egy újrapróbáló függvény.
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    setError('');
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  // Csak egyszer, az első megjelenéskor töltjük be
  useEffect(() => {
    load();
  }, []);

  return { categories, loading, error, retry: load };
}
