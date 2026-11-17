import type { Difficulty, QuizSettings } from '../types/quiz';

/** Egy kérdésre ennyi másodperc van. */
export const QUESTION_TIME_LIMIT = 15;

/** Ennyi ideig látszik a visszajelzés a következő kérdés előtt (ms). */
export const FEEDBACK_DELAY_MS = 1800;

/** A választható kérdésszámok. */
export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20];

/** Ennyi eredményt tartunk meg a ranglistán. */
export const LEADERBOARD_SIZE = 10;

/** Alapbeállítások: General Knowledge (9), könnyű, 10 kérdés. */
export const DEFAULT_SETTINGS: QuizSettings = {
  categoryId: 9,
  difficulty: 'easy',
  amount: 10,
  soundEnabled: true,
};

/** A nehézségek magyar nevei. */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Könnyű',
  medium: 'Közepes',
  hard: 'Nehéz',
};

/** Ennyi pont jár egy helyes válaszért nehézségtől függően. */
export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};
