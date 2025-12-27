
import { Warrior, ModuleId, Level } from './types.ts';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Dibujo y Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés Divertido', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora del Mundo', subject: 'Mapas y Países', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Guerrera de Cuentos', subject: 'Lectura Comprensiva', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: '100 historias nuevas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica Natural', subject: 'Ciencias y Vida', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre el mundo.', icon: 'fa-leaf' },
};

const STORY_POOL = [
  {
    title: "El Viaje del Colibrí Mágico",
    author: "Academia Jana",
    time: "2 min",
    content: "Había una vez un colibrí de alas brillantes que vivía en el Salto Ángel. Sus alas eran de color fucsia y turquesa. Un día, decidió volar hasta el Ávila para saludar a las nubes. En su viaje, descubrió que las flores de Venezuela tenían los aromas más dulces del mundo. Las nubes le regalaron un rayito de sol para que sus plumas siempre brillaran.",
    vocab: [{word: "Fucsia", meaning: "Un color rosado muy intenso y brillante."}, {word: "Aroma", meaning: "Un olor muy agradable, como el de las flores Bitácora."}],
    questions: [
      { q: "¿De qué colores eran las alas del colibrí?", o: ["Rojo y Gris", "Fucsia y Turquesa", "Blanco"], c: 1 },
      { q: "¿A dónde decidió volar el colibrí?", o: ["Al mar", "Al Ávila", "A la selva"], c: 1 }
    ]
  },
  {
    title: "La Estrellita Curiosa",
    author: "Misión Espacial",
    time: "3 min",
    content: "En el cielo nocturno vivía Estrellita, una luz muy inquieta. Ella quería saber por qué los planetas daban vueltas. Un día, le preguntó a la Luna: '¿Por qué no te quedas quieta?'. La Luna sonrió y le explicó que todo en el espacio baila al ritmo de la gravedad. Estrellita comprendió que ella también era parte de ese gran baile cósmico.",
    vocab: [{word: "Cósmico", meaning: "Que pertenece al espacio o al universo."}, {word: "Gravedad", meaning: "La fuerza que nos mantiene pegados a la tierra."}],
    questions: [
      { q: "¿Quién le explicó a Estrellita el baile del espacio?", o: ["El Sol", "La Luna", "Un astronauta"], c: 1 },
      { q: "¿Qué descubrió Estrellita sobre el espacio?", o: ["Que es aburrido", "Que todo baila con la gravedad", "Que no tiene luces"], c: 1 }
    ]
  }
];

const SCIENCE_ITEMS = [
  { label: 'Mariposa', icon: 'fa-bug', desc: 'Una mariposa monarca que viaja miles de kilómetros.' },
  { label: 'Diamante', icon: 'fa-gem', desc: 'Un mineral precioso formado bajo mucha presión.' },
  { label: 'ADN', icon: 'fa-dna', desc: 'Las instrucciones que dicen cómo somos los seres vivos.' },
  { label: 'Planeta', icon: 'fa-globe', desc: 'Un mundo que gira alrededor del sol.' },
  { label: 'Microscopio', icon: 'fa-microscope', desc: 'Herramienta para ver cosas muy pequeñas.' },
  { label: 'Átomo', icon: 'fa-atom', desc: 'La pieza más pequeña de la que está hecho todo.' },
  { label: 'Fósil', icon: 'fa-bone', desc: 'Restos de animales que vivieron hace millones de años.' },
  { label: 'Hongo', icon: 'fa-mushroom', desc: 'Seres que ayudan a limpiar la naturaleza.' },
  { label: 'Bacteria', icon: 'fa-bacteria', desc: 'Células diminutas que viven en todas partes.' },
  { label: 'Imán', icon: 'fa-magnet', desc: 'Objeto que atrae el hierro con fuerza invisible.' }
];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { 
        id: `${mod}_${i}`, 
        moduleId: mod, 
        index: i, 
        rewardId: `r_${i}`, 
        help: "¡Tú puedes, Jana!" 
      };
      
      if (mod === 'color') {
        l.type = 'paint';
        l.objective = "Arte Mágico: Nivel " + i;
        const artIcons = ['fa-cat', 'fa-dog', 'fa-dragon', 'fa-sun', 'fa-moon', 'fa-star', 'fa-heart', 'fa-apple-alt', 'fa-ice-cream', 'fa-rocket', 'fa-ghost', 'fa-carrot', 'fa-cloud', 'fa-fish', 'fa-bird'];
        l.visual = artIcons[i % artIcons.length];
      } else if (mod === 'reading') {
        const s = STORY_POOL[(i - 1) % STORY_POOL.length];
        l.type = 'reading-adventure';
        l.objective = `Misión Lectura: ${s.title}`;
        l.readingData = {
          title: s.title,
          author: s.author,
          estimatedTime: s.time,
          content: s.content,
          vocabulary: s.vocab,
          questions: s.questions.map(q => ({
            question: q.q,
            options: q.o,
            correct: q.c
          }))
        };
      } else if (mod === 'english') {
        l.type = 'lingua-flow';
        l.objective = "Vocabulario Inglés";
        const engWords = [
            {q: "Cat", a: "Gato", v: "fa-cat", p: "kat"},
            {q: "Apple", a: "Manzana", v: "fa-apple-alt", p: "ap-el"},
            {q: "Sun", a: "Sol", v: "fa-sun", p: "san"},
            {q: "Milk", a: "Leche", v: "fa-glass-whiskey", p: "milk"},
            {q: "Water", a: "Agua", v: "fa-tint", p: "uater"},
            {q: "Book", a: "Libro", v: "fa-book", p: "buk"},
            {q: "Pencil", a: "Lápiz", v: "fa-pencil-alt", p: "pén-sil"}
        ];
        const word = engWords[(i - 1) % engWords.length];
        l.question = word.q;
        l.visual = word.v;
        l.answer = word.a;
        l.englishData = { pronunciation: word.p, category: "Básico" };
      } else if (mod === 'geo') {
        l.type = 'quiz';
        l.objective = "Explora Venezuela";
        l.question = i % 2 === 0 ? "¿Dónde está el Salto Ángel?" : "¿Cuál es la capital de Venezuela?";
        l.visual = i % 2 === 0 ? "fa-water" : "fa-city";
        l.options = i % 2 === 0 ? 
            [{text: "Estado Bolívar", isCorrect: true}, {text: "Estado Zulia", isCorrect: false}] :
            [{text: "Caracas", isCorrect: true}, {text: "Maracaibo", isCorrect: false}];
        l.answer = i % 2 === 0 ? "Es la cascada más alta del mundo." : "Caracas es conocida como la ciudad de la eterna primavera.";
      } else if (mod === 'math') {
        const n1 = 10 + (i * 2);
        const n2 = 5 + i;
        l.type = 'math-master';
        l.objective = "Cálculo Mental";
        l.mathData = { op: '+', v1: n1, v2: n2 };
        l.answer = n1 + n2;
      } else if (mod === 'science') {
        l.type = 'science-lab';
        l.objective = "Científica Jana: Nivel " + i;
        // Seleccionamos un ítem base y variamos su posición según el nivel i
        const baseItem = SCIENCE_ITEMS[(i - 1) % SCIENCE_ITEMS.length];
        l.scientificData = { 
            hiddenItems: [
                { 
                  id: `sci_${i}`, 
                  label: baseItem.label, 
                  x: 20 + ((i * 17) % 60), 
                  y: 20 + ((i * 23) % 60), 
                  icon: baseItem.icon, 
                  desc: baseItem.desc 
                }
            ] 
        };
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante, Jana!", "¡Objetivo cumplido!", "¡Sigue explorando!", "¡Impresionante!", "¡Lo lograste!"];
