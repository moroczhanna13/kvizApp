import { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { QUESTION_COUNT_OPTIONS } from '../utils/constants';

/** A QuestionCountSelect tulajdonságai. */
export interface QuestionCountSelectProps {
  /** A kiválasztott kérdésszám. */
  value: number;
  /** Választáskor meghívott függvény az új kérdésszámmal. */
  onChange: (amount: number) => void;
  /** Le van-e tiltva a mező. */
  disabled?: boolean;
}

/**
 * A kérdések számát kiválasztó legördülő lista.
 * @param props - A komponens tulajdonságai.
 * @returns A kérdésszám-választó mező.
 */
export const QuestionCountSelect = memo(function QuestionCountSelect({ value, onChange, disabled }: QuestionCountSelectProps) {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="count-select-label">Kérdések száma</InputLabel>
      <Select
        labelId="count-select-label"
        id="count-select"
        label="Kérdések száma"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {QUESTION_COUNT_OPTIONS.map((count) => (
          <MenuItem key={count} value={count}>
            {count} kérdés
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
