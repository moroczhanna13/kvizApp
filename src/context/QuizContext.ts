import { createContext } from 'react';
import type { LeaderboardEntry, Question, QuizSettings, View } from '../types/quiz';

/** A context-ben megosztott adatok és függvények. */
export type QuizContextValue = {
  view: View;
  setView: (view: View) => void;
  settings: QuizSettings;
  updateSettings: (changes: Partial<QuizSettings>) => void;
  leaderboard: LeaderboardEntry[];

  // Az aktuális játék állapota
  questions: Question[];
  currentIndex: number;
  score: number;
  correctCount: number;
  /** Megválaszolta-e már az aktuális kérdést (vagy lejárt-e az idő). */
  answered: boolean;
  /** A kiválasztott válasz, null ha még nincs, vagy lejárt az idő. */
  selectedAnswer: string | null;

  startQuiz: (questions: Question[]) => void;
  answerQuestion: (answer: string, timeLeft: number) => void;
  timeUp: () => void;
  nextQuestion: () => void;
  finishQuiz: () => void;
  newGame: () => void;
};

/** A kvíz közös állapota, az értékét a QuizProvider adja. */
export const QuizContext = createContext<QuizContextValue | null>(null);
