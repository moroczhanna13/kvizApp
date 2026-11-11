import type { Difficulty } from '../types/quiz';
import { DIFFICULTY_POINTS } from './constants';

/**
 * Kiszámolja egy helyes válaszért járó pontot: a nehézségtől függő alappont
 * plusz a hátralévő másodpercek száma időbónuszként.
 * @param difficulty - A kérdés nehézsége.
 * @param timeLeft - A válaszadáskor hátralévő idő másodpercben.
 * @returns A szerzett pontok száma.
 */
export function calculatePoints(difficulty: Difficulty, timeLeft: number): number {
  return DIFFICULTY_POINTS[difficulty] + Math.max(0, Math.round(timeLeft));
}

/**
 * Kiszámolja a helyes válaszok arányát százalékban.
 * @param correct - A helyes válaszok száma.
 * @param total - Az összes kérdés száma.
 * @returns A kerekített százalékérték (0–100); 0 kérdésnél 0.
 */
export function calculatePercentage(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Egy ISO dátumot magyar formátumú, rövid szöveggé alakít.
 * @param iso - ISO 8601 formátumú időbélyeg.
 * @returns A formázott dátum és idő, érvénytelen bemenetnél kötőjel.
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '–';
  return date.toLocaleString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
