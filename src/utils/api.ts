import type { Category, CategoryResponse, Difficulty, Question, QuestionResponse, QuizSettings } from '../types/quiz';

const API_URL = 'https://opentdb.com';

/**
 * Lekér egy JSON-t a megadott címről, hiba esetén magyar hibaüzenettel dob.
 * @param url - A lekérendő cím.
 * @returns A válasz JSON-ként.
 */
async function getJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Hálózati hiba, ellenőrizd az internetkapcsolatot!');
  }
  // Az API 5 másodpercenként csak egy kérést enged
  if (response.status === 429) {
    throw new Error('Túl sok kérés, várj pár másodpercet és próbáld újra!');
  }
  if (!response.ok) {
    throw new Error('Hiba történt a lekérés során (' + response.status + ').');
  }
  return await response.json();
}

/**
 * Lekéri a témaköröket ABC sorrendben.
 * @returns A témakörök listája.
 */
export async function fetchCategories(): Promise<Category[]> {
  const data = await getJson<CategoryResponse>(`${API_URL}/api_category.php`);
  return data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Lekéri a kérdéseket a beállítások alapján.
 * @param settings - A játék beállításai.
 * @returns A dekódolt kérdések.
 */
export async function fetchQuestions(settings: QuizSettings): Promise<Question[]> {
  // url3986 kódolást kérünk, mert azt egyszerű visszaalakítani decodeURIComponent-tel
  const url = `${API_URL}/api.php?amount=${settings.amount}&category=${settings.categoryId}` +
    `&difficulty=${settings.difficulty}&type=multiple&encode=url3986`;
  const data = await getJson<QuestionResponse>(url);

  if (data.response_code === 1) {
    throw new Error('Nincs elég kérdés ezekkel a beállításokkal. Válassz kevesebb kérdést vagy másik témakört!');
  }
  if (data.response_code === 5) {
    throw new Error('Túl sok kérés, várj pár másodpercet és próbáld újra!');
  }
  if (data.response_code !== 0) {
    throw new Error('Hiba történt a kérdések lekérésekor, próbáld újra!');
  }

  return data.results.map((q) => ({
    category: decodeURIComponent(q.category),
    difficulty: q.difficulty as Difficulty,
    question: decodeURIComponent(q.question),
    correctAnswer: decodeURIComponent(q.correct_answer),
    incorrectAnswers: q.incorrect_answers.map((a) => decodeURIComponent(a)),
  }));
}
