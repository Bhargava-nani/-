import { datingQuestions } from './quizQuestions/dating.js';
import { animeQuestions } from './quizQuestions/anime.js';
import { gamingQuestions } from './quizQuestions/gaming.js';
import { fashionQuestions } from './quizQuestions/fashion.js';
import { techQuestions } from './quizQuestions/tech.js';
import { aiQuestions } from './quizQuestions/ai.js';
import { hackingQuestions } from './quizQuestions/hacking.js';
import { lawIndiaQuestions } from './quizQuestions/law_india.js';
import { gkQuestions } from './quizQuestions/gk.js';
import { sportsGeoQuestions } from './quizQuestions/sports_geo.js';

export const QUESTION_BANK = {
  dating: datingQuestions,
  anime: animeQuestions,
  gaming: gamingQuestions,
  fashion: fashionQuestions,
  tech: techQuestions,
  ai: aiQuestions,
  hacking: hackingQuestions,
  law_india: lawIndiaQuestions,
  gk: gkQuestions,
  sports_geo: sportsGeoQuestions,
};

export const QUIZ_CATEGORIES = Object.freeze(Object.keys(QUESTION_BANK));

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function getCategories() {
  return [...QUIZ_CATEGORIES];
}

export function getCategoryQuestions(category) {
  return QUESTION_BANK[category] ? [...QUESTION_BANK[category]] : [];
}

export function getCategoryRemainingCount(category, usedIds = []) {
  const bank = QUESTION_BANK[category] ?? [];
  const used = new Set(usedIds);
  return bank.filter((q) => !used.has(q.id)).length;
}

export function getLowStockCategories(usedByCategory = {}, threshold = 10) {
  return QUIZ_CATEGORIES
    .map((category) => ({
      category,
      remaining: getCategoryRemainingCount(category, usedByCategory[category] ?? []),
    }))
    .filter((item) => item.remaining <= threshold);
}

export function pickQuestionFromCategory(category, usedIds = []) {
  const bank = QUESTION_BANK[category] ?? [];
  const used = new Set(usedIds);
  const available = bank.filter((q) => !used.has(q.id));
  if (available.length === 0) return null;
  return shuffle(available)[0];
}

export function pickWeeklyMixedQuiz({ usedByCategory = {} } = {}) {
  const picked = [];

  for (const category of shuffle(QUIZ_CATEGORIES)) {
    const question = pickQuestionFromCategory(category, usedByCategory[category] ?? []);
    if (!question) continue;

    picked.push({
      ...question,
      category,
    });
  }

  return picked;
}
