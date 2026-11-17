import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

/** A ScoreDisplay props-a. */
export type ScoreDisplayProps = {
  score: number;
  correctCount: number;
};

/**
 * Kiírja az eddigi pontszámot és a helyes válaszok számát.
 * @param props - A pontszám és a helyes válaszok száma.
 * @returns A pontszám kijelző.
 */
export function ScoreDisplay({ score, correctCount }: ScoreDisplayProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip icon={<StarIcon />} label={score + ' pont'} color="primary" />
      <Chip icon={<CheckCircleIcon />} label={correctCount + ' helyes'} color="success" variant="outlined" />
    </Stack>
  );
}
