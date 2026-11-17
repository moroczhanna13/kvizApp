import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { Category } from '../types/quiz';

/** A CategorySelect props-a. */
export type CategorySelectProps = {
  categories: Category[];
  value: number;
  onChange: (categoryId: number) => void;
};

/**
 * Legördülő lista a témakör kiválasztásához.
 * @param props - A témakörök, a kiválasztott érték és a változáskezelő.
 * @returns A témakör választó.
 */
export function CategorySelect({ categories, value, onChange }: CategorySelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">Témakör</InputLabel>
      <Select
        labelId="category-label"
        label="Témakör"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
