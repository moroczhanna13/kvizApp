import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

/** A ProgressBar props-a. */
export type ProgressBarProps = {
  /** Hányadik kérdésnél tartunk (1-től). */
  current: number;
  total: number;
};

/**
 * Sáv, ami mutatja, hányadik kérdésnél tart a játékos.
 * @param props - Az aktuális kérdés sorszáma és az összes kérdés száma.
 * @returns A haladásjelző.
 */
export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {current}. kérdés / {total}
      </Typography>
      <LinearProgress variant="determinate" value={(current / total) * 100} sx={{ height: 8, borderRadius: 4 }} />
    </Box>
  );
}
