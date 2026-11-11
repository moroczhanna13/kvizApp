import { memo } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

/** A ScoreDisplay tulajdonságai. */
export interface ScoreDisplayProps {
  /** Az aktuális pontszám. */
  score: number;
  /** Az eddigi helyes válaszok száma. */
  correctCount: number;
}

/**
 * Az aktuális pontszámot és a helyes válaszok számát mutató Chip-ek.
 * @param props - A komponens tulajdonságai.
 * @returns A pontszámkijelző elem.
 */
export const ScoreDisplay = memo(function ScoreDisplay({ score, correctCount }: ScoreDisplayProps) {
  return (
    <Stack direction="row" spacing={1} aria-live="polite">
      <Chip icon={<StarIcon />} label={`${score} pont`} color="primary" />
      <Chip icon={<CheckCircleIcon />} label={`${correctCount} helyes`} color="success" variant="outlined" />
    </Stack>
  );
});
