/**
 * Egy tömb elemeit véletlenszerű sorrendbe rakja (Fisher–Yates keverés).
 * Az eredeti tömböt nem módosítja.
 * @param items - A keverendő elemek.
 * @returns Új tömb az elemekkel, összekevert sorrendben.
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];
  // Hátulról haladva minden elemet egy véletlen, nála nem nagyobb indexű elemmel cserélünk,
  // így minden permutáció azonos valószínűségű
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
