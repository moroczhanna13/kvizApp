import type { QuizAction, QuizState } from '../types/quiz';
import { calculatePoints } from './scoring';

/** A játék kiinduló állapota (nincs futó játék). */
export const initialQuizState: QuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  phase: 'answering',
  selectedAnswer: null,
  lastAnswerCorrect: null,
  score: 0,
  correctCount: 0,
};

/**
 * A játékállapot tiszta reducere: a régi állapotból és egy akcióból új állapotot állít elő,
 * mellékhatás nélkül.
 * @param state - Az aktuális állapot.
 * @param action - A végrehajtandó akció.
 * @returns Az új állapot (vagy a régi, ha az akció az adott helyzetben érvénytelen).
 */
export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      // Új játék: minden számláló nullázódik, az első kérdéssel indulunk
      return {
        ...initialQuizState,
        status: 'playing',
        questions: action.questions,
      };

    case 'ANSWER': {
      // Csak futó játékban, válaszadási fázisban fogadunk el választ (dupla kattintás ellen)
      if (state.status !== 'playing' || state.phase !== 'answering') return state;
      const question = state.questions[state.currentIndex];
      if (!question) return state;
      const isCorrect = action.answer === question.correctAnswer;
      return {
        ...state,
        phase: 'feedback',
        selectedAnswer: action.answer,
        lastAnswerCorrect: isCorrect,
        score: isCorrect ? state.score + calculatePoints(question.difficulty, action.timeLeft) : state.score,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      };
    }

    case 'TIMEOUT':
      // Lejárt az idő: helytelen válaszként számít, de nincs kiválasztott válasz
      if (state.status !== 'playing' || state.phase !== 'answering') return state;
      return {
        ...state,
        phase: 'feedback',
        selectedAnswer: null,
        lastAnswerCorrect: false,
      };

    case 'NEXT':
      // Továbblépés csak visszajelzés után, és csak ha van még kérdés
      if (state.phase !== 'feedback' || state.currentIndex >= state.questions.length - 1) return state;
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        phase: 'answering',
        selectedAnswer: null,
        lastAnswerCorrect: null,
      };

    case 'FINISH':
      if (state.status !== 'playing') return state;
      return { ...state, status: 'finished' };

    case 'RESET':
      return initialQuizState;

    default:
      return state;
  }
}
