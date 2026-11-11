# Kvíz alkalmazás

React + TypeScript kvízjáték az [Open Trivia DB](https://opentdb.com) nyilvános kérdéseivel, Material UI felülettel.

## Telepítés és indítás

```bash
npm install
npm run dev       # fejlesztői szerver (http://localhost:5173)
npm run build     # típusellenőrzés + éles build a dist/ mappába
npm run preview   # az éles build kipróbálása
npm run lint      # statikus ellenőrzés (oxlint)
npm run sounds    # a public/sounds/*.wav hangfájlok újragenerálása
```

## Funkciók

- Témakör (az API-ból lekérve), nehézség és kérdésszám választása a kezdőképernyőn.
- Kérdésenként 4 válaszlehetőség, véletlen sorrendben, 15 másodperces visszaszámlálóval.
- Azonnali visszajelzés: zöld/piros válaszgomb, üzenetsáv és hang (helyes/helytelen), majd automatikus továbblépés.
- Pontozás: nehézség szerinti alappont (10/20/30) + a hátralévő másodpercek időbónuszként.
- Eredményoldal pontszámmal és a helyes válaszok arányával.
- Ranglista a 10 legjobb eredménnyel; az eredmények és az utolsó beállítások (a hangkapcsolóval együtt) a localStorage-ban maradnak meg.
- Hibakezelés: hálózati hiba, „nincs elég kérdés” (response_code 1) és rate limit (response_code 5 / HTTP 429), mindegyikhez javaslattal.
- Reszponzív elrendezés mobilra és asztali gépre.

## Mappaszerkezet

```
scripts/generate-sounds.mjs   WAV hangfájlok generálása Node-dal
public/sounds/                correct.wav, wrong.wav
src/components/               19 komponens, egy fájlban egy
src/context/                  QuizContext (createContext) és QuizProvider
src/hooks/                    saját hookok
src/types/                    TypeScript típusok
src/utils/                    API, reducer, keverés, pontozás, téma, konstansok
```

## Használt hookok

| Hook | Hol |
| --- | --- |
| `useState` | nézet, betöltési/hibaállapot, visszaszámláló, Snackbar |
| `useEffect` | adatlekérés, localStorage írás, időzítők |
| `useReducer` | játékállapot (`quizReducer`: START, ANSWER, TIMEOUT, NEXT, FINISH, RESET) |
| `useContext` | `useQuiz` → `QuizContext` |
| `useRef` | intervallum és timeout azonosító, Audio objektumok, callbackek |
| `useCallback` | eseménykezelők a `memo`-zott gyerekkomponensekhez |
| `useMemo` | válaszkeverés kérdésenként egyszer, context érték, eredmény-statisztika |

Saját hookok: `useLocalStorage`, `useQuestions`, `useCountdown`, `useCategories`, `useSoundEffects`, `useQuiz`.

## Használt JS API-k

- **fetch**: Open Trivia DB kategóriák és kérdések (`encode=url3986`, `decodeURIComponent`-tel dekódolva), `AbortController`-rel.
- **localStorage**: beállítások és ranglista, alakellenőrzéssel és hibatűréssel.
- **Audio API** (`HTMLAudioElement`): helyes/helytelen válasz hangja.
- **Időzítők**: `setInterval` (visszaszámláló), `setTimeout` (továbblépés).
