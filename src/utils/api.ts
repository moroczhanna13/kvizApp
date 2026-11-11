import type {
  ApiCategoryResponse,
  ApiErrorKind,
  ApiQuestion,
  ApiQuestionResponse,
  Category,
  Difficulty,
  Question,
  QuizSettings,
} from '../types/quiz';
import { API_BASE_URL } from './constants';

/** Az Open Trivia DB lekérések hibája, a hiba fajtájával együtt. */
export class QuizApiError extends Error {
  /** A hiba fajtája, ami alapján az ErrorMessage a megfelelő tanácsot adja. */
  readonly kind: ApiErrorKind;

  /**
   * @param kind - A hiba fajtája.
   * @param message - Fejlesztői hibaüzenet.
   */
  constructor(kind: ApiErrorKind, message: string) {
    super(message);
    this.name = 'QuizApiError';
    this.kind = kind;
  }
}

/**
 * Megállapítja, hogy egy hiba a lekérés megszakításából (AbortController) származik-e.
 * @param error - A vizsgált hiba.
 * @returns Igaz, ha megszakítási hiba.
 */
export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

/**
 * Egy url3986 kódolású szöveget dekódol; hibás kódolásnál az eredetit adja vissza.
 * @param value - A kódolt szöveg.
 * @returns A dekódolt szöveg.
 */
export function decodeText(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Elvégzi a HTTP kérést és JSON-ként értelmezi a választ, egységes hibakezeléssel.
 * @param url - A lekérendő cím.
 * @param signal - Opcionális megszakító jel.
 * @returns A feldolgozott JSON adat.
 * @throws {QuizApiError} Hálózati hiba, rate limit vagy érvénytelen válasz esetén.
 */
async function requestJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new QuizApiError('network', 'Hálózati hiba a lekérés során.');
  }
  // Az API túl gyakori kérésnél HTTP 429-et ad vissza
  if (response.status === 429) {
    throw new QuizApiError('rateLimit', 'Túl sok kérés.');
  }
  if (!response.ok) {
    throw new QuizApiError('network', `HTTP hiba: ${response.status}`);
  }
  try {
    return (await response.json()) as T;
  } catch {
    throw new QuizApiError('invalid', 'A válasz nem érvényes JSON.');
  }
}

/**
 * Lekéri az elérhető kategóriákat az Open Trivia DB-ből, név szerint rendezve.
 * @param signal - Opcionális megszakító jel.
 * @returns A kategóriák listája.
 * @throws {QuizApiError} Ha a lekérés sikertelen.
 */
export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const data = await requestJson<ApiCategoryResponse>(`${API_BASE_URL}/api_category.php`, signal);
  if (!Array.isArray(data?.trivia_categories)) {
    throw new QuizApiError('invalid', 'Hiányzó kategórialista.');
  }
  return [...data.trivia_categories].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Összeállítja a kérdéslekérés URL-jét a beállítások alapján.
 * @param settings - A játék beállításai.
 * @returns A teljes lekérési URL.
 */
export function buildQuestionsUrl(settings: Pick<QuizSettings, 'amount' | 'categoryId' | 'difficulty'>): string {
  const params = new URLSearchParams({
    amount: String(settings.amount),
    category: String(settings.categoryId),
    difficulty: settings.difficulty,
    type: 'multiple',
    encode: 'url3986',
  });
  return `${API_BASE_URL}/api.php?${params.toString()}`;
}

/**
 * Egy nyers API kérdést dekódolt, alkalmazáson belüli formára alakít.
 * @param raw - Az API-ból érkezett kérdés.
 * @returns A feldolgozott kérdés.
 */
export function mapApiQuestion(raw: ApiQuestion): Question {
  const difficulty = decodeText(raw.difficulty);
  return {
    category: decodeText(raw.category),
    difficulty: (['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'easy') as Difficulty,
    question: decodeText(raw.question),
    correctAnswer: decodeText(raw.correct_answer),
    incorrectAnswers: raw.incorrect_answers.map(decodeText),
  };
}

/**
 * Lekéri a kérdéseket a beállításoknak megfelelően és feldolgozza a response_code-ot.
 * @param settings - A játék beállításai.
 * @param signal - Opcionális megszakító jel.
 * @returns A dekódolt kérdések listája.
 * @throws {QuizApiError} Ha nincs elég kérdés (1), rate limit (5) vagy egyéb hiba történt.
 */
export async function fetchQuestions(settings: QuizSettings, signal?: AbortSignal): Promise<Question[]> {
  const data = await requestJson<ApiQuestionResponse>(buildQuestionsUrl(settings), signal);
  switch (data?.response_code) {
    case 0:
      break;
    case 1:
      throw new QuizApiError('noResults', 'Nincs elég kérdés a választott beállításokkal.');
    case 5:
      throw new QuizApiError('rateLimit', 'Túl sok kérés.');
    default:
      throw new QuizApiError('invalid', `Ismeretlen válaszkód: ${String(data?.response_code)}`);
  }
  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new QuizApiError('noResults', 'Üres kérdéslista.');
  }
  return data.results.map(mapApiQuestion);
}
