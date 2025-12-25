
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'AURA', title: 'Guerrera del Arte', subject: 'Dibujo y Color', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Aprende a mezclar colores.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TECH', title: 'MathMaster', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Domina los números.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LINGUA', title: 'Guerrera Bilingüe', subject: 'Inglés Inmersivo', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Domina el inglés.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEO', title: 'Guerrera del Mundo', subject: 'Geografía', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Explora el mapa.', icon: 'fa-globe-americas' },
  science: { id: 'science', name: 'NATURA', title: 'Guerrera Natural', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia.', icon: 'fa-leaf' },
};

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'science'];
  
  modules.forEach(mod => {
    let max = 60;
    if (mod === 'math') max = 100;
    if (mod === 'english') max = 130;

    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans: any = 0, hints = ["¡Tú puedes!"], visual = "", trans = "", scene = "default";

      if (mod === 'math') {
        type = 'math-master';
        if (i <= 10) {
          const a = i, b = Math.floor(Math.random() * 10) + 1;
          obj = "Multiplicación Básica"; ques = `${a} × ${b}`; ans = a * b;
        } else if (i <= 20) {
          const a = Math.floor(Math.random() * 50) + 10, b = 2;
          obj = "División Básica"; ques = `${a} ÷ ${b}`; ans = a / b;
        } else {
          obj = "Desafío MathMaster"; ques = `¿Cuánto es el doble de ${i}?`; ans = i * 2;
        }
      } else if (mod === 'english') {
        type = 'lingua-flow';
        // MECÁNICA 1: Vocabulario Visual (1-20)
        if (i <= 20) {
          const words = [
            {en: "Apple", es: "Manzana", img: "🍎"}, {en: "Dog", es: "Perro", img: "🐶"},
            {en: "Sun", es: "Sol", img: "☀️"}, {en: "House", es: "Casa", img: "🏠"},
            {en: "Cat", es: "Gato", img: "🐱"}, {en: "Water", es: "Agua", img: "💧"}
          ];
          const pick = words[i % words.length];
          obj = "Fundamentos: Vocabulario"; ques = pick.en; trans = pick.es; visual = pick.img; scene = "park";
          ans = [pick.en];
        } 
        // MECÁNICA 2: Listening Training (21-50)
        else if (i <= 50) {
          obj = "Entrenamiento de Oído"; ques = "Welcome to the city!"; trans = "¡Bienvenida a la ciudad!"; scene = "airport";
          ans = ["Welcome", "to", "the", "city"];
        }
        // MECÁNICA 3: Sentence Builder (51-100)
        else if (i <= 100) {
          obj = "Constructor de Frases"; ques = "I want to learn more English."; trans = "Quiero aprender más inglés."; scene = "cafe";
          ans = ["I", "want", "to", "learn", "more", "English"];
        }
        // MECÁNICA 4: Fluidez Total (101-130)
        else {
          obj = "Maestría Lingüística"; ques = "If you practice every day, you will be fluent."; trans = "Si practicas cada día, tendrás fluidez."; scene = "default";
          ans = ["If", "you", "practice", "every", "day"];
        }
      } else if (mod === 'color') {
        type = 'paint';
        obj = "Dibuja algo increíble";
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "Ayuda",
        question: ques, answer: ans, translation: trans, scenario: scene, rewardId: `r_${i}`, hints, visual
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = [
  "¡Eres una genio!",
  "¡Tu cerebro brilla hoy!",
  "¡Increíble progreso!",
  "¡Nivel superado con estilo!",
  "¡Jana, eres la mejor!"
];
