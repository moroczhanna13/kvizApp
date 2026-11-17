import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { Difficulty } from '../types/quiz';
import { DIFFICULTY_LABELS } from '../utils/constants';

/** A DifficultySelect props-a. */
export type DifficultySelectProps = {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

/**
 * Legördülő lista a nehézség kiválasztásához.
 * @param props - A kiválasztott nehézség és a változáskezelő.
 * @returns A nehézség választó.
 */
export function DifficultySelect({ value, onChange }: DifficultySelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="difficulty-label">Nehézség</InputLabel>
      <Select
        labelId="difficulty-label"
        label="Nehézség"
        value={value}
        onChange={(e) => onChange(e.target.value as Difficulty)}
      >
        <MenuItem value="easy">{DIFFICULTY_LABELS.easy}</MenuItem>
        <MenuItem value="medium">{DIFFICULTY_LABELS.medium}</MenuItem>
        <MenuItem value="hard">{DIFFICULTY_LABELS.hard}</MenuItem>
      </Select>
    </FormControl>
  );
}
