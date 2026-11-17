import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/** A Timer props-a. */
export type TimerProps = {
  timeLeft: number;
  total: number;
};

/**
 * Kör alakú visszaszámláló, az utolsó 5 másodpercben piros.
 * @param props - A hátralévő és a teljes idő másodpercben.
 * @returns A visszaszámláló.
 */
export function Timer({ timeLeft, total }: TimerProps) {
  const color = timeLeft <= 5 ? 'error' : 'primary';

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={(timeLeft / total) * 100} color={color} size={56} thickness={5} />
      {/* A szám a kör közepére kerül */}
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color={color}>
          {timeLeft}
        </Typography>
      </Box>
    </Box>
  );
}
