import { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { Category } from '../types/quiz';

/** A CategorySelect tulajdonságai. */
export interface CategorySelectProps {
  /** A választható kategóriák. */
  categories: Category[];
  /** A kiválasztott kategória azonosítója. */
  value: number;
  /** Választáskor meghívott függvény az új azonosítóval. */
  onChange: (categoryId: number) => void;
  /** Le van-e tiltva a mező. */
  disabled?: boolean;
}

/**
 * Témakör-választó legördülő lista az API-ból lekért kategóriákkal.
 * @param props - A komponens tulajdonságai.
 * @returns A kategóriaválasztó mező.
 */
export const CategorySelect = memo(function CategorySelect({ categories, value, onChange, disabled }: CategorySelectProps) {
  // Ha a mentett kategória már nem létezik, üres értéket adunk, így a MUI nem jelez érvénytelen értéket
  const isKnown = categories.some((c) => c.id === value);

  return (
    <FormControl fullWidth disabled={disabled} error={!isKnown}>
      <InputLabel id="category-select-label">Témakör</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        label="Témakör"
        value={isKnown ? value : ''}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {!isKnown && <FormHelperText>Válassz egy témakört!</FormHelperText>}
    </FormControl>
  );
});
