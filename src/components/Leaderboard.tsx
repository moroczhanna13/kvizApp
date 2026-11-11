import { useCallback } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LeaderboardRow } from './LeaderboardRow';
import { useQuiz } from '../hooks/useQuiz';
import { LEADERBOARD_SIZE } from '../utils/constants';

/**
 * A ranglista nézet: a localStorage-ban tárolt legjobb eredmények táblázata.
 * @returns A ranglista kártya.
 */
export function Leaderboard() {
  const { leaderboard, dispatch, setView } = useQuiz();

  const handleNewGame = useCallback(() => {
    dispatch({ type: 'RESET' });
    setView('start');
  }, [dispatch, setView]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          Ranglista
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          A {LEADERBOARD_SIZE} legjobb eredmény ezen az eszközön.
        </Typography>

        {leaderboard.length === 0 ? (
          <Alert severity="info">Még nincs elmentett eredmény. Játssz egy kört, és itt megjelenik!</Alert>
        ) : (
          <TableContainer>
            <Table size="small" aria-label="Legjobb eredmények">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Pont</TableCell>
                  <TableCell>Helyes</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Témakör</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Nehézség</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Dátum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <LeaderboardRow key={entry.id} entry={entry} rank={index + 1} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={handleNewGame} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Új játék
        </Button>
      </CardActions>
    </Card>
  );
}
