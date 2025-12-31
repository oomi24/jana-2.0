
import { Warrior, ModuleId, Level } from './types.ts';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora', subject: 'Mapas', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Cuentacuentos', subject: 'Lectura', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: 'Historias mágicas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la vida.', icon: 'fa-leaf' },
};

const MATH_OBJS = ['🍎', '🍪', '🐶', '🚗', '⭐️', '🧁', '🍦', '🎈', '🧸', '🍭'];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { 
        id: `${mod}_${i}`, 
        moduleId: mod, 
        index: i, 
        objective: mod.toUpperCase() + " #" + i,
        help: "¡Tú puedes!" 
      };
      
      if (mod === 'math') {
        l.type = 'math-master';
        const v1 = Math.floor(Math.random() * 10) + 1;
        const v2 = Math.floor(Math.random() * 10) + 1;
        l.mathData = { op: '+', v1, v2, obj: MATH_OBJS[i % MATH_OBJS.length] };
        l.answer = v1 + v2;
      } else if (mod === 'color') {
        l.type = 'paint';
        l.visual = i % 2 === 0 ? 'fa-star' : 'fa-heart';
      } else {
        l.type = 'quiz';
        l.question = "¿Listo para este reto?";
        l.options = [
          { text: "¡Sí!", isCorrect: true },
          { text: "¡Claro!", isCorrect: false }
        ];
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante, Jana!", "¡Objetivo cumplido!", "¡Sigue así!"];
