import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import type { Category } from '../types/quiz';
import { QUESTION_TIME_LIMIT } from '../utils/constants';

/** A StartScreen props-a: a témakörök betöltésének állapota az App-ból. */
export type StartScreenProps = {
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string;
  onRetry: () => void;
};

/**
 * Kezdőképernyő: témakör, nehézség és kérdésszám kiválasztása, majd a játék indítása.
 * @param props - A témakörök és azok betöltési állapota.
 * @returns A kezdőképernyő.
 */
export function StartScreen({ categories, categoriesLoading, categoriesError, onRetry }: StartScreenProps) {
  const { settings, updateSettings, startQuiz } = useQuiz();
  const { loading, error, load } = useQuestions();

  async function handleStart() {
    const questions = await load(settings);
    if (questions) {
      startQuiz(questions);
    }
  }

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

          {categoriesLoading && <LoadingSpinner label="Témakörök betöltése..." />}
          {categoriesError && <ErrorMessage message={categoriesError} onRetry={onRetry} />}

          {!categoriesLoading && !categoriesError && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <CategorySelect
                categories={categories}
                value={settings.categoryId}
                onChange={(categoryId) => updateSettings({ categoryId })}
              />
              <DifficultySelect
                value={settings.difficulty}
                onChange={(difficulty) => updateSettings({ difficulty })}
              />
              <QuestionCountSelect
                value={settings.amount}
                onChange={(amount) => updateSettings({ amount })}
              />
            </Stack>
          )}

          {error && <ErrorMessage message={error} />}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          onClick={handleStart}
          disabled={loading || categoriesLoading || !!categoriesError}
        >
          {loading ? 'Betöltés...' : 'Játék indítása'}
        </Button>
      </CardActions>
    </Card>
  );
}
