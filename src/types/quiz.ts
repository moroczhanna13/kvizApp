/** A kérdések nehézségi szintje. */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** Az alkalmazás képernyői (router helyett ezzel váltunk a nézetek között). */
export type View = 'start' | 'quiz' | 'result' | 'leaderboard';

/** Egy témakör az Open Trivia DB-ből. */
export type Category = {
  id: number;
  name: string;
};

/** Egy kvízkérdés már dekódolt formában. */
export type Question = {
  category: string;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

/** A játék beállításai, ezeket localStorage-ban mentjük. */
export type QuizSettings = {
  categoryId: number;
  difficulty: Difficulty;
  amount: number;
  soundEnabled: boolean;
};

/** Egy eredmény a ranglistán. */
export type LeaderboardEntry = {
  id: number;
  score: number;
  correctCount: number;
  total: number;
  categoryName: string;
  difficulty: Difficulty;
  date: string;
};

/** A kategórialista válasza az API-tól. */
export type CategoryResponse = {
  trivia_categories: Category[];
};

/** Egy kérdés úgy, ahogy az API-tól jön (url-kódolva). */
export type ApiQuestion = {
  category: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

/** A kérdéslekérés válasza. A response_code 0, ha minden rendben volt. */
export type QuestionResponse = {
  response_code: number;
  results: ApiQuestion[];
};
