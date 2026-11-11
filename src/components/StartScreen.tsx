import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CategorySelect } from './CategorySelect';
import { DifficultySelect } from './DifficultySelect';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { QuestionCountSelect } from './QuestionCountSelect';
import { useQuestions } from '../hooks/useQuestions';
import { useQuiz } from '../hooks/useQuiz';
import type { UseCategoriesResult } from '../hooks/useCategories';
import type { Difficulty, Question } from '../types/quiz';
import { QUESTION_TIME_LIMIT } from '../utils/constants';

/** A StartScreen tulajdonságai. */
export interface StartScreenProps {
  /** A kategóriák betöltésének állapota (a useCategories hook eredménye). */
  categoriesState: UseCategoriesResult;
}

/**
 * Kezdőképernyő: témakör, nehézség és kérdésszám választása, majd a játék indítása.
 * @param props - A komponens tulajdonságai.
 * @returns A beállító kártya.
 */
export function StartScreen({ categoriesState }: StartScreenProps) {
  const { settings, updateSettings, dispatch, setView } = useQuiz();
  const { categories, loading: categoriesLoading, error: categoriesError, retry } = categoriesState;

  // Sikeres lekérés után indul a játék és vált a nézet
  const handleLoaded = useCallback(
    (questions: Question[]) => {
      dispatch({ type: 'START', questions });
      setView('quiz');
    },
    [dispatch, setView],
  );

  const { loading, error, load } = useQuestions(handleLoaded);

  const handleCategoryChange = useCallback((categoryId: number) => updateSettings({ categoryId }), [updateSettings]);
  const handleDifficultyChange = useCallback((difficulty: Difficulty) => updateSettings({ difficulty }), [updateSettings]);
  const handleAmountChange = useCallback((amount: number) => updateSettings({ amount }), [updateSettings]);
  const handleStart = useCallback(() => load(settings), [load, settings]);

  const categoryValid = categories.some((c) => c.id === settings.categoryId);
  const canStart = !loading && !categoriesLoading && !categoriesError && categoryValid;

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" component="h2" gutterBottom>
              Új játék
            </Typography>
            <Typography color="text.secondary">
              Válassz témakört, nehézséget és kérdésszámot. Minden kérdésre {QUESTION_TIME_LIMIT} másodperced van.
            </Typography>
          </div>

          {categoriesLoading && <LoadingSpinner label="Témakörök betöltése…" />}
          {categoriesError && <ErrorMessage kind={categoriesError} onRetry={retry} />}

          {!categoriesLoading && !categoriesError && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <CategorySelect
                categories={categories}
                value={settings.categoryId}
                onChange={handleCategoryChange}
                disabled={loading}
              />
              <DifficultySelect value={settings.difficulty} onChange={handleDifficultyChange} disabled={loading} />
              <QuestionCountSelect value={settings.amount} onChange={handleAmountChange} disabled={loading} />
            </Stack>
          )}

          {error && <ErrorMessage kind={error} />}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          disabled={!canStart}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {loading ? 'Kérdések betöltése…' : 'Játék indítása'}
        </Button>
      </CardActions>
    </Card>
  );
}
