/** A kérdések nehézségi szintje az Open Trivia DB szerint. */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** Az alkalmazás nézetei (külön router helyett egyszerű állapot). */
export type View = 'start' | 'quiz' | 'result' | 'leaderboard';

/** Egy témakör (kategória) az Open Trivia DB-ből. */
export interface Category {
  /** A kategória azonosítója. */
  id: number;
  /** A kategória neve (angolul). */
  name: string;
}

/** Egy feldolgozott, dekódolt kvízkérdés. */
export interface Question {
  /** A kérdés kategóriájának neve. */
  category: string;
  /** A kérdés nehézsége. */
  difficulty: Difficulty;
  /** A kérdés szövege. */
  question: string;
  /** A helyes válasz. */
  correctAnswer: string;
  /** A három helytelen válasz. */
  incorrectAnswers: string[];
}

/** A felhasználó által választott, localStorage-ban megőrzött beállítások. */
export interface QuizSettings {
  /** A kiválasztott kategória azonosítója. */
  categoryId: number;
  /** A kiválasztott nehézség. */
  difficulty: Difficulty;
  /** A kért kérdések száma. */
  amount: number;
  /** Engedélyezettek-e a hangeffektek. */
  soundEnabled: boolean;
}

/** A játék fázisa egy kérdésen belül. */
export type QuestionPhase = 'answering' | 'feedback';

/** A játék teljes állapota, amelyet a reducer kezel. */
export interface QuizState {
  /** A játék állapota: nem fut, fut, vagy véget ért. */
  status: 'idle' | 'playing' | 'finished';
  /** Az aktuális játék kérdései. */
  questions: Question[];
  /** Az aktuális kérdés indexe. */
  currentIndex: number;
  /** Válaszadás folyik, vagy már a visszajelzés látszik. */
  phase: QuestionPhase;
  /** A kiválasztott válasz; null, ha nincs válasz (vagy lejárt az idő). */
  selectedAnswer: string | null;
  /** Helyes volt-e az utolsó válasz; null, ha még nem válaszolt. */
  lastAnswerCorrect: boolean | null;
  /** Az eddig gyűjtött pontszám. */
  score: number;
  /** A helyes válaszok száma. */
  correctCount: number;
}

/** A játékállapot reducerének akciói. */
export type QuizAction =
  | { type: 'START'; questions: Question[] }
  | { type: 'ANSWER'; answer: string; timeLeft: number }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT' }
  | { type: 'FINISH' }
  | { type: 'RESET' };

/** Egy elmentett eredmény a ranglistán. */
export interface LeaderboardEntry {
  /** Egyedi azonosító. */
  id: string;
  /** Az elért pontszám. */
  score: number;
  /** A helyes válaszok száma. */
  correctCount: number;
  /** Az összes kérdés száma. */
  total: number;
  /** A játék kategóriájának neve. */
  categoryName: string;
  /** A játék nehézsége. */
  difficulty: Difficulty;
  /** A játék vége ISO formátumú időbélyegként. */
  date: string;
}

/** Az Open Trivia DB kategórialista válaszának alakja. */
export interface ApiCategoryResponse {
  /** A kategóriák listája. */
  trivia_categories: Category[];
}

/** Egy nyers (url3986 kódolt) kérdés az Open Trivia DB válaszában. */
export interface ApiQuestion {
  /** Kérdéstípus (multiple / boolean). */
  type: string;
  /** Nehézség. */
  difficulty: string;
  /** Kategória neve. */
  category: string;
  /** A kérdés szövege. */
  question: string;
  /** A helyes válasz. */
  correct_answer: string;
  /** A helytelen válaszok. */
  incorrect_answers: string[];
}

/** Az Open Trivia DB kérdéslekérő végpontjának válasza. */
export interface ApiQuestionResponse {
  /** 0 = siker, 1 = nincs elég kérdés, 5 = rate limit stb. */
  response_code: number;
  /** A kérdések listája. */
  results: ApiQuestion[];
}

/** A lekérési hibák fajtái, amelyekhez külön üzenet tartozik. */
export type ApiErrorKind = 'noResults' | 'rateLimit' | 'network' | 'invalid';
