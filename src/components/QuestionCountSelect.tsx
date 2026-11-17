import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { QUESTION_COUNT_OPTIONS } from '../utils/constants';

/** A QuestionCountSelect props-a. */
export type QuestionCountSelectProps = {
  value: number;
  onChange: (amount: number) => void;
};

/**
 * Legördülő lista a kérdések számának kiválasztásához.
 * @param props - A kiválasztott szám és a változáskezelő.
 * @returns A kérdésszám választó.
 */
export function QuestionCountSelect({ value, onChange }: QuestionCountSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="count-label">Kérdések száma</InputLabel>
      <Select
        labelId="count-label"
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
}
