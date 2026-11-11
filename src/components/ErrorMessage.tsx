import { memo } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import type { ApiErrorKind } from '../types/quiz';

/** Az ErrorMessage tulajdonságai. */
export interface ErrorMessageProps {
  /** A hiba fajtája; ez határozza meg az üzenetet és a javaslatot. */
  kind: ApiErrorKind;
  /** Opcionális újrapróbálás; ha meg van adva, gomb jelenik meg. */
  onRetry?: () => void;
}

/** Hibafajtánként a cím és a felhasználónak szóló javaslat. */
const MESSAGES: Record<ApiErrorKind, { title: string; hint: string }> = {
  noResults: {
    title: 'Nincs elég kérdés',
    hint: 'Ehhez a beállításhoz nincs elég kérdés az adatbázisban. Válassz kevesebb kérdést, másik nehézséget vagy másik témakört.',
  },
  rateLimit: {
    title: 'Túl sok kérés',
    hint: 'Az Open Trivia DB 5 másodpercenként csak egy kérést enged. Várj néhány másodpercet, majd próbáld újra.',
  },
  network: {
    title: 'Hálózati hiba',
    hint: 'Nem sikerült elérni az Open Trivia DB szervert. Ellenőrizd az internetkapcsolatot, majd próbáld újra.',
  },
  invalid: {
    title: 'Váratlan válasz',
    hint: 'A szerver hibás választ adott. Próbáld újra kicsit később.',
  },
};

/**
 * Hibaüzenet a hiba fajtájához illő magyarázattal és javaslattal.
 * @param props - A komponens tulajdonságai.
 * @returns Egy hibát jelző Alert elem.
 */
export const ErrorMessage = memo(function ErrorMessage({ kind, onRetry }: ErrorMessageProps) {
  const message = MESSAGES[kind];
  return (
    <Alert
      severity="error"
      variant="outlined"
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            Újra
          </Button>
        ) : undefined
      }
    >
      <AlertTitle>{message.title}</AlertTitle>
      {message.hint}
    </Alert>
  );
});
