import { useCallback, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { FeedbackBanner } from './FeedbackBanner';
import { LoadingSpinner } from './LoadingSpinner';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ScoreDisplay } from './ScoreDisplay';
import { useQuiz } from '../hooks/useQuiz';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { FEEDBACK_DELAY_MS } from '../utils/constants';

/**
 * A játék képernyője: haladás, pontszám, aktuális kérdés és visszajelzés.
 * Visszajelzés után automatikusan továbblép, az utolsó kérdés után menti az eredményt.
 * @returns A kvíz nézet.
 */
export function QuizScreen() {
  const { state, dispatch, settings, setView, addResult } = useQuiz();
  const { playCorrect, playWrong } = useSoundEffects(settings.soundEnabled);
  const { questions, currentIndex, phase, selectedAnswer, lastAnswerCorrect, score, correctCount } = state;
  const question = questions[currentIndex];
  const isLast = currentIndex >= questions.length - 1;
  // A továbblépés időzítőjének azonosítója
  const advanceTimeoutRef = useRef<number | null>(null);

  const handleAnswer = useCallback(
    (answer: string, timeLeft: number) => {
      if (phase !== 'answering' || !question) return;
      dispatch({ type: 'ANSWER', answer, timeLeft });
      if (answer === question.correctAnswer) playCorrect();
      else playWrong();
    },
    [phase, question, dispatch, playCorrect, playWrong],
  );

  const handleTimeout = useCallback(() => {
    dispatch({ type: 'TIMEOUT' });
    playWrong();
  }, [dispatch, playWrong]);

  // Visszajelzés után késleltetett továbblépés; az utolsó kérdésnél mentés és eredménynézet
  useEffect(() => {
    if (phase !== 'feedback') return;
    advanceTimeoutRef.current = window.setTimeout(() => {
      if (isLast) {
        dispatch({ type: 'FINISH' });
        addResult({
          score,
          correctCount,
          total: questions.length,
          categoryName: questions[0]?.category ?? '–',
          difficulty: settings.difficulty,
        });
        setView('result');
      } else {
        dispatch({ type: 'NEXT' });
      }
    }, FEEDBACK_DELAY_MS);
    return () => {
      if (advanceTimeoutRef.current !== null) {
        window.clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
    };
  }, [phase, isLast, score, correctCount, questions, settings.difficulty, dispatch, addResult, setView]);

  if (!question) {
    return <LoadingSpinner label="Kérdés betöltése…" />;
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' }, justifyContent: 'space-between' }}
      >
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <ScoreDisplay score={score} correctCount={correctCount} />
      </Stack>

      <QuestionCard
        key={currentIndex}
        question={question}
        phase={phase}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
      />

      <FeedbackBanner
        key={currentIndex}
        open={phase === 'feedback'}
        isCorrect={lastAnswerCorrect === true}
        timedOut={phase === 'feedback' && selectedAnswer === null}
        correctAnswer={question.correctAnswer}
      />
    </Stack>
  );
}
