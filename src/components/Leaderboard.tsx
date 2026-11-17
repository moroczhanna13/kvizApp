import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LeaderboardRow } from './LeaderboardRow';
import { useQuiz } from '../hooks/useQuiz';
import { LEADERBOARD_SIZE } from '../utils/constants';

/**
 * A ranglista: a localStorage-ban mentett legjobb eredmények táblázatban.
 * @returns A ranglista képernyő.
 */
export function Leaderboard() {
  const { leaderboard, newGame } = useQuiz();

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
          <Alert severity="info">Még nincs eredmény. Játssz egy kört!</Alert>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Pont</TableCell>
                <TableCell>Helyes</TableCell>
                {/* Mobilon ezek az oszlopok nem férnek ki, ezért elrejtjük őket */}
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Témakör</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Nehézség</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Dátum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <LeaderboardRow key={entry.id} entry={entry} rank={index + 1} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={newGame}>
          Új játék
        </Button>
      </CardActions>
    </Card>
  );
}
