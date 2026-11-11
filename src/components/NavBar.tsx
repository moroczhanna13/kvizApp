import { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import QuizIcon from '@mui/icons-material/Quiz';
import { SoundToggle } from './SoundToggle';
import { useQuiz } from '../hooks/useQuiz';

/** Kis kijelzőn elrejtett, nagyobb kijelzőn látható gombfelirat stílusa. */
const responsiveLabel = { display: { xs: 'none', sm: 'inline' } } as const;

/**
 * A felső navigációs sáv: alkalmazásnév, nézetváltó gombok és hangkapcsoló.
 * Játék közben a nézetváltó gombok le vannak tiltva, hogy a futó kvíz ne szakadjon meg.
 * @returns Az AppBar elem.
 */
export function NavBar() {
  const { view, setView, dispatch } = useQuiz();
  const inGame = view === 'quiz';

  const goHome = useCallback(() => {
    dispatch({ type: 'RESET' });
    setView('start');
  }, [dispatch, setView]);

  const goLeaderboard = useCallback(() => setView('leaderboard'), [setView]);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1 }}>
        <QuizIcon aria-hidden="true" />
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Kvíz
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={goHome}
            disabled={inGame}
            aria-label="Kezdőlap"
            aria-current={view === 'start' ? 'page' : undefined}
          >
            <Box component="span" sx={responsiveLabel}>
              Kezdőlap
            </Box>
          </Button>
          <Button
            color="inherit"
            startIcon={<LeaderboardIcon />}
            onClick={goLeaderboard}
            disabled={inGame}
            aria-label="Ranglista"
            aria-current={view === 'leaderboard' ? 'page' : undefined}
          >
            <Box component="span" sx={responsiveLabel}>
              Ranglista
            </Box>
          </Button>
        </Box>
        <SoundToggle />
      </Toolbar>
    </AppBar>
  );
}
