# Kvíz alkalmazás

Kliensoldali rendszerek házi feladat. Egy kvízjáték React + TypeScript + Material UI felhasználásával, a kérdéseket az [Open Trivia DB](https://opentdb.com) nyilvános API-jából kéri le.

## Indítás

```bash
npm install
npm run dev
```

## Funkciók

- Témakör, nehézség és kérdésszám kiválasztása (a témakörök az API-ból jönnek)
- Kérdésenként 4 válasz véletlen sorrendben, 15 másodperc idő
- Válasz után zöld/piros visszajelzés és hang, utána automatikusan jön a következő kérdés
- Pontozás: nehézségtől függő alappont (10/20/30) + a megmaradt másodpercek
- Eredmény képernyő és ranglista (top 10)
- A beállítások és a ranglista localStorage-ban mentődnek
- Mobilon is használható

## Hookok

- `useState`, `useEffect`, `useContext`, `useMemo`, `useRef`
- Saját hookok: `useQuiz`, `useLocalStorage`, `useCategories`, `useQuestions`, `useCountdown`, `useSoundEffects`

## Használt JS API-k

- **fetch**: kérdések és témakörök lekérése
- **localStorage**: beállítások és ranglista mentése
- **Audio**: hang helyes és rossz válasznál
