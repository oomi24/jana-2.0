
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Dibujo y Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés Divertido', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora del Mundo', subject: 'Mapas y Países', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Guerrera de Cuentos', subject: 'Lectura Comprensiva', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: '100 historias nuevas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica Natural', subject: 'Ciencias y Vida', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre el mundo.', icon: 'fa-leaf' },
};

const SILHOUETTES = [
  "M 400 200 C 350 100 200 150 200 300 C 200 450 400 550 400 550 C 400 550 600 450 600 300 C 600 150 450 100 400 200", // Corazón
  "M 400 100 L 470 280 L 660 280 L 510 400 L 570 580 L 400 460 L 230 580 L 290 400 L 140 280 L 330 280 Z", // Estrella
  "M 400 100 L 300 300 L 400 500 L 500 300 Z", // Diamante
  "M 200 300 Q 400 100 600 300 Q 400 500 200 300", // Ojo / Hoja
  "M 400 50 A 150 150 0 1 1 399 50", // Círculo
  "M 250 150 L 550 150 L 550 450 L 250 450 Z", // Cuadrado
  "M 400 100 L 600 450 L 200 450 Z" // Triángulo
];

const ART_PROMPTS = [
  "Un Gato Galáctico", "Tu Flor Favorita", "Jana en Marte", "Un Castillo Mágico", 
  "Mariposas de Neón", "Un Robot Amistoso", "El Océano Azul", "Helado Gigante",
  "Un Cohete Espacial", "Oso Panda Comiendo", "Delfín Saltando", "Arcoíris Brillante"
];

const SCIENCE_ITEMS = [
  { id: 'm1', label: 'Cuarzo Rosa', symbol: 'SiO2', desc: 'Mineral de sílice común en montañas.', icon: 'fa-gem', category: 'mineral' },
  { id: 'm2', label: 'Pirita', symbol: 'FeS2', desc: 'Llamado el "oro de los tontos".', icon: 'fa-cube', category: 'mineral' },
  { id: 'm3', label: 'Amatista', symbol: 'AM', desc: 'Cuarzo color púrpura muy valioso.', icon: 'fa-gem', category: 'mineral' },
  { id: 'a1', label: 'Mariposa Monarca', symbol: 'ID', desc: 'Famosa por su gran migración.', icon: 'fa-bug', category: 'animal' },
  { id: 'a2', label: 'Escarabajo Hércules', symbol: 'EH', desc: 'Uno de los insectos más fuertes.', icon: 'fa-spider', category: 'animal' },
  { id: 'p1', label: 'Helecho Real', symbol: 'PT', desc: 'Planta prehistórica muy antigua.', icon: 'fa-leaf', category: 'plant' },
  { id: 'p2', label: 'Orquídea', symbol: 'VF', desc: 'Flor nacional de Venezuela.', icon: 'fa-seedling', category: 'plant' },
  { id: 's1', label: 'Satélite Jana-1', symbol: 'SAT', desc: 'Observa el clima desde el espacio.', icon: 'fa-satellite', category: 'space' },
  { id: 's2', label: 'Agujero Negro', symbol: 'G', desc: 'Gravedad extrema en el cosmos.', icon: 'fa-circle-dot', category: 'space' }
];

export const VENEZUELA_STATES = [
  { name: "Amazonas", capital: "Puerto Ayacucho", region: "Guayana", icon: "fa-tree" },
  { name: "Zulia", capital: "Maracaibo", region: "Zuliana", icon: "fa-oil-well" },
  { name: "Mérida", capital: "Mérida", region: "Andina", icon: "fa-mountain" },
  { name: "Falcón", capital: "Coro", region: "Centroccidental", icon: "fa-sun" },
  { name: "Distrito Capital", capital: "Caracas", region: "Central", icon: "fa-building" },
  { name: "Anzoátegui", capital: "Barcelona", region: "Oriente", icon: "fa-anchor" },
  { name: "Bolívar", capital: "Ciudad Bolívar", region: "Guayana", icon: "fa-gem" },
  { name: "Aragua", capital: "Maracay", region: "Central", icon: "fa-cloud-sun" },
  { name: "Lara", capital: "Barquisimeto", region: "Centroccidental", icon: "fa-music" },
  { name: "Carabobo", capital: "Valencia", region: "Central", icon: "fa-horse" },
  { name: "Táchira", capital: "San Cristóbal", region: "Andina", icon: "fa-mountain-sun" }
];

const GEO_EXTENDED = [
  ...VENEZUELA_STATES,
  { name: "Salto Ángel", capital: "Canaima", region: "Guayana", fact: "Catarata más alta.", icon: "fa-water" },
  { name: "Pico Bolívar", capital: "Mérida", region: "Andina", fact: "Punto más alto.", icon: "fa-snowflake" }
];

const STORY_COMPONENTS = {
  characters: ["Jana la exploradora", "el robot Bip", "la mariposa azul", "el sabio búho", "el pequeño astronauta", "la detective de flores", "el capitán estelar", "la científica curiosa"],
  actions: ["descubrió un secreto en", "viajó valientemente hacia", "encontró un mapa oculto en", "investigó un misterio en", "ayudó a sus amigos en", "resolvió un enigma en"],
  places: ["el bosque de cristal", "la luna de queso", "el laboratorio secreto", "la cueva de los ecos", "el jardín flotante", "la estación espacial", "el fondo del mar azul"],
  endings: ["y así aprendió que la curiosidad es la mejor brújula.", "descubriendo que el trabajo en equipo lo logra todo.", "y todos celebraron con una gran fiesta de estrellas.", "prometiendo que siempre protegería la naturaleza."]
};

const getUniqueStory = (level: number) => {
  const char = STORY_COMPONENTS.characters[level % STORY_COMPONENTS.characters.length];
  const action = STORY_COMPONENTS.actions[level % STORY_COMPONENTS.actions.length];
  const place = STORY_COMPONENTS.places[level % STORY_COMPONENTS.places.length];
  const ending = STORY_COMPONENTS.endings[level % STORY_COMPONENTS.endings.length];
  
  const content = `${char} ${action} ${place}. Durante su travesía, tuvo que observar con mucho cuidado cada detalle. No fue fácil, pero gracias a su inteligencia y a las herramientas científicas que llevaba, pudo entender lo que sucedía. Finalmente, todo salió bien, ${ending}`;

  return {
    title: `Aventura ${level}: El Secreto de ${place}`,
    author: "Academia Jana",
    content: content,
    difficulty: Math.floor(level / 20) + 1,
    estimatedTime: `${Math.floor(level / 15) + 2} min`,
    vocabulary: [
      { word: "Travesía", meaning: "Un viaje lleno de aventuras." },
      { word: "Enigma", meaning: "Un misterio difícil de resolver." }
    ],
    objectives: ["Comprensión lectora", "Nuevas palabras"],
    questions: [
      { question: `¿Quién es el protagonista?`, options: [char, "Un gigante", "Un pirata", "Un gato"], correct: 0 },
      { question: `¿Dónde sucede la historia?`, options: ["En la playa", place, "En un volcán", "En un cine"], correct: 1 }
    ]
  };
};

const ENGLISH_DATABASE = [
  { en: "House", es: "CASA", img: "🏠", p: "jáus" },
  { en: "Apple", es: "MANZANA", img: "🍎", p: "á-pol" },
  { en: "Dog", es: "PERRO", img: "🐶", p: "dog" },
  { en: "Cat", es: "GATO", img: "🐱", p: "kat" },
  { en: "Sun", es: "SOL", img: "☀️", p: "san" },
  { en: "Moon", es: "LUNA", img: "🌙", p: "mun" },
  { en: "Water", es: "AGUA", img: "💧", p: "uá-ter" },
  { en: "Star", es: "ESTRELLA", img: "⭐", p: "star" },
  { en: "Book", es: "LIBRO", img: "📖", p: "buk" },
  { en: "Tree", es: "ARBOL", img: "🌳", p: "tri" },
  { en: "Flower", es: "FLOR", img: "🌸", p: "fláu-er" },
  { en: "Red", es: "ROJO", img: "🔴", p: "red" },
  { en: "Blue", es: "AZUL", img: "🔵", p: "blu" },
  { en: "Green", es: "VERDE", img: "🟢", p: "grin" },
  { en: "Yellow", es: "AMARILLO", img: "🟡", p: "ié-lou" }
];

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    const max = 100;
    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans: any = 0, visual = "", readingData: any = null, scientificData: any = null, englishData: any = null, options: QuizOption[] = [];

      if (mod === 'color') {
        type = 'paint';
        obj = ART_PROMPTS[i % ART_PROMPTS.length];
        visual = SILHOUETTES[i % SILHOUETTES.length];
      } else if (mod === 'reading') {
        type = 'reading-adventure';
        const story = getUniqueStory(i);
        obj = story.title; ques = story.title; readingData = story;
      } else if (mod === 'math') {
        type = 'math-master';
        obj = i < 50 ? "Suma y Resta" : "Multiplicación";
        ques = i < 50 ? `${i} + 10` : `${Math.floor(i/10)} x 5`;
        ans = i < 50 ? i + 10 : Math.floor(i/10) * 5;
      } else if (mod === 'english') {
        type = 'lingua-flow';
        const item = ENGLISH_DATABASE[i % ENGLISH_DATABASE.length];
        obj = "Escribe la traducción"; ques = item.en; ans = item.es; visual = item.img;
        englishData = { lessonTitle: "Traduce al Español", category: "Vocabulario", exerciseType: 'vocab', pronunciation: item.p };
      } else if (mod === 'geo') {
        type = 'quiz';
        const spot = GEO_EXTENDED[i % GEO_EXTENDED.length];
        obj = "Geografía"; ques = `¿A qué región pertenece ${spot.name}?`; ans = spot.region;
        const allPossibleRegions = ["Andina", "Zuliana", "Guayana", "Llanos", "Central", "Oriente", "Centroccidental", "Insular"];
        const correctRegion = spot.region;
        const otherRegions = allPossibleRegions.filter(r => r !== correctRegion).sort(() => Math.random() - 0.5).slice(0, 3);
        options = [correctRegion, ...otherRegions].sort(() => Math.random() - 0.5).map(r => ({ text: r, isCorrect: r === correctRegion }));
        visual = (spot as any).icon;
      } else if (mod === 'science') {
        type = 'science-lab';
        obj = "Naturaleza: Exploración " + i;
        // Restaurar siembra de elementos ocultos
        const items = [...SCIENCE_ITEMS].sort(() => Math.random() - 0.5).slice(0, 4).map(it => ({
          ...it, x: 10 + Math.random()*80, y: 10 + Math.random()*80
        }));
        scientificData = { category: 'mineral', discoveries: ["Bio-hallazgo"], hiddenItems: items };
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "¡Tú puedes, Jana!",
        question: ques, answer: ans, rewardId: `r_${i}`, readingData, scientificData, englishData, options,
        visual: visual || undefined
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Increíble!", "¡Jana, eres una experta!", "¡Buen trabajo, científica!", "¡Sigamos aprendiendo!"];
