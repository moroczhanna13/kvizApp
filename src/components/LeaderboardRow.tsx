import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { LeaderboardEntry } from '../types/quiz';
import { DIFFICULTY_LABELS } from '../utils/constants';

/** A LeaderboardRow props-a. */
export type LeaderboardRowProps = {
  entry: LeaderboardEntry;
  /** Helyezés, 1-től számozva. */
  rank: number;
};

/** Mobilon elrejtett cella stílusa. */
const hideOnMobile = { display: { xs: 'none', sm: 'table-cell' } };

/**
 * A ranglista egy sora.
 * @param props - Az eredmény és a helyezés.
 * @returns Egy táblázatsor.
 */
export function LeaderboardRow({ entry, rank }: LeaderboardRowProps) {
  const percent = Math.round((entry.correctCount / entry.total) * 100);

  return (
    <TableRow hover>
      <TableCell>{rank}.</TableCell>
      <TableCell sx={{ fontWeight: 700 }}>{entry.score}</TableCell>
      <TableCell>
        {entry.correctCount} / {entry.total} ({percent}%)
      </TableCell>
      <TableCell sx={hideOnMobile}>{entry.categoryName}</TableCell>
      <TableCell sx={hideOnMobile}>
        <Chip label={DIFFICULTY_LABELS[entry.difficulty]} size="small" />
      </TableCell>
      <TableCell sx={hideOnMobile}>{new Date(entry.date).toLocaleString('hu-HU')}</TableCell>
    </TableRow>
  );
}
