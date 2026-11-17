import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ReplayIcon from '@mui/icons-material/Replay';
import { useQuiz } from '../hooks/useQuiz';
import { DIFFICULTY_LABELS } from '../utils/constants';

/**
 * Az eredmény alapján ad egy rövid értékelést.
 * @param percent - A helyes válaszok aránya százalékban.
 * @returns Az értékelés szövege.
 */
function getVerdict(percent: number): string {
  if (percent >= 90) return 'Kiváló!';
  if (percent >= 70) return 'Szép munka!';
  if (percent >= 40) return 'Nem rossz, de lehet még jobb.';
  return 'Legközelebb jobban megy majd!';
}

/**
 * Az eredmény képernyő a játék végén: pontszám, helyes válaszok aránya, gombok.
 * @returns Az eredmény képernyő.
 */
export function ResultScreen() {
  const { score, correctCount, questions, settings, newGame, setView } = useQuiz();
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const total = questions.length;
  const percent = Math.round((correctCount / total) * 100);

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <EmojiEventsIcon color="warning" sx={{ fontSize: 72 }} />
            <div>
              <Typography variant="h4" component="h2" gutterBottom>
                Vége a játéknak
              </Typography>
              <Typography color="text.secondary">{getVerdict(percent)}</Typography>
            </div>

            <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>
              {score} pont
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 420 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                <Typography>Helyes válaszok: {correctCount} / {total}</Typography>
                <Typography sx={{ fontWeight: 700 }}>{percent}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={percent}
                color={percent >= 50 ? 'success' : 'error'}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>

            <Stack direction="row" spacing={1}>
              <Chip label={questions[0]?.category} color="secondary" variant="outlined" />
              <Chip label={DIFFICULTY_LABELS[settings.difficulty]} />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ pb: 2, justifyContent: 'center' }}>
          <Button variant="contained" startIcon={<ReplayIcon />} onClick={newGame}>
            Új játék
          </Button>
          <Button variant="outlined" startIcon={<LeaderboardIcon />} onClick={() => setView('leaderboard')}>
            Ranglista
          </Button>
        </CardActions>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Az eredményt elmentettük a ranglistára.
        </Alert>
      </Snackbar>
    </>
  );
}
