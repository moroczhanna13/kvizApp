import { memo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/** A Timer tulajdonságai. */
export interface TimerProps {
  /** A hátralévő idő másodpercben. */
  timeLeft: number;
  /** A teljes időkorlát másodpercben. */
  total: number;
}

/** Ennyi másodperc alatt piros a visszaszámláló. */
const WARNING_THRESHOLD = 5;

/**
 * Kör alakú visszaszámláló, amely az utolsó másodpercekben pirosra vált.
 * @param props - A komponens tulajdonságai.
 * @returns A visszaszámláló elem.
 */
export const Timer = memo(function Timer({ timeLeft, total }: TimerProps) {
  const percent = total > 0 ? (timeLeft / total) * 100 : 0;
  const color = timeLeft <= WARNING_THRESHOLD ? 'error' : 'primary';

  return (
    <Box
      role="timer"
      aria-label={`Hátralévő idő: ${timeLeft} másodperc`}
      sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}
    >
      <CircularProgress variant="determinate" value={percent} color={color} size={56} thickness={5} />
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="span" color={timeLeft <= WARNING_THRESHOLD ? 'error' : 'text.primary'}>
          {timeLeft}
        </Typography>
      </Box>
    </Box>
  );
});
