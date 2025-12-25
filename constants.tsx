
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'AURA', title: 'Guerrera del Arte', subject: 'Dibujo y Color', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Aprende a mezclar colores.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TECH', title: 'MathMaster', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Domina los números.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LINGUA', title: 'Guerrera de Idiomas', subject: 'Inglés', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Aprende inglés.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEO', title: 'Guerrera del Mundo', subject: 'Geografía', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Explora el mapa.', icon: 'fa-globe-americas' },
  science: { id: 'science', name: 'NATURA', title: 'Guerrera Natural', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia.', icon: 'fa-leaf' },
};

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'science'];
  
  modules.forEach(mod => {
    const max = mod === 'math' ? 100 : 60;
    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans = 0, hints = ["¡Tú puedes!"], visual = "";

      if (mod === 'math') {
        type = 'math-master';
        if (i <= 10) {
          const a = i, b = Math.floor(Math.random() * 10) + 1;
          obj = "Multiplicación Básica"; ques = `${a} × ${b}`; ans = a * b;
        } else if (i <= 20) {
          const a = Math.floor(Math.random() * 50) + 10, b = 2;
          obj = "División Básica"; ques = `${a} ÷ ${b}`; ans = a / b;
        } else if (i <= 40) {
          const a = Math.floor(Math.random() * 12) + 1, b = Math.floor(Math.random() * 12) + 1;
          obj = "Multiplicación de 2 Dígitos"; ques = `${a} × ${b}`; ans = a * b;
        } else if (i <= 60) {
          obj = "Problema Combinado"; ques = `(5 × 4) + ${i}`; ans = 20 + i;
        } else {
          obj = "Desafío MathMaster"; ques = `¿Cuánto es el doble de ${i}?`; ans = i * 2;
        }
      } else if (mod === 'color') {
        type = 'paint';
        obj = "Dibuja algo increíble";
      } else {
        ques = "Pregunta de prueba";
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "Ayuda",
        question: ques, answer: ans, rewardId: `r_${i}`, hints
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = [
  "¡Eres una genio de los números!",
  "¡Tu cerebro es un procesador de dopamina!",
  "¡Increíble razonamiento!",
  "¡Nivel superado con estilo!",
  "¡Jana, dominas las mates!"
];
