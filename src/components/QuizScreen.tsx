import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { FeedbackBanner } from './FeedbackBanner';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ScoreDisplay } from './ScoreDisplay';
import { useQuiz } from '../hooks/useQuiz';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { FEEDBACK_DELAY_MS } from '../utils/constants';

/**
 * A játék képernyője: haladás, pontszám, az aktuális kérdés és a visszajelzés.
 * Válasz után kicsit vár, majd a következő kérdésre (vagy az eredményre) lép.
 * @returns A játék képernyő.
 */
export function QuizScreen() {
  const {
    settings, questions, currentIndex, score, correctCount, answered, selectedAnswer,
    answerQuestion, timeUp, nextQuestion, finishQuiz,
  } = useQuiz();
  const { playCorrect, playWrong } = useSoundEffects(settings.soundEnabled);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleAnswer(answer: string, timeLeft: number) {
    answerQuestion(answer, timeLeft);
    if (answer === question.correctAnswer) {
      playCorrect();
    } else {
      playWrong();
    }
  }

  function handleTimeout() {
    timeUp();
    playWrong();
  }

  // Válasz után FEEDBACK_DELAY_MS ideig látszik az eredmény, utána lépünk tovább.
  // Csak az answered változására kell futnia, a többi érték ekkor már a friss állapot.
  useEffect(() => {
    if (!answered) return;
    const id = setTimeout(() => {
      if (isLast) {
        finishQuiz();
      } else {
        nextQuestion();
      }
    }, FEEDBACK_DELAY_MS);
    return () => clearTimeout(id);
  }, [answered]);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'flex-end' } }}>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <ScoreDisplay score={score} correctCount={correctCount} />
      </Stack>

      {/* A key miatt minden új kérdésnél újraindul a számláló és a keverés */}
      <QuestionCard
        key={currentIndex}
        question={question}
        answered={answered}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
      />

      {answered && (
        <FeedbackBanner
          isCorrect={selectedAnswer === question.correctAnswer}
          timedOut={selectedAnswer === null}
          correctAnswer={question.correctAnswer}
        />
      )}
    </Stack>
  );
}
