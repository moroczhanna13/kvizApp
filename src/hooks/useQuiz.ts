import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import type { QuizContextValue } from '../context/QuizContext';

/**
 * Hozzáférés a kvíz globális állapotához.
 * @returns A QuizContext aktuális értéke.
 * @throws {Error} Ha a hookot QuizProvider-en kívül használják.
 */
export function useQuiz(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('A useQuiz hookot csak QuizProvider-en belül lehet használni.');
  }
  return context;
}
