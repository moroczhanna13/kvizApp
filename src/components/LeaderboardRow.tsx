import { memo } from 'react';
import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { LeaderboardEntry } from '../types/quiz';
import { DIFFICULTY_LABELS } from '../utils/constants';
import { calculatePercentage, formatDate } from '../utils/scoring';

/** A LeaderboardRow tulajdonságai. */
export interface LeaderboardRowProps {
  /** A megjelenítendő eredmény. */
  entry: LeaderboardEntry;
  /** A helyezés (1-től számozva). */
  rank: number;
}

/** Kis kijelzőn elrejtett cellák stílusa. */
const hideOnXs = { display: { xs: 'none', sm: 'table-cell' } } as const;

/** Közepes kijelzőnél kisebben elrejtett cellák stílusa. */
const hideBelowMd = { display: { xs: 'none', md: 'table-cell' } } as const;

/**
 * A ranglista egy sora.
 * @param props - A komponens tulajdonságai.
 * @returns Egy táblázatsor.
 */
export const LeaderboardRow = memo(function LeaderboardRow({ entry, rank }: LeaderboardRowProps) {
  const percent = calculatePercentage(entry.correctCount, entry.total);
  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: rank <= 3 ? 700 : 400 }}>{rank}.</TableCell>
      <TableCell sx={{ fontWeight: 700 }}>{entry.score}</TableCell>
      <TableCell>
        {entry.correctCount} / {entry.total} <span aria-hidden="true">·</span> {percent}%
      </TableCell>
      <TableCell sx={hideOnXs}>{entry.categoryName}</TableCell>
      <TableCell sx={hideOnXs}>
        <Chip label={DIFFICULTY_LABELS[entry.difficulty]} size="small" />
      </TableCell>
      <TableCell sx={hideBelowMd}>{formatDate(entry.date)}</TableCell>
    </TableRow>
  );
});
