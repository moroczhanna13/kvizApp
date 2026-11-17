import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

/**
 * A kvíz közös állapotának elérése bármelyik komponensből.
 * @returns A QuizContext értéke.
 */
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('A useQuiz csak QuizProvider-en belül használható!');
  }
  return context;
}
