import { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { Difficulty } from '../types/quiz';
import { DIFFICULTY_LABELS } from '../utils/constants';
import { isDifficulty } from '../utils/storageGuards';

/** A DifficultySelect tulajdonságai. */
export interface DifficultySelectProps {
  /** A kiválasztott nehézség. */
  value: Difficulty;
  /** Választáskor meghívott függvény az új nehézséggel. */
  onChange: (difficulty: Difficulty) => void;
  /** Le van-e tiltva a mező. */
  disabled?: boolean;
}

/**
 * Nehézségi szint választó legördülő lista.
 * @param props - A komponens tulajdonságai.
 * @returns A nehézségválasztó mező.
 */
export const DifficultySelect = memo(function DifficultySelect({ value, onChange, disabled }: DifficultySelectProps) {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="difficulty-select-label">Nehézség</InputLabel>
      <Select
        labelId="difficulty-select-label"
        id="difficulty-select"
        label="Nehézség"
        value={value}
        onChange={(e) => {
          if (isDifficulty(e.target.value)) onChange(e.target.value);
        }}
      >
        {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((level) => (
          <MenuItem key={level} value={level}>
            {DIFFICULTY_LABELS[level]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
