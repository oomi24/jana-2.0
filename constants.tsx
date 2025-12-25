
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'AURA', title: 'Guerrera del Arte', subject: 'Dibujo y Color', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Aprende a mezclar colores.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TECH', title: 'MathMaster', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Domina los números.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LINGUA', title: 'Guerrera Bilingüe', subject: 'Inglés Inmersivo', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Domina el inglés.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEO', title: 'Guerrera del Mundo', subject: 'Geografía', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Explora el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTOR', title: 'Guerrera de las Letras', subject: 'Lectura y Análisis', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: 'Explora historias.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURA', title: 'Guerrera Natural', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia.', icon: 'fa-leaf' },
};

// --- GENERADOR DE CONTENIDO PARA 100 NIVELES DE LECTURA ---
const STORY_CATEGORIES = [
  { name: "Fábulas y Cuentos", themes: ["animales", "moralejas", "fantasía"], authors: ["Esopo", "Andersen", "Perrault"] },
  { name: "Aventuras", themes: ["exploración", "misterio", "viajes"], authors: ["Verne", "London", "Stevenson"] },
  { name: "Ciencia y Espacio", themes: ["astronomía", "naturaleza", "inventos"], authors: ["Sagan", "Curie", "Hawking"] },
  { name: "Historia", themes: ["civilizaciones", "pirámides", "caballeros"], authors: ["Heródoto", "Tuchman", "Plutarco"] }
];

const generateStoryContent = (level: number, category: any) => {
  const diff = Math.floor((level - 1) / 20) + 1;
  const templates = [
    `Había una vez un pequeño explorador que vivía en el reino de ${category.themes[0]}. Un día, descubrió un secreto oculto tras una montaña de cristal. Con valentía, decidió enfrentar el desafío para salvar a sus amigos. La aventura apenas comenzaba, y el aprendizaje sería su mejor arma.`,
    `En el vasto océano de la ${category.themes[1]}, los antiguos navegantes seguían las estrellas. Cada constelación contaba una historia de sabiduría y coraje. Jana, una joven marinera, aprendió que la persistencia vence a cualquier tormenta. Su brújula nunca fallaba porque su corazón era noble.`,
    `La ciencia detrás de ${category.themes[2]} es fascinante. Los investigadores observan patrones en la naturaleza para comprender el universo. Cada átomo y cada galaxia están conectados en un baile cósmico. Jana observa a través del microscopio, descubriendo mundos invisibles que esperan ser nombrados.`
  ];
  const base = templates[level % templates.length];
  // Aumentar complejidad repitiendo o extendiendo según el nivel
  return Array(diff).fill(base).join("\n\n");
};

export const READING_DATABASE = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const category = STORY_CATEGORIES[i % STORY_CATEGORIES.length];
  return {
    title: `${category.name}: El Secreto ${levelNum}`,
    author: category.authors[i % category.authors.length],
    content: generateStoryContent(levelNum, category),
    difficulty: Math.floor(i / 20) + 1,
    estimatedTime: `${Math.floor(i / 10) + 2} min`,
    vocabulary: [
      { word: "Valentía", meaning: "Determinación para enfrentar desafíos." },
      { word: "Sabiduría", meaning: "Conocimiento profundo de las cosas." }
    ],
    objectives: ["Identificar la idea principal", "Aprender nuevas palabras"],
    questions: [
      { question: `¿De qué trata principalmente esta historia de ${category.name}?`, options: ["Una aventura", "Un descubrimiento", "Un misterio", "La amistad"], correct: levelNum % 4 },
      { question: "¿Cuál es la enseñanza principal?", options: ["Nunca rendirse", "Trabajar en equipo", "Escuchar a los sabios", "Ser curiosos"], correct: (levelNum + 1) % 4 }
    ]
  };
});

export const ENGLISH_DATABASE = {
  vocabulary: {
    house: [{ en: "house", es: "casa", p: "jáus", img: "🏠" }, { en: "kitchen", es: "cocina", p: "kít-chen", img: "🍳" }],
    food: [{ en: "apple", es: "manzana", p: "á-pol", img: "🍎" }, { en: "water", es: "agua", p: "uá-ter", img: "💧" }],
    animals: [{ en: "dog", es: "perro", p: "dog", img: "🐶" }, { en: "cat", es: "gato", p: "kát", img: "🐱" }]
  },
  phrases: [
    { en: "Hello, how are you?", es: "Hola, ¿cómo estás?", scene: "greetings" },
    { en: "I would like to order", es: "Me gustaría ordenar", scene: "restaurant" }
  ],
  pronunciation: [
    { word: "think", es: "pensar", tip: "Lengua entre los dientes", audio: "th" }
  ]
};

export const VENEZUELA_STATES = [
  { name: "Amazonas", capital: "Puerto Ayacucho", region: "Guayana", fact: "Estado más grande, hogar del Salto Ángel.", icon: "fa-tree" },
  { name: "Zulia", capital: "Maracaibo", region: "Zuliana", fact: "Relámpago del Catatumbo y el Lago.", icon: "fa-bolt" }
];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    const max = mod === 'reading' ? 100 : 60;
    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans: any = 0, visual = "", readingData: any = null;

      if (mod === 'reading') {
        type = 'reading-adventure';
        const story = READING_DATABASE[i - 1];
        obj = story.title;
        ques = story.title;
        readingData = story;
      } else if (mod === 'math') {
        type = 'math-master';
        obj = "Cálculo Mental"; ques = `${i} + ${i * 2}`; ans = i + (i * 2);
      } else if (mod === 'english') {
        type = 'lingua-flow';
        obj = "English Fun"; ques = "Apple"; ans = "manzana"; visual = "🍎";
      } else if (mod === 'geo') {
        type = 'quiz';
        const state = VENEZUELA_STATES[i % VENEZUELA_STATES.length];
        obj = "Mapa de Venezuela"; ques = `Capital de ${state.name}`; ans = state.capital;
      } else if (mod === 'science') {
        type = 'science-lab';
        obj = "Exploración";
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "Sigue adelante.",
        question: ques, answer: ans, rewardId: `r_${i}`, readingData
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Increíble descubrimiento!", "¡Eres la mejor científica!", "¡Nivel superado con éxito!"];
