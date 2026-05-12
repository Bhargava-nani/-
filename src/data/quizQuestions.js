const QUIZ_CATEGORIES = [
  'dating',
  'anime',
  'gaming',
  'fashion',
  'tech',
  'ai',
  'hacking',
  'law_india',
  'gk',
  'sports_geo',
];

export const QUESTION_BANK = {
  dating: [
    {
      id: 'dating-001',
      question: '💘 What is the most important thing in a healthy relationship?',
      options: ['Trust', 'Money', 'Popularity', 'Luck'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'dating-002',
      question: '🌹 What does good communication usually require?',
      options: ['Listening', 'Ignoring', 'Lying', 'Interrupting'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'dating-003',
      question: '❤️ Which one is a sign of respect?',
      options: ['Supporting boundaries', 'Mocking feelings', 'Forcing decisions', 'Silent treatment'],
      answerIndex: 0,
      points: 1,
    },
  ],

  anime: [
    {
      id: 'anime-001',
      question: '🎌 What is anime?',
      options: ['Japanese animation', 'A game engine', 'A music app', 'A car model'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'anime-002',
      question: '⚔️ Which genre often focuses on action and training?',
      options: ['Shonen', 'Documentary', 'Horror only', 'Sports only'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'anime-003',
      question: '✨ What is usually meant by a filler episode?',
      options: ['Not main story content', 'The final episode', 'A dubbed trailer', 'A recap game'],
      answerIndex: 0,
      points: 1,
    },
  ],

  gaming: [
    {
      id: 'gaming-001',
      question: '🎮 What does “FPS” usually mean in gaming?',
      options: ['First-person shooter', 'Fast player score', 'Final play system', 'Frame pause setting'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'gaming-002',
      question: '🕹️ What is a “respawn”?',
      options: ['Coming back after defeat', 'Buying a skin', 'Saving a game', 'Changing servers'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'gaming-003',
      question: '🏆 What is a leaderboard used for?',
      options: ['Showing rankings', 'Changing controls', 'Storing files', 'Updating drivers'],
      answerIndex: 0,
      points: 1,
    },
  ],

  fashion: [
    {
      id: 'fashion-001',
      question: '👗 What does “casual wear” usually mean?',
      options: ['Relaxed everyday clothes', 'Only formal suits', 'Only sports gear', 'Only uniforms'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'fashion-002',
      question: '🧥 What is a common purpose of accessories?',
      options: ['Style and complement outfit', 'Replace food', 'Charge batteries', 'Fix software'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'fashion-003',
      question: '👟 What is often considered streetwear?',
      options: ['Urban casual style', 'Only wedding wear', 'Only office wear', 'Only winter wear'],
      answerIndex: 0,
      points: 1,
    },
  ],

  tech: [
    {
      id: 'tech-001',
      question: '💻 What does CPU stand for?',
      options: ['Central Processing Unit', 'Core Print Utility', 'Computer Power Usage', 'Central Program Upload'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'tech-002',
      question: '🌐 What does Wi-Fi connect devices to?',
      options: ['A wireless network', 'A printer only', 'A camera only', 'A hard disk'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'tech-003',
      question: '📱 What is an operating system?',
      options: ['Software that manages hardware', 'A phone case', 'A browser extension', 'A charger cable'],
      answerIndex: 0,
      points: 1,
    },
  ],

  ai: [
    {
      id: 'ai-001',
      question: '🤖 What does AI stand for?',
      options: ['Artificial Intelligence', 'Advanced Interface', 'Auto Input', 'Audio Internet'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'ai-002',
      question: '🧠 What helps AI learn patterns?',
      options: ['Data', 'Noise', 'Paint', 'Plastic'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'ai-003',
      question: '🪄 What is prompt engineering?',
      options: ['Writing effective instructions for AI', 'Fixing Wi-Fi', 'Editing images manually', 'Deleting files'],
      answerIndex: 0,
      points: 1,
    },
  ],

  hacking: [
    {
      id: 'hacking-001',
      question: '🛡️ What is phishing?',
      options: ['Fake attempts to steal information', 'A game trick', 'Network speed test', 'File compression'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'hacking-002',
      question: '🔐 What is a strong password practice?',
      options: ['Use unique long passwords', 'Use one password everywhere', 'Use your name only', 'Share it with friends'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'hacking-003',
      question: '⚠️ What is 2FA?',
      options: ['Two-factor authentication', 'Two file access', 'Total firewall alert', 'Temporary fast attach'],
      answerIndex: 0,
      points: 1,
    },
  ],

  law_india: [
    {
      id: 'law-001',
      question: '⚖️ What is the Constitution of India?',
      options: ['The supreme law of India', 'A movie law', 'A sports rulebook', 'A company policy'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'law-002',
      question: '🇮🇳 How many houses are there in Parliament of India?',
      options: ['Two', 'One', 'Three', 'Four'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'law-003',
      question: '👨‍⚖️ Who interprets laws in courts?',
      options: ['Judges', 'Players', 'Teachers', 'Drivers'],
      answerIndex: 0,
      points: 1,
    },
  ],

  gk: [
    {
      id: 'gk-001',
      question: '🌍 What is the capital of India?',
      options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'gk-002',
      question: '🗺️ Which is the largest planet?',
      options: ['Jupiter', 'Earth', 'Mars', 'Venus'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'gk-003',
      question: '📚 What is the main source of light on Earth?',
      options: ['Sun', 'Moon', 'Stars', 'Clouds'],
      answerIndex: 0,
      points: 1,
    },
  ],

  sports_geo: [
    {
      id: 'sports-geo-001',
      question: '⚽ How many players are on a football team on the field?',
      options: ['11', '9', '7', '15'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'sports-geo-002',
      question: '🏀 What is the scoring device in basketball called?',
      options: ['Basket', 'Goalpost', 'Netball', 'Racket'],
      answerIndex: 0,
      points: 1,
    },
    {
      id: 'sports-geo-003',
      question: '🧭 What does geography study?',
      options: ['Earth and places', 'Only animals', 'Only computers', 'Only music'],
      answerIndex: 0,
      points: 1,
    },
  ],
};

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
    .map((category) => {
      const remaining = getCategoryRemainingCount(category, usedByCategory[category] ?? []);
      return { category, remaining };
    })
    .filter((item) => item.remaining <= threshold);
}

export function pickQuestionFromCategory(category, usedIds = []) {
  const bank = QUESTION_BANK[category] ?? [];
  const used = new Set(usedIds);
  const available = bank.filter((q) => !used.has(q.id));
  if (available.length === 0) return null;
  return shuffle(available)[0];
}

export function pickWeeklyMixedQuiz({
  categoriesPerWeek = 10,
  questionsPerCategory = 1,
  usedByCategory = {},
} = {}) {
  const selectedCategories = shuffle(QUIZ_CATEGORIES).slice(0, categoriesPerWeek);
  const picked = [];

  for (const category of selectedCategories) {
    const usedIds = usedByCategory[category] ?? [];
    const bank = QUESTION_BANK[category] ?? [];
    const available = bank.filter((q) => !usedIds.includes(q.id));

    if (available.length === 0) continue;

    const chosen = shuffle(available).slice(0, questionsPerCategory);
    for (const q of chosen) {
      picked.push({
        ...q,
        category,
      });
    }
  }

  return picked;
}

export function addQuestion(category, question) {
  if (!QUESTION_BANK[category]) {
    QUESTION_BANK[category] = [];
  }

  QUESTION_BANK[category].push({
    id: question.id ?? `${category}-${Date.now()}`,
    question: question.question,
    options: question.options,
    answerIndex: question.answerIndex,
    points: question.points ?? 1,
  });
}
