import { memo } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

/** A ProgressBar tulajdonságai. */
export interface ProgressBarProps {
  /** Az aktuális kérdés sorszáma (1-től számozva). */
  current: number;
  /** Az összes kérdés száma. */
  total: number;
}

/**
 * A játék előrehaladását mutató sáv a kérdés sorszámával.
 * @param props - A komponens tulajdonságai.
 * @returns A haladásjelző elem.
 */
export const ProgressBar = memo(function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  return (
    <Box sx={{ flexGrow: 1, minWidth: 160 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {current}. kérdés / {total}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percent}
        aria-label="Haladás a kvízben"
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
});
