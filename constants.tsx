
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'AURA', title: 'Guerrera del Arte', subject: 'Dibujo y Color', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Aprende a mezclar colores.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TECH', title: 'MathMaster', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Domina los números.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LINGUA', title: 'Guerrera Bilingüe', subject: 'Inglés Inmersivo', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Domina el inglés.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEO', title: 'Guerrera del Mundo', subject: 'Geografía', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Explora el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTOR', title: 'Guerrera de las Letras', subject: 'Lectura y Análisis', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: 'Explora historias.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURA', title: 'Guerrera Natural', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia.', icon: 'fa-leaf' },
};

export const READING_DATABASE = [
  {
    title: "El Conejo Veloz",
    author: "Ana María",
    content: "Había una vez un conejo muy veloz llamado Saltarín. Vivía en un bosque verde y frondoso. Cada mañana, Saltarín corría por el bosque para saludar a sus amigos.\n\nUn día, encontró a la tortuga Tranquila caminando lentamente. '¡Hola, Tranquila!' dijo Saltarín. '¿Por qué caminas tan despacio?'\n\nLa tortuga respondió: 'Me gusta disfrutar del camino. ¿Quieres caminar conmigo?'\n\nSaltarín pensó que sería aburrido, pero decidió acompañarla. Descubrió flores que nunca había visto y escuchó el canto de pájaros nuevos. Aprendió que a veces, ir despacio tiene sus ventajas.",
    vocabulary: ["veloz", "frondoso", "paciencia", "ventajas"],
    objectives: ["Identificar personajes", "Secuencia de eventos"],
    questions: [
      { question: "¿Cómo se llama el conejo?", options: ["Tranquila", "Saltarín", "Rápido", "Bunny"], correct: 1 },
      { question: "¿Qué animal caminaba lentamente?", options: ["El conejo", "La tortuga", "El pájaro", "El zorro"], correct: 1 },
      { question: "¿Qué aprendió el conejo?", options: ["A correr más rápido", "A ser paciente", "A saltar más alto", "A esconderse"], correct: 1 }
    ]
  },
  {
    title: "La Isla del Tesoro",
    author: "Luis Pérez",
    content: "María y su hermano Pedro encontraron un mapa antiguo en el ático de su abuela. El mapa mostraba una isla misteriosa con una X roja. '¡Es un tesoro!' exclamó Pedro.\n\nPrepararon su mochila con agua, comida y una brújula. Tomaron el bote de su abuelo y navegaron hacia la isla. El viaje fue emocionante, con delfines saltando alrededor del bote.\n\nAl llegar a la isla, siguieron el mapa hasta una cueva. Dentro, encontraron un cofre viejo. ¡Estaba lleno de libros antiguos y cartas de su bisabuelo! El verdadero tesoro era la historia de su familia.",
    vocabulary: ["ático", "brújula", "misteriosa", "bisabuelo"],
    objectives: ["Seguir instrucciones", "Inferir significados"],
    questions: [
      { question: "¿Dónde encontraron el mapa?", options: ["En la playa", "En el ático", "En la escuela", "En el bosque"], correct: 1 },
      { question: "¿Qué había en el cofre?", options: ["Oro y joyas", "Libros y cartas", "Dulces", "Juguetes"], correct: 1 },
      { question: "¿Qué era el verdadero tesoro?", options: ["El oro", "La historia familiar", "La isla", "El bote"], correct: 1 }
    ]
  }
];

export const VENEZUELA_STATES = [
  { name: "Amazonas", capital: "Puerto Ayacucho", region: "Guayana", fact: "Estado más grande, hogar del Salto Ángel.", icon: "fa-tree" },
  { name: "Anzoátegui", capital: "Barcelona", region: "Nororiental", fact: "Famoso por sus playas y producción petrolera.", icon: "fa-umbrella-beach" },
  { name: "Apure", capital: "San Fernando de Apure", region: "Llanos", fact: "Corazón de los llanos, tierra de leyendas.", icon: "fa-cow" },
  { name: "Aragua", capital: "Maracay", region: "Central", fact: "Hogar del Parque Nacional Henri Pittier.", icon: "fa-cloud-sun" },
  { name: "Barinas", capital: "Barinas", region: "Llanos", fact: "Capital ganadera y puerta a los Andes.", icon: "fa-wheat-awn" },
  { name: "Bolívar", capital: "Ciudad Bolívar", region: "Guayana", fact: "Tierra de tepuyes y la represa del Guri.", icon: "fa-mountain" },
  { name: "Carabobo", capital: "Valencia", region: "Central", fact: "Cuna de la libertad y gran centro industrial.", icon: "fa-industry" },
  { name: "Cojedes", capital: "San Carlos", region: "Central", fact: "Tierra de grandes sabanas y ríos.", icon: "fa-water" },
  { name: "Delta Amacuro", capital: "Tucupita", region: "Guayana", fact: "Donde el Orinoco se abraza con el mar.", icon: "fa-fish" },
  { name: "Falcón", capital: "Coro", region: "Centroccidental", fact: "Medanos de Coro y hermosas playas.", icon: "fa-sun" },
  { name: "Guárico", capital: "San Juan de los Morros", region: "Llanos", fact: "El corazón agrícola de Venezuela.", icon: "fa-seedling" },
  { name: "Lara", capital: "Barquisimeto", region: "Centroccidental", fact: "La capital musical de Venezuela.", icon: "fa-music" },
  { name: "Mérida", capital: "Mérida", region: "Andina", fact: "Ciudad de los caballeros y el Pico Bolívar.", icon: "fa-snowflake" },
  { name: "Miranda", capital: "Los Teques", region: "Capital", fact: "Mezcla de selva, costa y ciudad.", icon: "fa-city" },
  { name: "Monagas", capital: "Maturín", region: "Nororiental", fact: "Cuna de la Cueva del Guácharo.", icon: "fa-ghost" },
  { name: "Nueva Esparta", capital: "La Asunción", region: "Insular", fact: "La Perla del Caribe (Isla de Margarita).", icon: "fa-gem" },
  { name: "Portuguesa", capital: "Guanare", region: "Llanos", fact: "Capital espiritual por la Virgen de Coromoto.", icon: "fa-church" },
  { name: "Sucre", capital: "Cumaná", region: "Nororiental", fact: "Primogénita del continente americano.", icon: "fa-anchor" },
  { name: "Táchira", capital: "San Cristóbal", region: "Andina", fact: "Estado fronterizo de clima fresco.", icon: "fa-mountain-sun" },
  { name: "Trujillo", capital: "Trujillo", region: "Andina", fact: "Tierra de santos y sabios.", icon: "fa-dove" },
  { name: "Vargas", capital: "La Guaira", region: "Capital", fact: "Principal puerto y puerta al Caribe.", icon: "fa-ship" },
  { name: "Yaracuy", capital: "San Felipe", region: "Centroccidental", fact: "Tierra de mitos y la Montaña de Sorte.", icon: "fa-moon" },
  { name: "Zulia", capital: "Maracaibo", region: "Zuliana", fact: "Relámpago del Catatumbo y el Lago.", icon: "fa-bolt" }
];

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

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  
  modules.forEach(mod => {
    let max = 60;
    if (mod === 'math') max = 100;
    if (mod === 'english') max = 130;
    if (mod === 'geo') max = 100;
    if (mod === 'reading') max = 80;
    if (mod === 'science') max = 120;

    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans: any = 0, hints = ["¡Tú puedes!"], visual = "", trans = "", scene = "default";
      let options: QuizOption[] = [];
      let factCard: any = null;
      let readingData: any = null;

      if (mod === 'reading') {
        type = 'reading-adventure';
        const dataIndex = (i - 1) % READING_DATABASE.length;
        const story = READING_DATABASE[dataIndex];
        obj = "Aventuras Literarias";
        ques = story.title;
        readingData = story;
      } else if (mod === 'geo') {
        const stateIndex = (i - 1) % VENEZUELA_STATES.length;
        const state = VENEZUELA_STATES[stateIndex];
        const isQuiz = i % 2 !== 0;
        
        if (isQuiz) {
          type = 'quiz';
          obj = "Capitales de Venezuela";
          ques = `¿Cuál es la capital del estado ${state.name}?`;
          ans = state.capital;
          const otherCapitals = [...VENEZUELA_STATES]
            .filter(s => s.capital !== state.capital)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(s => s.capital);
          options = [state.capital, ...otherCapitals]
            .sort(() => Math.random() - 0.5)
            .map(c => ({ text: c, isCorrect: c === state.capital }));
          factCard = { title: state.name, capital: state.capital, continent: "América del Sur", curiosity: state.fact };
        } else {
          type = 'quiz';
          obj = "Sabiduría Regional";
          ques = `¿Qué estado es conocido como: "${state.fact.split(',')[0]}"?`;
          ans = state.name;
          options = VENEZUELA_STATES.slice(0, 4).map(s => ({ text: s.name, isCorrect: s.name === state.name }));
          visual = state.icon;
        }
      } else if (mod === 'color') {
        const isQuiz = i % 2 !== 0;
        if (isQuiz) {
          type = 'quiz';
          const data = COLOR_THEORY[i % COLOR_THEORY.length];
          obj = "Teoría del Color";
          ques = data.q; ans = data.a;
          options = data.ops.map(o => ({ text: o, isCorrect: o === data.a }));
          visual = "🎨";
        } else {
          type = 'paint';
          const data = SILHOUETTES[i % SILHOUETTES.length];
          obj = data.obj; visual = data.v; ques = data.icon;
        }
      } else if (mod === 'math') {
        type = 'math-master';
        obj = "Math Power"; ques = `${i} + ${10 + i}`; ans = i + 10 + i;
      } else if (mod === 'english') {
        type = 'lingua-flow';
        const words = [{en: "Diamond", es: "Diamante", img: "💎"}, {en: "Forest", es: "Bosque", img: "🌲"}];
        const pick = words[i % words.length];
        obj = "English Time"; ques = pick.en; trans = pick.es; visual = pick.img; ans = [pick.en];
      } else if (mod === 'science') {
        type = 'science-lab';
        obj = "Expedición Científica";
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "Resuelve el desafío.",
        question: ques, answer: ans, translation: trans, scenario: scene, rewardId: `r_${i}`, hints, visual, options,
        factCard, readingData
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Increíble descubrimiento!", "¡Eres la mejor científica!", "¡Nivel superado con éxito!"];
