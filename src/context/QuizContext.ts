import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { LeaderboardEntry, QuizAction, QuizSettings, QuizState, View } from '../types/quiz';

/** A QuizContext által megosztott értékek. */
export interface QuizContextValue {
  /** Az aktuális (megőrzött) beállítások. */
  settings: QuizSettings;
  /** A beállítások részleges frissítése. */
  updateSettings: (changes: Partial<QuizSettings>) => void;
  /** A játék állapota. */
  state: QuizState;
  /** A játékállapot reducerének dispatch függvénye. */
  dispatch: Dispatch<QuizAction>;
  /** Az aktuális nézet. */
  view: View;
  /** Nézetváltás. */
  setView: (view: View) => void;
  /** A ranglista, pontszám szerint csökkenő sorrendben. */
  leaderboard: LeaderboardEntry[];
  /** Egy eredmény felvétele a ranglistára. */
  addResult: (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => void;
}

/** A kvíz globális állapotát megosztó context; értékét a QuizProvider adja. */
export const QuizContext = createContext<QuizContextValue | null>(null);
