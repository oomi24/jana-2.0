
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'AURA', title: 'Guerrera del Arte', subject: 'Dibujo y Color', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Aprende a mezclar colores.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TECH', title: 'MathMaster', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Domina los números.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LINGUA', title: 'Guerrera Bilingüe', subject: 'Inglés Inmersivo', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Domina el inglés.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEO', title: 'Guerrera del Mundo', subject: 'Geografía', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Explora el mapa.', icon: 'fa-globe-americas' },
  science: { id: 'science', name: 'NATURA', title: 'Guerrera Natural', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia.', icon: 'fa-leaf' },
};

const COLOR_THEORY = [
  { q: "¿Qué color obtienes mezclando Rojo y Azul?", a: "Violeta", ops: ["Verde", "Violeta", "Naranja", "Rosa"] },
  { q: "¿Cuál de estos es un color PRIMARIO?", a: "Amarillo", ops: ["Verde", "Amarillo", "Violeta", "Naranja"] },
  { q: "¿Qué color obtienes mezclando Rojo y Amarillo?", a: "Naranja", ops: ["Azul", "Marrón", "Naranja", "Lila"] },
  { q: "¿Qué color obtienes mezclando Azul y Amarillo?", a: "Verde", ops: ["Verde", "Rojo", "Gris", "Negro"] },
  { q: "¿Cuál es el color COMPLEMENTARIO del Rojo?", a: "Verde", ops: ["Amarillo", "Verde", "Azul", "Violeta"] },
];

const SILHOUETTES = [
  { obj: "Dibuja un Corazón", v: "M 400 200 C 300 100 200 200 200 300 C 200 450 400 550 400 550 C 400 550 600 450 600 300 C 600 200 500 100 400 200", icon: "❤️" },
  { obj: "Pinta una Estrella", v: "M 400 100 L 470 280 L 650 280 L 510 390 L 560 570 L 400 460 L 240 570 L 290 390 L 150 280 L 330 280 Z", icon: "⭐" },
  { obj: "Crea un Círculo Perfecto", v: "M 400 300 m -150, 0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0", icon: "⭕" }
];

// MEGA BASE DE DATOS CIENTÍFICA
const CIENCIA_DB = {
  elementos: [
    { n: "Hidrógeno", s: "H", i: "fa-wind", d: "El más ligero y abundante del universo." },
    { n: "Helio", s: "He", i: "fa-balloon", d: "Gas noble usado en globos y naves." },
    { n: "Litio", s: "Li", i: "fa-battery-full", d: "Esencial para las baterías de tu tablet." },
    { n: "Carbono", s: "C", i: "fa-gem", d: "Base de la vida. Forma el diamante y el grafito." },
    { n: "Nitrógeno", s: "N", i: "fa-vial", d: "78% del aire que respiras es nitrógeno." },
    { n: "Oxígeno", s: "O", i: "fa-lungs", d: "Vital para la respiración de todos los seres vivos." },
    { n: "Oro", s: "Au", i: "fa-coins", d: "El metal precioso que nunca se oxida." },
    { n: "Plata", s: "Ag", i: "fa-circle-dot", d: "Brillante y muy valioso para la joyería." },
    { n: "Mercurio", s: "Hg", i: "fa-thermometer", d: "¡El único metal que es líquido a temperatura ambiente!" }
  ],
  geologia: [
    { n: "Cuarzo", s: "SiO2", i: "fa-gem", d: "El mineral más común de la corteza terrestre." },
    { n: "Pirita", s: "FeS2", i: "fa-cube", d: "Llamado 'el oro de los tontos' por su brillo." },
    { n: "Amatista", s: "Violeta", i: "fa-gem", d: "Una variedad púrpura preciosa del cuarzo." },
    { n: "Diamante", s: "Puro C", i: "fa-sketch", d: "El material natural más duro que existe." }
  ],
  botanica: [
    { n: "Venus Atrapamoscas", s: "Dionaea", i: "fa-bug", d: "Planta carnívora que atrapa insectos rápido." },
    { n: "Aloe Vera", s: "Aloe", i: "fa-leaf", d: "Su gel cura quemaduras y cuida la piel." },
    { n: "Secuoya Gigante", s: "Árbol", i: "fa-tree", d: "El árbol más grande y antiguo del planeta." },
    { n: "Girasol", s: "Helianthus", i: "fa-sun", d: "Sigue el movimiento del sol durante el día." }
  ]
};

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'science'];
  
  modules.forEach(mod => {
    let max = 60;
    if (mod === 'math') max = 100;
    if (mod === 'english') max = 130;
    if (mod === 'science') max = 120;

    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans: any = 0, hints = ["¡Tú puedes!"], visual = "", trans = "", scene = "default";
      let options: QuizOption[] = [];
      let sciData: any = null;

      if (mod === 'color') {
        const isQuiz = i % 2 !== 0;
        if (isQuiz) {
          type = 'quiz';
          const data = COLOR_THEORY[i % COLOR_THEORY.length];
          obj = "Teoría del Color";
          ques = data.q;
          ans = data.a;
          options = data.ops.map(o => ({ text: o, isCorrect: o === data.a }));
          visual = "🎨";
        } else {
          type = 'paint';
          const data = SILHOUETTES[i % SILHOUETTES.length];
          obj = data.obj;
          visual = data.v;
          ques = data.icon;
        }
      } else if (mod === 'science') {
        type = 'science-lab';
        let category: 'geologia' | 'botanica' | 'elementos' = i <= 40 ? 'geologia' : (i <= 80 ? 'botanica' : 'elementos');
        const pool = CIENCIA_DB[category];
        const itemCount = 2 + (i % 3);
        const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
        const hiddenItems = [];
        for (let j = 0; j < Math.min(itemCount, shuffledPool.length); j++) {
          const item = shuffledPool[j];
          hiddenItems.push({ id: `sci_${i}_${j}`, label: item.n, symbol: item.s, desc: item.d, icon: item.i, x: 15 + Math.random() * 70, y: 15 + Math.random() * 70 });
        }
        obj = `Expedición ${category.toUpperCase()}`;
        scene = category === 'geologia' ? 'caves' : (category === 'botanica' ? 'forest' : 'lab');
        sciData = { category: 'mineral', discoveries: hiddenItems.map(h => h.label), hiddenItems };
      } else if (mod === 'english') {
        type = 'lingua-flow';
        const words = [{en: "Diamond", es: "Diamante", img: "💎"}, {en: "Forest", es: "Bosque", img: "🌲"}];
        const pick = words[i % words.length];
        obj = "English Time"; ques = pick.en; trans = pick.es; visual = pick.img; ans = [pick.en];
      } else if (mod === 'math') {
        type = 'math-master';
        obj = "Math Power"; ques = `${i} + ${10 + i}`; ans = i + 10 + i;
      } else {
        type = 'quiz';
        obj = "General"; ques = "¿De qué color es el cielo?"; ans = "Azul";
        options = [{text: "Rojo", isCorrect: false}, {text: "Azul", isCorrect: true}];
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "Resuelve el desafío.",
        question: ques, answer: ans, translation: trans, scenario: scene, rewardId: `r_${i}`, hints, visual, options,
        scientificData: sciData
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Increíble descubrimiento!", "¡Eres la mejor científica!", "¡Nivel superado con éxito!"];
