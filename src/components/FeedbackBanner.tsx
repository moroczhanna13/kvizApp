import { memo } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

/** A FeedbackBanner tulajdonságai. */
export interface FeedbackBannerProps {
  /** Látható-e a visszajelzés. */
  open: boolean;
  /** Helyes volt-e a válasz. */
  isCorrect: boolean;
  /** Lejárt-e az idő (nem érkezett válasz). */
  timedOut: boolean;
  /** A helyes válasz, amit rossz válasz esetén megmutatunk. */
  correctAnswer: string;
}

/**
 * Válaszadás utáni visszajelzés: helyes, helytelen vagy lejárt idő.
 * @param props - A komponens tulajdonságai.
 * @returns Egy lenyíló Alert elem.
 */
export const FeedbackBanner = memo(function FeedbackBanner({ open, isCorrect, timedOut, correctAnswer }: FeedbackBannerProps) {
  const severity = isCorrect ? 'success' : timedOut ? 'warning' : 'error';
  const text = isCorrect
    ? 'Helyes válasz!'
    : timedOut
      ? `Lejárt az idő! A helyes válasz: ${correctAnswer}`
      : `Helytelen válasz. A helyes válasz: ${correctAnswer}`;

  return (
    <Collapse in={open} unmountOnExit>
      <Alert severity={severity} variant="filled">
        {text}
      </Alert>
    </Collapse>
  );
});
