
import { Warrior, ModuleId, Level } from './types.ts';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Dibujo y Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés Divertido', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora del Mundo', subject: 'Mapas y Países', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Guerrera de Cuentos', subject: 'Lectura Comprensiva', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: '100 historias nuevas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica Natural', subject: 'Ciencias y Vida', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre el mundo.', icon: 'fa-leaf' },
};

const SCIENCE_POOL = [
  { label: 'Mariposa Monarca', icon: 'fa-bug', desc: 'Viajan miles de kilómetros desde Canadá hasta México.' },
  { label: 'Microscopio', icon: 'fa-microscope', desc: 'Permite ver bacterias y células invisibles al ojo humano.' },
  { label: 'Sistema Solar', icon: 'fa-sun', desc: 'Nuestra Tierra es el tercer planeta girando alrededor del Sol.' },
  { label: 'ADN Humano', icon: 'fa-dna', desc: 'Son las instrucciones mágicas que dicen cómo somos.' },
  { label: 'Fósil de Dino', icon: 'fa-bone', desc: 'Restos de gigantes que vivieron hace millones de años.' },
  { label: 'Átomo', icon: 'fa-atom', desc: 'La pieza más pequeñita de la que está hecho todo el universo.' },
  { label: 'Hongo Bosque', icon: 'fa-mushroom', desc: 'Ayudan a limpiar el bosque descomponiendo hojas secas.' },
  { label: 'Diamante', icon: 'fa-gem', desc: 'Carbono puro que se formó bajo una presión enorme en la Tierra.' },
  { label: 'Bacteria Buena', icon: 'fa-bacteria', desc: 'Viven en tu barriguita y te ayudan a digerir la comida.' },
  { label: 'Imán', icon: 'fa-magnet', desc: 'Crea una fuerza invisible que atrae el metal.' },
  { label: 'Hoja Verde', icon: 'fa-leaf', desc: 'Fabrican oxígeno para que podamos respirar.' },
  { label: 'Gota de Agua', icon: 'fa-tint', desc: 'Compuesta por dos átomos de Hidrógeno y uno de Oxígeno (H2O).' },
  { label: 'Cerebro', icon: 'fa-brain', desc: 'El centro de control que envía señales eléctricas a tu cuerpo.' },
  { label: 'Estrella Fugaz', icon: 'fa-meteor', desc: 'En realidad son piedritas espaciales que se queman al entrar al aire.' },
  { label: 'Volcán', icon: 'fa-mountain', desc: 'Aberturas en la tierra por donde sale roca derretida llamada lava.' },
  { label: 'Abeja', icon: 'fa-bee', desc: 'Son esenciales para que las flores y frutas puedan crecer.' },
  { label: 'Hielo', icon: 'fa-snowflake', desc: 'Agua en estado sólido que forma cristales únicos de 6 puntas.' },
  { label: 'Semilla', icon: 'fa-seedling', desc: 'Una planta bebé esperando el agua para despertar.' },
  { label: 'Prisma', icon: 'fa-rainbow', desc: 'Divide la luz blanca en todos los colores del arcoíris.' },
  { label: 'Luna', icon: 'fa-moon', desc: 'Nuestro único satélite natural que controla las mareas del mar.' }
];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { id: `${mod}_${i}`, moduleId: mod, index: i, rewardId: `r_${i}`, help: "¡Tú puedes!" };
      
      if (mod === 'science') {
        l.type = 'science-lab';
        l.objective = "Expedición Natural " + i;
        // Seleccionar 1 ítem del pool basado en el índice i para que varíen cada nivel
        const item = SCIENCE_POOL[(i - 1) % SCIENCE_POOL.length];
        l.scientificData = { 
            hiddenItems: [
                { 
                  id: `sci_${i}`, 
                  label: item.label, 
                  x: 10 + (Math.sin(i) * 0.5 + 0.5) * 80, 
                  y: 10 + (Math.cos(i * 1.3) * 0.5 + 0.5) * 80, 
                  icon: item.icon, 
                  desc: item.desc 
                }
            ] 
        };
      } else if (mod === 'color') {
        l.type = 'paint';
        l.objective = "Arte Mágico " + i;
        const icons = ['fa-cat', 'fa-dog', 'fa-rocket', 'fa-star', 'fa-heart', 'fa-apple-alt', 'fa-dragon'];
        l.visual = icons[i % icons.length];
      } else if (mod === 'english') {
        l.type = 'lingua-flow';
        l.objective = "Vocabulario Inglés";
        const words = [
          {q: "Apple", a: "Manzana", v: "fa-apple-alt", p: "ap-el"},
          {q: "Sun", a: "Sol", v: "fa-sun", p: "san"},
          {q: "Water", a: "Agua", v: "fa-tint", p: "uater"},
          {q: "House", a: "Casa", v: "fa-home", p: "jaus"}
        ];
        const w = words[i % words.length];
        l.question = w.q; l.answer = w.a; l.visual = w.v;
        l.englishData = { pronunciation: w.p };
      } else if (mod === 'math') {
        l.type = 'math-master';
        l.objective = "Cálculo Nivel " + i;
        const v1 = 10 + i; const v2 = 5 + (i % 10);
        l.mathData = { op: '+', v1, v2 };
        l.answer = v1 + v2;
      } else if (mod === 'geo') {
        l.type = 'quiz';
        l.objective = "Misión Venezuela";
        l.question = "¿Cuál es el salto de agua más alto del mundo?";
        l.options = [{text: "Salto Ángel", isCorrect: true}, {text: "Cataratas del Niágara", isCorrect: false}];
        l.answer = "Se encuentra en el estado Bolívar, Venezuela.";
      } else if (mod === 'reading') {
        l.type = 'reading-adventure';
        l.objective = "Lectura Nivel " + i;
        l.readingData = {
          title: "El Misterio de Jana",
          author: "Academia",
          content: "Había una vez una niña llamada Jana que amaba la ciencia...",
          vocabulary: [],
          questions: [{question: "¿Cómo se llama la niña?", options: ["Jana", "María"], correct: 0}]
        };
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante!", "¡Increíble!", "¡Lo lograste!", "¡Qué genia!"];
