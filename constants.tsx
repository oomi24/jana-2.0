
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
  { label: 'Mariposa Monarca', icon: 'fa-bug', desc: 'Viajan miles de kilómetros desde Canadá hasta México buscando el calor.' },
  { label: 'Microscopio', icon: 'fa-microscope', desc: 'Una herramienta que usa lentes para ver cosas que el ojo no puede notar.' },
  { label: 'Sistema Solar', icon: 'fa-sun', desc: 'Ocho planetas bailando alrededor de una estrella gigante llamada Sol.' },
  { label: 'ADN Humano', icon: 'fa-dna', desc: 'El mapa secreto que dice si tienes ojos cafés, pelo liso o eres muy alta.' },
  { label: 'Fósil de Dino', icon: 'fa-bone', desc: 'Huesos convertidos en piedra que nos cuentan cómo era el mundo hace millones de años.' },
  { label: 'Átomo', icon: 'fa-atom', desc: 'La pieza más pequeña de Lego del universo. ¡Todo está hecho de ellos!' },
  { label: 'Hongo Bosque', icon: 'fa-mushroom', desc: 'Crecen en la humedad y ayudan a limpiar el bosque reciclando hojas secas.' },
  { label: 'Diamante', icon: 'fa-gem', desc: 'Carbono puro que se apretó tanto dentro de la Tierra que se volvió la piedra más dura.' },
  { label: 'Bacteria Buena', icon: 'fa-bacteria', desc: 'Pequeños bichitos que viven en tu yogur y ayudan a que tu barriga esté feliz.' },
  { label: 'Imán Mágico', icon: 'fa-magnet', desc: 'Tiene una fuerza invisible que puede atraer metales sin tocarlos.' },
  { label: 'Hoja Verde', icon: 'fa-leaf', desc: 'Las hojas usan la luz del sol para fabricar su propia comida y darnos oxígeno.' },
  { label: 'Gota de Agua', icon: 'fa-tint', desc: 'El agua puede ser sólida (hielo), líquida o vapor. ¡Es vital para la vida!' },
  { label: 'Cerebro Sabio', icon: 'fa-brain', desc: 'La computadora de tu cuerpo. Controla tus sueños, tus pasos y tus risas.' },
  { label: 'Estrella Fugaz', icon: 'fa-meteor', desc: 'No son estrellas, son rocas espaciales que se queman al entrar a nuestra atmósfera.' },
  { label: 'Volcán Vivo', icon: 'fa-mountain', desc: 'Una montaña con una chimenea que conecta con el centro ardiente de la Tierra.' },
  { label: 'Abeja Obrera', icon: 'fa-bee', desc: 'Vuelan de flor en flor llevando polen. Sin ellas, no habría muchas de las frutas que comes.' },
  { label: 'Copo de Nieve', icon: 'fa-snowflake', desc: 'Cristales de hielo que siempre tienen seis puntas. ¡No hay dos iguales!' },
  { label: 'Semilla Bebé', icon: 'fa-seedling', desc: 'Toda la fuerza de un árbol gigante está guardada dentro de una pequeña semilla.' },
  { label: 'Arcoíris', icon: 'fa-rainbow', desc: 'La luz del sol chocando con gotas de lluvia crea este puente de siete colores.' },
  { label: 'Luna Plateada', icon: 'fa-moon', desc: 'Nuestro satélite natural. Refleja la luz del sol y causa las mareas en el mar.' }
];

const READING_POOL = [
  {
    title: "El Viaje de Jana al Amazonas",
    content: "Jana preparó su mochila con un microscopio y una lupa. Ella quería encontrar la flor más rara de la selva. Caminó entre árboles gigantes y escuchó el canto de los guacamayos. Al final de un río, encontró una flor que brillaba como el oro. Jana supo que la naturaleza es el tesoro más grande del mundo.",
    author: "Academia Jana",
    time: "3 min",
    questions: [
      { question: "¿Qué objeto llevaba Jana en su mochila?", options: ["Un microscopio", "Un libro de cuentos", "Una cámara"], correct: 0 },
      { question: "¿A qué lugar viajó Jana?", options: ["A la luna", "Al Amazonas", "A la playa"], correct: 1 }
    ]
  },
  {
    title: "La Estrellita que no quería dormir",
    content: "Había una pequeña estrella llamada Brilli que amaba ver a los niños jugar. Por eso, cuando el Sol salía, ella intentaba esconderse detrás de una nube para no irse a dormir. Pero la Luna le explicó: 'Brilli, si no descansas, no tendrás luz para brillar mañana'. Brilli entendió que dormir es parte de la magia.",
    author: "Cuentos del Cielo",
    time: "2 min",
    questions: [
      { question: "¿Por qué Brilli no quería dormir?", options: ["Tenía miedo", "Quería ver jugar a los niños", "No estaba cansada"], correct: 1 },
      { question: "¿Quién aconsejó a la estrellita?", options: ["El Sol", "La Luna", "Una nube"], correct: 1 }
    ]
  }
];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { id: `${mod}_${i}`, moduleId: mod, index: i, rewardId: `r_${i}`, help: "¡Tú puedes, Jana!" };
      
      if (mod === 'science') {
        l.type = 'science-lab';
        l.objective = "Expedición Natural Nivel " + i;
        const itemIdx = (i - 1) % SCIENCE_POOL.length;
        const item = SCIENCE_POOL[itemIdx];
        
        // Posicionamiento pseudo-aleatorio pero determinista
        const angle = (i * 137.5) % 360;
        const radius = 15 + (i % 30);
        const x = 50 + radius * Math.cos(angle * Math.PI / 180);
        const y = 50 + radius * Math.sin(angle * Math.PI / 180);

        l.scientificData = { 
            hiddenItems: [
                { 
                  id: `sci_${i}`, 
                  label: item.label, 
                  x: Math.max(15, Math.min(85, x)), 
                  y: Math.max(15, Math.min(85, y)), 
                  icon: item.icon, 
                  desc: item.desc 
                }
            ] 
        };
      } else if (mod === 'color') {
        l.type = 'paint';
        l.objective = "Arte Mágico " + i;
        const icons = ['fa-cat', 'fa-dog', 'fa-rocket', 'fa-star', 'fa-heart', 'fa-apple-alt', 'fa-dragon', 'fa-ghost', 'fa-ice-cream', 'fa-tree'];
        l.visual = icons[i % icons.length];
      } else if (mod === 'english') {
        l.type = 'lingua-flow';
        l.objective = "Vocabulario Inglés";
        const words = [
          {q: "Apple", a: "Manzana", v: "fa-apple-alt", p: "ap-el"},
          {q: "Sun", a: "Sol", v: "fa-sun", p: "san"},
          {q: "Water", a: "Agua", v: "fa-tint", p: "uater"},
          {q: "Moon", a: "Luna", v: "fa-moon", p: "mun"},
          {q: "Tree", a: "Árbol", v: "fa-tree", p: "tri"},
          {q: "Star", a: "Estrella", v: "fa-star", p: "star"},
          {q: "Milk", a: "Leche", v: "fa-glass-whiskey", p: "milk"}
        ];
        const w = words[i % words.length];
        l.question = w.q; l.answer = w.a; l.visual = w.v;
        l.englishData = { pronunciation: w.p };
      } else if (mod === 'math') {
        l.type = 'math-master';
        l.objective = "Cálculo Nivel " + i;
        const v1 = 10 + i;
        const v2 = 5 + (i % 12);
        l.mathData = { op: '+', v1, v2 };
        l.answer = v1 + v2;
      } else if (mod === 'geo') {
        l.type = 'quiz';
        l.objective = "Misión Venezuela";
        const geoQuestions = [
            {q: "¿Cuál es el salto de agua más alto del mundo?", a: "Se llama Salto Ángel y está en el estado Bolívar.", v: "fa-water", o: [{text: "Salto Ángel", isCorrect: true}, {text: "Cataratas", isCorrect: false}]},
            {q: "¿Cuál es la capital de Venezuela?", a: "Caracas es la ciudad más grande y el centro del país.", v: "fa-city", o: [{text: "Caracas", isCorrect: true}, {text: "Valencia", isCorrect: false}]},
            {q: "¿Qué animal es un símbolo de los llanos?", a: "El chigüire es el roedor más grande del mundo y vive allí.", v: "fa-paw", o: [{text: "Chigüire", isCorrect: true}, {text: "León", isCorrect: false}]}
        ];
        const g = geoQuestions[i % geoQuestions.length];
        l.question = g.q; l.answer = g.a; l.visual = g.v; l.options = g.o;
      } else if (mod === 'reading') {
        l.type = 'reading-adventure';
        l.objective = "Lectura Nivel " + i;
        const story = READING_POOL[i % READING_POOL.length];
        l.readingData = {
          title: story.title,
          author: story.author,
          content: story.content,
          estimatedTime: story.time,
          vocabulary: [],
          questions: story.questions
        };
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante!", "¡Increíble, Jana!", "¡Lo lograste!", "¡Qué genia!", "¡Naturaleza dominada!", "¡Arte perfecto!"];
