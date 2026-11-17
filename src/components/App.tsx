import Container from '@mui/material/Container';
import { Leaderboard } from './Leaderboard';
import { NavBar } from './NavBar';
import { QuizScreen } from './QuizScreen';
import { ResultScreen } from './ResultScreen';
import { StartScreen } from './StartScreen';
import { useCategories } from '../hooks/useCategories';
import { useQuiz } from '../hooks/useQuiz';

/**
 * A fő komponens: navigációs sáv és az éppen aktív képernyő.
 * A témaköröket itt töltjük be, hogy képernyőváltáskor ne kelljen újra lekérni őket.
 * @returns Az alkalmazás.
 */
export function App() {
  const { view } = useQuiz();
  const categories = useCategories();

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="md" sx={{ py: 3 }}>
        {view === 'start' && (
          <StartScreen
            categories={categories.categories}
            categoriesLoading={categories.loading}
            categoriesError={categories.error}
            onRetry={categories.retry}
          />
        )}
        {view === 'quiz' && <QuizScreen />}
        {view === 'result' && <ResultScreen />}
        {view === 'leaderboard' && <Leaderboard />}
      </Container>
    </>
  );
}
