import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/**
 * Forgó betöltésjelző egy felirattal.
 * @param props - label: a kiírt szöveg.
 * @returns A betöltésjelző.
 */
export function LoadingSpinner({ label = 'Betöltés...' }: { label?: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
      <CircularProgress />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  );
}
