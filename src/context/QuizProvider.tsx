import { useState } from 'react';
import type { ReactNode } from 'react';
import { QuizContext } from './QuizContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { LeaderboardEntry, Question, QuizSettings, View } from '../types/quiz';
import { DEFAULT_SETTINGS, DIFFICULTY_POINTS, LEADERBOARD_SIZE } from '../utils/constants';

/**
 * A kvíz közös állapotát (nézet, beállítások, játék, ranglista) adja a gyerek komponenseknek.
 * @param props - children: a context-et használó komponensek.
 * @returns A Provider a gyerekekkel.
 */
export function QuizProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('start');
  const [settings, setSettings] = useLocalStorage<QuizSettings>('kvizApp.settings', DEFAULT_SETTINGS);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('kvizApp.leaderboard', []);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  function updateSettings(changes: Partial<QuizSettings>) {
    setSettings({ ...settings, ...changes });
  }

  function startQuiz(newQuestions: Question[]) {
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setView('quiz');
  }

  function answerQuestion(answer: string, timeLeft: number) {
    // Egy kérdésre csak egyszer lehet válaszolni
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(answer);

    const question = questions[currentIndex];
    if (answer === question.correctAnswer) {
      // Pont = nehézség szerinti alappont + a hátralévő másodpercek
      setScore(score + DIFFICULTY_POINTS[question.difficulty] + timeLeft);
      setCorrectCount(correctCount + 1);
    }
  }

  function timeUp() {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(null);
  }

  function nextQuestion() {
    setCurrentIndex(currentIndex + 1);
    setAnswered(false);
    setSelectedAnswer(null);
  }

  function finishQuiz() {
    const entry: LeaderboardEntry = {
      id: Date.now(),
      score,
      correctCount,
      total: questions.length,
      categoryName: questions[0]?.category ?? '-',
      difficulty: settings.difficulty,
      date: new Date().toISOString(),
    };
    // Pontszám szerint csökkenő sorrend, csak a legjobb 10 marad
    const newList = [...leaderboard, entry].sort((a, b) => b.score - a.score).slice(0, LEADERBOARD_SIZE);
    setLeaderboard(newList);
    setView('result');
  }

  function newGame() {
    setQuestions([]);
    setView('start');
  }

  return (
    <QuizContext.Provider
      value={{
        view, setView, settings, updateSettings, leaderboard,
        questions, currentIndex, score, correctCount, answered, selectedAnswer,
        startQuiz, answerQuestion, timeUp, nextQuestion, finishQuiz, newGame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
