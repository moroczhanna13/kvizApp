import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AnswerButton } from './AnswerButton';
import type { AnswerButtonProps } from './AnswerButton';
import { Timer } from './Timer';
import { useCountdown } from '../hooks/useCountdown';
import type { Question } from '../types/quiz';
import { DIFFICULTY_LABELS, QUESTION_TIME_LIMIT } from '../utils/constants';

/** A QuestionCard props-a. */
export type QuestionCardProps = {
  question: Question;
  answered: boolean;
  selectedAnswer: string | null;
  onAnswer: (answer: string, timeLeft: number) => void;
  onTimeout: () => void;
};

/**
 * Összekeveri a tömb elemeit (Fisher-Yates keverés), az eredetit nem módosítja.
 * @param items - A keverendő tömb.
 * @returns Új, összekevert tömb.
 */
function shuffle(items: string[]): string[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Egy kérdés kártyája a visszaszámlálóval és a négy válaszgombbal.
 * @param props - A kérdés, a válasz állapota és az eseménykezelők.
 * @returns A kérdés kártya.
 */
export function QuestionCard({ question, answered, selectedAnswer, onAnswer, onTimeout }: QuestionCardProps) {
  // useMemo nélkül minden másodpercben (újrarendernél) összekeveredne a sorrend
  const answers = useMemo(
    () => shuffle([question.correctAnswer, ...question.incorrectAnswers]),
    [question],
  );

  const timeLeft = useCountdown(QUESTION_TIME_LIMIT, !answered, onTimeout);

  /**
   * Megadja, milyen színű legyen egy válaszgomb.
   * @param answer - A válasz szövege.
   * @returns A gomb állapota.
   */
  function getStatus(answer: string): AnswerButtonProps['status'] {
    if (!answered) return 'idle';
    if (answer === question.correctAnswer) return 'correct';
    if (answer === selectedAnswer) return 'wrong';
    return 'dimmed';
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Chip label={question.category} size="small" color="secondary" variant="outlined" />
              <Chip label={DIFFICULTY_LABELS[question.difficulty]} size="small" />
            </Stack>
            <Timer timeLeft={timeLeft} total={QUESTION_TIME_LIMIT} />
          </Stack>

          <Typography variant="h5" component="h2">
            {question.question}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            {answers.map((answer, index) => (
              <AnswerButton
                key={answer}
                answer={answer}
                index={index}
                status={getStatus(answer)}
                disabled={answered}
                onClick={() => onAnswer(answer, timeLeft)}
              />
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
