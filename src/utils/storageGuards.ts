import type { Difficulty, LeaderboardEntry, QuizSettings } from '../types/quiz';
import { QUESTION_COUNT_OPTIONS } from './constants';

/**
 * Ellenőrzi, hogy egy érték érvényes nehézségi szint-e.
 * @param value - A vizsgált érték.
 * @returns Igaz, ha 'easy', 'medium' vagy 'hard'.
 */
export function isDifficulty(value: unknown): value is Difficulty {
  return value === 'easy' || value === 'medium' || value === 'hard';
}

/**
 * Ellenőrzi a localStorage-ból beolvasott beállítások alakját.
 * @param value - A beolvasott érték.
 * @returns Igaz, ha az érték érvényes QuizSettings.
 */
export function isQuizSettings(value: unknown): value is QuizSettings {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.categoryId === 'number' &&
    isDifficulty(v.difficulty) &&
    typeof v.amount === 'number' &&
    (QUESTION_COUNT_OPTIONS as readonly number[]).includes(v.amount) &&
    typeof v.soundEnabled === 'boolean'
  );
}

/**
 * Ellenőrzi a localStorage-ból beolvasott ranglista alakját.
 * @param value - A beolvasott érték.
 * @returns Igaz, ha az érték LeaderboardEntry elemek tömbje.
 */
export function isLeaderboard(value: unknown): value is LeaderboardEntry[] {
  return (
    Array.isArray(value) &&
    value.every((item: unknown) => {
      if (typeof item !== 'object' || item === null) return false;
      const e = item as Record<string, unknown>;
      return (
        typeof e.id === 'string' &&
        typeof e.score === 'number' &&
        typeof e.correctCount === 'number' &&
        typeof e.total === 'number' &&
        typeof e.categoryName === 'string' &&
        isDifficulty(e.difficulty) &&
        typeof e.date === 'string'
      );
    })
  );
}
