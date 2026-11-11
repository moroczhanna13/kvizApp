import { useCallback, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AnswerButton } from './AnswerButton';
import type { AnswerStatus } from './AnswerButton';
import { Timer } from './Timer';
import { useCountdown } from '../hooks/useCountdown';
import type { Question, QuestionPhase } from '../types/quiz';
import { DIFFICULTY_LABELS, QUESTION_TIME_LIMIT } from '../utils/constants';
import { shuffleArray } from '../utils/shuffle';

/** A QuestionCard tulajdonságai. */
export interface QuestionCardProps {
  /** A megjelenítendő kérdés. */
  question: Question;
  /** A kérdés fázisa (válaszadás vagy visszajelzés). */
  phase: QuestionPhase;
  /** A kiválasztott válasz, ha van. */
  selectedAnswer: string | null;
  /** Válaszadáskor meghívott függvény a válasszal és a hátralévő idővel. */
  onAnswer: (answer: string, timeLeft: number) => void;
  /** Az idő lejártakor meghívott függvény. */
  onTimeout: () => void;
}

/**
 * Egy kérdés kártyája a visszaszámlálóval és a négy (összekevert) válaszgombbal.
 * Kérdésenként újra kell csatolni (key), hogy a számláló és a keverés újrainduljon.
 * @param props - A komponens tulajdonságai.
 * @returns A kérdéskártya elem.
 */
export function QuestionCard({ question, phase, selectedAnswer, onAnswer, onTimeout }: QuestionCardProps) {
  // Válaszkeverés: kérdésenként egyszer történik, újrarenderelésnél (pl. óraütésnél) nem változik a sorrend
  const answers = useMemo(
    () => shuffleArray([question.correctAnswer, ...question.incorrectAnswers]),
    [question],
  );

  const timeLeft = useCountdown(QUESTION_TIME_LIMIT, phase === 'answering', onTimeout);

  // A hátralévő időt ref-ben is tároljuk, így a kattintáskezelő nem változik másodpercenként,
  // és a memo-zott AnswerButton-ök nem renderelnek feleslegesen újra
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const handleSelect = useCallback((answer: string) => onAnswer(answer, timeLeftRef.current), [onAnswer]);

  /**
   * Meghatározza egy válaszgomb megjelenését az aktuális fázis alapján.
   * @param answer - A válasz szövege.
   * @returns A gomb állapota.
   */
  const getStatus = (answer: string): AnswerStatus => {
    if (phase === 'answering') return 'idle';
    if (answer === question.correctAnswer) return 'correct';
    if (answer === selectedAnswer) return 'wrong';
    return 'dimmed';
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Chip label={question.category} size="small" color="secondary" variant="outlined" />
              <Chip label={DIFFICULTY_LABELS[question.difficulty]} size="small" />
            </Stack>
            <Timer timeLeft={timeLeft} total={QUESTION_TIME_LIMIT} />
          </Stack>

          <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            {question.question}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            {answers.map((answer, index) => (
              <AnswerButton
                key={`${index}-${answer}`}
                answer={answer}
                index={index}
                status={getStatus(answer)}
                disabled={phase !== 'answering'}
                onSelect={handleSelect}
              />
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
