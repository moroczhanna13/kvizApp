import type { Difficulty, QuizSettings } from '../types/quiz';

/** Az Open Trivia DB API alapcíme. */
export const API_BASE_URL = 'https://opentdb.com';

/** Egy kérdésre adott időkorlát másodpercben. */
export const QUESTION_TIME_LIMIT = 15;

/** A visszajelzés megjelenítésének ideje a következő kérdés előtt (ms). */
export const FEEDBACK_DELAY_MS = 1800;

/** A választható kérdésszámok. */
export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20] as const;

/** A ranglistán megőrzött eredmények maximális száma. */
export const LEADERBOARD_SIZE = 10;

/** A localStorage kulcsok. */
export const STORAGE_KEYS = {
  settings: 'kvizApp.settings',
  leaderboard: 'kvizApp.leaderboard',
} as const;

/** Az alapértelmezett beállítások (General Knowledge, könnyű, 10 kérdés). */
export const DEFAULT_SETTINGS: QuizSettings = {
  categoryId: 9,
  difficulty: 'easy',
  amount: 10,
  soundEnabled: true,
};

/** A nehézségi szintek magyar megnevezése. */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Könnyű',
  medium: 'Közepes',
  hard: 'Nehéz',
};

/** A helyes válaszért járó alappont nehézségenként. */
export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};
