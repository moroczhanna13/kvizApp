import { useCallback, useMemo, useState } from 'react';
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
import { calculatePercentage } from '../utils/scoring';
import { DIFFICULTY_LABELS } from '../utils/constants';

/**
 * Az eredmény arányától függő értékelő szöveget ad.
 * @param percent - A helyes válaszok aránya százalékban.
 * @returns Rövid magyar nyelvű értékelés.
 */
function getVerdict(percent: number): string {
  if (percent >= 90) return 'Kiváló teljesítmény!';
  if (percent >= 70) return 'Szép munka!';
  if (percent >= 40) return 'Nem rossz, de van még hova fejlődni.';
  return 'Legközelebb jobban megy majd!';
}

/**
 * Az eredményoldal: pontszám, helyes válaszok aránya és navigáció.
 * Megjelenéskor értesít arról, hogy az eredmény a ranglistára került.
 * @returns Az eredmény nézet.
 */
export function ResultScreen() {
  const { state, settings, dispatch, setView } = useQuiz();
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const total = state.questions.length;

  // A származtatott statisztikák csak az állapot változásakor számolódnak újra
  const stats = useMemo(() => {
    const percent = calculatePercentage(state.correctCount, total);
    return { percent, verdict: getVerdict(percent) };
  }, [state.correctCount, total]);

  const handleNewGame = useCallback(() => {
    dispatch({ type: 'RESET' });
    setView('start');
  }, [dispatch, setView]);

  const handleLeaderboard = useCallback(() => setView('leaderboard'), [setView]);
  const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <EmojiEventsIcon color="warning" sx={{ fontSize: 72 }} aria-hidden="true" />
            <div>
              <Typography variant="h4" component="h2" gutterBottom>
                Vége a játéknak
              </Typography>
              <Typography color="text.secondary">{stats.verdict}</Typography>
            </div>

            <Typography variant="h2" component="p" color="primary" sx={{ fontWeight: 700 }}>
              {state.score} <Box component="span" sx={{ fontSize: '1.5rem' }}>pont</Box>
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 420 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                <Typography>
                  Helyes válaszok: {state.correctCount} / {total}
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{stats.percent}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={stats.percent}
                color={stats.percent >= 50 ? 'success' : 'error'}
                aria-label="Helyes válaszok aránya"
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>

            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip label={state.questions[0]?.category ?? '–'} color="secondary" variant="outlined" />
              <Chip label={DIFFICULTY_LABELS[settings.difficulty]} />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <Button variant="contained" startIcon={<ReplayIcon />} onClick={handleNewGame} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            Új játék
          </Button>
          <Button
            variant="outlined"
            startIcon={<LeaderboardIcon />}
            onClick={handleLeaderboard}
            sx={{ width: { xs: '100%', sm: 'auto' }, ml: { xs: '0 !important', sm: 1 } }}
          >
            Ranglista
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Az eredményt elmentettük.
        </Alert>
      </Snackbar>
    </>
  );
}
