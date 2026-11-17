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

/** Mobilon csak az ikonok látszanak, a feliratok nem férnének ki. */
const hideOnMobile = { display: { xs: 'none', sm: 'inline' } };

/**
 * A felső sáv: az alkalmazás neve, navigációs gombok és a hang kapcsoló.
 * Játék közben a navigáció le van tiltva, hogy véletlenül se szakadjon meg a kvíz.
 * @returns A navigációs sáv.
 */
export function NavBar() {
  const { view, setView, newGame } = useQuiz();
  const inGame = view === 'quiz';

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1 }}>
        <QuizIcon />
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Kvíz
        </Typography>
        <Button color="inherit" startIcon={<HomeIcon />} onClick={newGame} disabled={inGame}>
          <Box component="span" sx={hideOnMobile}>Kezdőlap</Box>
        </Button>
        <Button color="inherit" startIcon={<LeaderboardIcon />} onClick={() => setView('leaderboard')} disabled={inGame}>
          <Box component="span" sx={hideOnMobile}>Ranglista</Box>
        </Button>
        <SoundToggle />
      </Toolbar>
    </AppBar>
  );
}
