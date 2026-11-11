import { memo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/** Egy válaszgomb megjelenési állapota. */
export type AnswerStatus = 'idle' | 'correct' | 'wrong' | 'dimmed';

/** Az AnswerButton tulajdonságai. */
export interface AnswerButtonProps {
  /** A válasz szövege. */
  answer: string;
  /** A válasz sorszáma (0–3), ebből lesz az A–D betűjel. */
  index: number;
  /** A gomb megjelenési állapota. */
  status: AnswerStatus;
  /** Le van-e tiltva (visszajelzés közben). */
  disabled: boolean;
  /** Kattintáskor meghívott függvény a válasz szövegével. */
  onSelect: (answer: string) => void;
}

/** Az állapotonkénti színek; letiltva is megmaradnak, hogy a visszajelzés látható legyen. */
const STATUS_STYLES = {
  idle: {},
  correct: {
    '&, &.Mui-disabled': { bgcolor: 'success.main', color: 'success.contrastText', borderColor: 'success.main' },
  },
  wrong: {
    '&, &.Mui-disabled': { bgcolor: 'error.main', color: 'error.contrastText', borderColor: 'error.main' },
  },
  dimmed: { opacity: 0.6 },
} as const;

/**
 * Egy válaszlehetőség gombja; visszajelzéskor zöld (helyes) vagy piros (rossz) színű.
 * @param props - A komponens tulajdonságai.
 * @returns A válaszgomb elem.
 */
export const AnswerButton = memo(function AnswerButton({ answer, index, status, disabled, onSelect }: AnswerButtonProps) {
  const letter = String.fromCharCode(65 + index);
  const icon = status === 'correct' ? <CheckCircleIcon /> : status === 'wrong' ? <CancelIcon /> : undefined;

  return (
    <Button
      fullWidth
      size="large"
      variant={status === 'correct' || status === 'wrong' ? 'contained' : 'outlined'}
      onClick={() => onSelect(answer)}
      disabled={disabled}
      endIcon={icon}
      sx={{ justifyContent: 'flex-start', textAlign: 'left', py: 1.5, minHeight: 64, ...STATUS_STYLES[status] }}
    >
      <Box component="span" sx={{ fontWeight: 700, mr: 1.5 }}>
        {letter}.
      </Box>
      <Box component="span" sx={{ flexGrow: 1 }}>
        {answer}
      </Box>
    </Button>
  );
});
