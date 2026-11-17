import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/** Az AnswerButton props-a. */
export type AnswerButtonProps = {
  answer: string;
  /** A válasz sorszáma, ebből lesz az A, B, C, D betű. */
  index: number;
  /** idle: még nincs válasz, correct: helyes, wrong: rosszat választott, dimmed: a többi. */
  status: 'idle' | 'correct' | 'wrong' | 'dimmed';
  disabled: boolean;
  onClick: () => void;
};

/**
 * Egy válaszlehetőség gombja. Válasz után zöld (helyes) vagy piros (rossz) lesz.
 * @param props - A válasz, az állapota és a kattintáskezelő.
 * @returns A válaszgomb.
 */
export function AnswerButton({ answer, index, status, disabled, onClick }: AnswerButtonProps) {
  const letter = String.fromCharCode(65 + index); // 65 = 'A'

  let color = {};
  let icon = undefined;
  if (status === 'correct') {
    // A Mui-disabled is kell, különben a letiltott gomb szürke lenne
    color = { '&, &.Mui-disabled': { bgcolor: 'success.main', color: 'white' } };
    icon = <CheckCircleIcon />;
  } else if (status === 'wrong') {
    color = { '&, &.Mui-disabled': { bgcolor: 'error.main', color: 'white' } };
    icon = <CancelIcon />;
  } else if (status === 'dimmed') {
    color = { opacity: 0.6 };
  }

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      endIcon={icon}
      sx={{ justifyContent: 'flex-start', textAlign: 'left', minHeight: 64, ...color }}
    >
      <b style={{ marginRight: 12 }}>{letter}.</b>
      <span style={{ flexGrow: 1 }}>{answer}</span>
    </Button>
  );
}
