
import { Warrior, ModuleId, Level } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Dibujo y Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés Divertido', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora del Mundo', subject: 'Mapas y Países', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Guerrera de Cuentos', subject: 'Lectura Comprensiva', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: '100 historias nuevas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica Natural', subject: 'Ciencias y Vida', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre el mundo.', icon: 'fa-leaf' },
};

const SCIENCE_POOL = [
  { label: 'Cuarzo', icon: 'fa-gem', category: 'mineral', symbols: ['SiO2'] },
  { label: 'Pirita', icon: 'fa-cube', category: 'mineral', symbols: ['FeS2'] },
  { label: 'Diamante', icon: 'fa-diamond', category: 'mineral', symbols: ['C'] },
  { label: 'Mariposa', icon: 'fa-bug', category: 'animal', symbols: ['INS'] },
  { label: 'Colibrí', icon: 'fa-dove', category: 'animal', symbols: ['AVI'] },
  { label: 'Helecho', icon: 'fa-leaf', category: 'plant', symbols: ['PTE'] },
  { label: 'Orquídea', icon: 'fa-seedling', category: 'plant', symbols: ['ORQ'] },
  { label: 'Nebulosa', icon: 'fa-cloud-meatball', category: 'space', symbols: ['NEB'] },
  { label: 'Galaxia', icon: 'fa-bahai', category: 'space', symbols: ['GAL'] }
];

const ADJECTIVES = ['Brillante', 'Raro', 'Gigante', 'Misterioso', 'Espacial', 'Fósil', 'Cristalino'];

const generateScienceItems = (level: number) => {
  const items = [];
  const seed = level * 31; // Salto mayor para evitar colisiones
  for (let i = 0; i < 4; i++) {
    const base = SCIENCE_POOL[(seed + i * 7) % SCIENCE_POOL.length];
    const adj = ADJECTIVES[(seed * (i + 3)) % ADJECTIVES.length];
    items.push({
      id: `sci_${level}_${i}`,
      label: `${adj} ${base.label}`,
      symbol: base.symbols[0],
      desc: `Misión ${level}: Un ejemplar de ${base.label} detectado.`,
      icon: base.icon,
      category: base.category,
      x: 15 + ((seed + i * 19) % 70),
      y: 15 + ((seed * (i + 2) + 13) % 70)
    });
  }
  return items;
};

const getMathChallenge = (i: number) => {
  const seed = i * 67;
  if (i <= 50) {
    // Sumas y restas complejas (Llevadas)
    const isSum = i % 2 === 0;
    const n1 = 1200 + (seed % 7800);
    const n2 = 450 + (seed % 4500);
    if (isSum) return { q: `${n1} + ${n2}`, a: n1 + n2, op: '+', v1: n1, v2: n2 };
    const v1 = Math.max(n1, n2); const v2 = Math.min(n1, n2);
    return { q: `${v1} - ${v2}`, a: v1 - v2, op: '-', v1, v2 };
  } else {
    // Multiplicación y División para 8-10 años
    const isMult = i % 2 === 0;
    if (isMult) {
      const v1 = 110 + (seed % 390);
      const v2 = 2 + (seed % 7);
      return { q: `${v1} x ${v2}`, a: v1 * v2, op: 'x', v1, v2 };
    } else {
      const v2 = 4 + (seed % 5);
      const v1 = v2 * (15 + (seed % 40));
      return { q: `${v1} ÷ ${v2}`, a: v1 / v2, op: '÷', v1, v2 };
    }
  }
};

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { id: `${mod}_${i}`, moduleId: mod, index: i, rewardId: `r_${i}`, help: "¡Tú puedes!" };
      if (mod === 'math') {
        const c = getMathChallenge(i);
        l.type = 'math-master';
        l.objective = i <= 50 ? "Aritmética" : "Cálculo";
        l.answer = c.a; l.mathData = { op: c.op, v1: c.v1, v2: c.v2 };
      } else if (mod === 'science') {
        l.type = 'science-lab';
        l.objective = "Exploración N-" + i;
        l.scientificData = { hiddenItems: generateScienceItems(i) };
      } else {
        l.type = 'quiz';
        l.objective = "Lección " + i;
        l.question = "¿Listo?"; l.options = [{text: "Sí", isCorrect: true}];
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Excelente!", "¡Eres una genia!", "¡Misión lograda!"];
