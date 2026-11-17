import Alert from '@mui/material/Alert';

/** A FeedbackBanner props-a. */
export type FeedbackBannerProps = {
  isCorrect: boolean;
  timedOut: boolean;
  correctAnswer: string;
};

/**
 * Visszajelzés a válasz után: helyes, rossz, vagy lejárt az idő.
 * @param props - A válasz eredménye és a helyes válasz.
 * @returns A visszajelző sáv.
 */
export function FeedbackBanner({ isCorrect, timedOut, correctAnswer }: FeedbackBannerProps) {
  if (isCorrect) {
    return <Alert severity="success" variant="filled">Helyes válasz!</Alert>;
  }
  if (timedOut) {
    return <Alert severity="warning" variant="filled">Lejárt az idő! A helyes válasz: {correctAnswer}</Alert>;
  }
  return <Alert severity="error" variant="filled">Rossz válasz. A helyes válasz: {correctAnswer}</Alert>;
}
