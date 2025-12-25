
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: {
    id: 'color',
    name: 'AURA',
    title: 'Guerrera del Arte',
    subject: 'Dibujo y Color',
    color: '#ec4899',
    gradient: 'from-pink-400 to-rose-600',
    description: 'Aprende a mezclar colores y crea paisajes mágicos.',
    icon: 'fa-palette',
  },
  math: {
    id: 'math',
    name: 'TECH',
    title: 'Guerrera de los Números',
    subject: 'Matemáticas',
    color: '#8b5cf6',
    gradient: 'from-violet-400 to-purple-700',
    description: 'Domina las multiplicaciones y las divisiones mágicas.',
    icon: 'fa-calculator',
  },
  english: {
    id: 'english',
    name: 'LINGUA',
    title: 'Guerrera de Idiomas',
    subject: 'Inglés',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-700',
    description: 'Aprende palabras y frases para tus canciones K-Pop.',
    icon: 'fa-language',
  },
  geo: {
    id: 'geo',
    name: 'GEO',
    title: 'Guerrera del Mundo',
    subject: 'Geografía',
    color: '#fbbf24',
    gradient: 'from-amber-300 to-yellow-600',
    description: 'Explora Venezuela, Miranda y las banderas del mundo.',
    icon: 'fa-globe-americas',
  },
  science: {
    id: 'science',
    name: 'NATURA',
    title: 'Guerrera Natural',
    subject: 'Ciencias',
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-600',
    description: 'Descubre los secretos de los animales, las plantas y el cuerpo humano.',
    icon: 'fa-leaf',
  },
};

// Siluetas para guiar el dibujo
const SILHOUETTES: Record<string, string> = {
  microphone: "M400 100 C350 100 350 250 350 250 L350 450 C350 480 450 480 450 450 L450 250 C450 250 450 100 400 100 Z M350 250 H450",
  heart: "M400 500 C100 350 100 100 400 250 C700 100 700 350 400 500 Z",
  star: "M400 50 L480 250 L700 250 L520 380 L580 580 L400 460 L220 580 L280 380 L100 250 L320 250 Z",
  lightstick: "M400 50 C300 50 300 250 400 250 C500 250 500 50 400 50 Z M380 250 L380 550 L420 550 L420 250 Z",
  diamond: "M400 50 L700 250 L400 550 L100 250 Z",
  crown: "M100 500 L100 200 L250 350 L400 150 L550 350 L700 200 L700 500 Z",
  cat: "M400 500 C300 500 250 450 250 350 C250 250 300 200 400 200 C500 200 550 250 550 350 C550 450 500 500 400 500 Z M270 230 L230 150 L330 200 Z M530 230 L570 150 L470 200 Z",
  flower: "M400 300 C400 200 500 200 500 300 C500 400 400 400 400 300 Z M400 300 C300 300 300 200 400 200 Z M400 300 C400 400 300 400 300 300 Z M400 300 C500 300 500 400 400 400 Z"
};

const ART_CHALLENGES = [
  { text: "Dibuja un Micrófono Mágico ✨", sil: "microphone" },
  { text: "Dibuja un Corazón de Fan 💖", sil: "heart" },
  { text: "Dibuja un Lightstick Brillante 🪄", sil: "lightstick" },
  { text: "Dibuja una Estrella de Idol ⭐", sil: "star" },
  { text: "Dibuja un Diamante de Fama 💎", sil: "diamond" },
  { text: "Dibuja la Corona de la Reina 👑", sil: "crown" },
  { text: "Dibuja un Gatito K-Pop 🐱", sil: "cat" },
  { text: "Dibuja una Flor de Escenario 🌸", sil: "flower" },
  { text: "Diseña un Escenario Galáctico 🌌", sil: "" },
  { text: "Diseña un Outfit de K-Pop 👗", sil: "" }
];

const getFlagSVG = (pais: string) => {
  const common = 'width="100%" height="100%" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style="display:block; border-radius:8px; border:4px solid #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"';
  switch(pais) {
    case "Venezuela": return `<svg ${common}><rect width="900" height="200" fill="#ffcc00"/><rect y="200" width="900" height="200" fill="#0033cc"/><rect y="400" width="900" height="200" fill="#cf142b"/><circle cx="450" cy="380" r="140" fill="none" /></svg>`;
    case "Corea del Sur": return `<svg ${common}><rect width="900" height="600" fill="#FFFFFF"/><circle cx="450" cy="300" r="150" fill="#CD2E3A"/><path d="M450 300 A75 75 0 0 1 450 450 A75 75 0 0 0 450 300 Z" fill="#0047A0"/></svg>`;
    case "Argentina": return `<svg ${common}><rect width="900" height="200" fill="#75AADB"/><rect y="200" width="900" height="200" fill="#FFFFFF"/><rect y="400" width="900" height="200" fill="#75AADB"/><circle cx="450" cy="300" r="60" fill="#FFD700"/></svg>`;
    default: return `<svg ${common}><rect width="900" height="600" fill="#ccc"/></svg>`;
  }
};

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'science'];
  
  modules.forEach(mod => {
    for (let i = 1; i <= 60; i++) {
      let type: Level['type'] = 'quiz';
      let objective = "";
      let question = "";
      let visual = "";
      let options: QuizOption[] = [];
      let factCard: Level['factCard'];

      if (mod === 'color') {
        type = 'paint';
        const challenge = ART_CHALLENGES[(i-1) % ART_CHALLENGES.length];
        objective = String(challenge.text);
        visual = challenge.sil ? SILHOUETTES[challenge.sil] : "";
      } else if (mod === 'math') {
        let a = Math.floor((i-1)/5) + 2;
        let b = (i % 5) + 1;
        let correct = a * b;
        objective = "Multiplicación Ninja";
        question = `${a} × ${b} = ?`;
        options = [correct, correct+2, correct-1, correct+5].map(v => ({ text: String(v), isCorrect: v === correct })).sort(() => Math.random() - 0.5);
      } else if (mod === 'english') {
        objective = "English Academy";
        const engWords = [{en: "Apple", es: "Manzana", icon: "🍎"}, {en: "Dog", es: "Perro", icon: "🐶"}, {en: "Star", es: "Estrella", icon: "⭐"}];
        const word = engWords[(i-1)%engWords.length];
        question = `¿Cómo se dice "${word.en}" en español?`;
        visual = word.icon;
        options = [{text: word.es, isCorrect: true}, {text: "Gato", isCorrect: false}].sort(() => Math.random() - 0.5);
      } else if (mod === 'geo') {
        objective = "Geografía";
        question = "¿Qué bandera es esta?";
        visual = getFlagSVG("Venezuela");
        options = [{text: "Venezuela", isCorrect: true}, {text: "Colombia", isCorrect: false}].sort(() => Math.random() - 0.5);
      } else {
        objective = "Ciencias";
        question = "¿Qué parte es?";
        visual = "🧠";
        options = [{text: "Cerebro", isCorrect: true}, {text: "Corazón", isCorrect: false}].sort(() => Math.random() - 0.5);
      }

      levels.push({
        id: `${mod}_${i}`,
        moduleId: mod,
        type,
        index: i,
        objective: String(objective),
        help: "¡Tú puedes Jana!",
        question: String(question),
        visual: String(visual),
        options,
        factCard,
        rewardId: `sticker_${mod}_${i}`,
        hints: ["¡Usa tu magia!"]
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = [
  "¡Increíble estilo K-Pop!",
  "¡Tu cerebro brilla como una estrella!",
  "¡Eres una verdadera guerrera!",
  "¡Nivel superado con éxito!",
  "¡Jana, eres la mejor artista!",
  "¡Tus dibujos son mágicos!"
];
