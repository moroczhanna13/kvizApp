import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiErrorKind, Question, QuizSettings } from '../types/quiz';
import { fetchQuestions, isAbortError, QuizApiError } from '../utils/api';

/** A useQuestions hook visszatérési értéke. */
export interface UseQuestionsResult {
  /** Folyamatban van-e a lekérés. */
  loading: boolean;
  /** A legutóbbi lekérés hibájának fajtája. */
  error: ApiErrorKind | null;
  /** Új lekérés indítása a megadott beállításokkal. */
  load: (settings: QuizSettings) => void;
}

/** Egy lekérési kérés; az id miatt azonos beállításokkal is újraindítható. */
interface QuestionRequest {
  id: number;
  settings: QuizSettings;
}

/**
 * Kérdéseket kér le az Open Trivia DB-ből. A lekérés a `load` hívására indul
 * (nem a komponens megjelenésekor), így Strict Mode-ban sem fut le kétszer,
 * ami a szigorú rate limit miatt fontos.
 * @param onLoaded - Sikeres lekérés után meghívott függvény a kérdésekkel.
 * @returns A betöltési és hibaállapot, valamint a lekérést indító függvény.
 */
export function useQuestions(onLoaded: (questions: Question[]) => void): UseQuestionsResult {
  const [request, setRequest] = useState<QuestionRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorKind | null>(null);
  // A legfrissebb callbacket ref-ben tartjuk, hogy ne kelljen az effect függőségei közé tenni
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    if (!request) return;
    // "mounted" flag: ha a komponens közben megszűnik, nem frissítünk állapotot
    let mounted = true;
    const controller = new AbortController();

    fetchQuestions(request.settings, controller.signal)
      .then((questions) => {
        if (!mounted) return;
        setLoading(false);
        onLoadedRef.current(questions);
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
  }, [request]);

  const load = useCallback((settings: QuizSettings) => {
    setLoading(true);
    setError(null);
    setRequest((prev) => ({ id: (prev?.id ?? 0) + 1, settings }));
  }, []);

  return { loading, error, load };
}
