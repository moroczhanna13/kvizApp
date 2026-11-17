import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

/** Az ErrorMessage props-a. */
export type ErrorMessageProps = {
  message: string;
  /** Ha meg van adva, megjelenik egy "Újra" gomb. */
  onRetry?: () => void;
};

/**
 * Piros hibaüzenet, opcionálisan újrapróbálás gombbal.
 * @param props - Az üzenet és az újrapróbáló függvény.
 * @returns A hibaüzenet.
 */
export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Alert
      severity="error"
      action={onRetry && (
        <Button color="inherit" size="small" onClick={onRetry}>
          Újra
        </Button>
      )}
    >
      {message}
    </Alert>
  );
}
