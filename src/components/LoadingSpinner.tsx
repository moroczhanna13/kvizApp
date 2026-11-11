import { memo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/** A LoadingSpinner tulajdonságai. */
export interface LoadingSpinnerProps {
  /** A pörgő jelző alatt megjelenő szöveg. */
  label?: string;
}

/**
 * Betöltésjelző forgó ikon szöveggel.
 * @param props - A komponens tulajdonságai.
 * @returns A betöltésjelző elem.
 */
export const LoadingSpinner = memo(function LoadingSpinner({ label = 'Betöltés…' }: LoadingSpinnerProps) {
  return (
    <Box role="status" aria-live="polite" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
      <CircularProgress aria-label={label} />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  );
});
