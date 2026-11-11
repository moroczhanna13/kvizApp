import Container from '@mui/material/Container';
import { Leaderboard } from './Leaderboard';
import { NavBar } from './NavBar';
import { QuizScreen } from './QuizScreen';
import { ResultScreen } from './ResultScreen';
import { StartScreen } from './StartScreen';
import { useCategories } from '../hooks/useCategories';
import { useQuiz } from '../hooks/useQuiz';

/**
 * Az alkalmazás gyökérkomponense: navigációs sáv és az aktuális nézet.
 * A kategóriák itt töltődnek be, így nézetváltáskor nem kell újra lekérni őket
 * (ez a szigorú rate limit miatt is fontos).
 * @returns Az alkalmazás felülete.
 */
export function App() {
  const { view } = useQuiz();
  const categoriesState = useCategories();

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
        {view === 'start' && <StartScreen categoriesState={categoriesState} />}
        {view === 'quiz' && <QuizScreen />}
        {view === 'result' && <ResultScreen />}
        {view === 'leaderboard' && <Leaderboard />}
      </Container>
    </>
  );
}
