import { useCallback, useMemo, useReducer, useState } from 'react';
import type { ReactNode } from 'react';
import { QuizContext } from './QuizContext';
import type { QuizContextValue } from './QuizContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { LeaderboardEntry, QuizSettings, View } from '../types/quiz';
import { DEFAULT_SETTINGS, LEADERBOARD_SIZE, STORAGE_KEYS } from '../utils/constants';
import { initialQuizState, quizReducer } from '../utils/quizReducer';
import { isLeaderboard, isQuizSettings } from '../utils/storageGuards';

/** A QuizProvider tulajdonságai. */
export interface QuizProviderProps {
  /** A context-et használó gyerek komponensek. */
  children: ReactNode;
}

/**
 * Egyedi azonosítót készít egy ranglista-bejegyzéshez.
 * @returns Egyedi szöveges azonosító.
 */
function createId(): string {
  // A crypto.randomUUID csak biztonságos (https / localhost) környezetben érhető el
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * A kvíz globális állapotát (beállítások, játékállapot, nézet, ranglista) biztosító Provider.
 * @param props - A komponens tulajdonságai.
 * @returns A context Providerrel körbevett gyerekek.
 */
export function QuizProvider({ children }: QuizProviderProps) {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);
  const [view, setView] = useState<View>('start');
  const [settings, setSettings] = useLocalStorage<QuizSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS, isQuizSettings);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>(STORAGE_KEYS.leaderboard, [], isLeaderboard);

  const updateSettings = useCallback(
    (changes: Partial<QuizSettings>) => setSettings((prev) => ({ ...prev, ...changes })),
    [setSettings],
  );

  const addResult = useCallback(
    (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
      const newEntry: LeaderboardEntry = { ...entry, id: createId(), date: new Date().toISOString() };
      // Pontszám szerint csökkenő sorrend, egyezésnél a korábbi eredmény marad elöl; csak a legjobbak maradnak meg
      setLeaderboard((prev) =>
        [...prev, newEntry].sort((a, b) => b.score - a.score || a.date.localeCompare(b.date)).slice(0, LEADERBOARD_SIZE),
      );
    },
    [setLeaderboard],
  );

  // A context értékét memoizáljuk, hogy a fogyasztók csak valódi változáskor rendereljenek újra
  const value = useMemo<QuizContextValue>(
    () => ({ settings, updateSettings, state, dispatch, view, setView, leaderboard, addResult }),
    [settings, updateSettings, state, view, leaderboard, addResult],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
