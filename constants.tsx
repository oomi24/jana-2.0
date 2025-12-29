
import { Warrior, ModuleId, Level } from './types.ts';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Dibujo y Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés Divertido', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora del Mundo', subject: 'Mapas y Países', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Guerrera de Cuentos', subject: 'Lectura Comprensiva', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: '100 historias nuevas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica Natural', subject: 'Ciencias y Vida', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre el mundo.', icon: 'fa-leaf' },
};

const KPOP_CREATIVE_CHALLENGES = [
  { obj: "Dibuja un Micrófono Mágico", icon: "fa-microphone-alt" },
  { obj: "Escenario de Concierto Futurista", icon: "fa-rocket" },
  { obj: "Diseña tu propio Lightstick", icon: "fa-magic" },
  { obj: "Outfit K-Pop para tu Idol", icon: "fa-tshirt" },
  { obj: "Logotipo de tu banda favorita", icon: "fa-music" },
  { obj: "Tu mascota cantando K-Pop", icon: "fa-cat" },
  { obj: "Auriculares Galácticos", icon: "fa-headphones" },
  { obj: "Pastel de Cumpleaños para tu Bias", icon: "fa-birthday-cake" },
  { obj: "Diseño de Álbum: 'Estrellas'", icon: "fa-compact-disc" },
  { obj: "Corona de Reina del K-Pop", icon: "fa-crown" }
];

const ART_DATABASE = [
  {
    type: 'art-technique',
    objective: "Unir Puntos: Micrófono Retro",
    tech: 'dots',
    points: [
      {x: 400, y: 100, label: 1}, {x: 480, y: 130, label: 2}, {x: 520, y: 200, label: 3}, 
      {x: 500, y: 300, label: 4}, {x: 430, y: 350, label: 5}, {x: 430, y: 550, label: 6},
      {x: 370, y: 550, label: 7}, {x: 370, y: 350, label: 8}, {x: 300, y: 300, label: 9},
      {x: 280, y: 200, label: 10}, {x: 320, y: 130, label: 11}, {x: 400, y: 100, label: 12}
    ],
    visual: 'fa-microphone'
  },
  {
    type: 'art-technique',
    objective: "Unir Puntos: Lightstick Corazón",
    tech: 'dots',
    points: [
      {x: 400, y: 550, label: 1}, {x: 400, y: 400, label: 2}, {x: 320, y: 320, label: 3},
      {x: 250, y: 250, label: 4}, {x: 250, y: 150, label: 5}, {x: 320, y: 100, label: 6},
      {x: 400, y: 150, label: 7}, {x: 480, y: 100, label: 8}, {x: 550, y: 150, label: 9},
      {x: 550, y: 250, label: 10}, {x: 480, y: 320, label: 11}, {x: 400, y: 400, label: 12}
    ],
    visual: 'fa-heart'
  },
  {
    type: 'art-technique',
    objective: "Unir Puntos: Nota Musical",
    tech: 'dots',
    points: [
      {x: 250, y: 500, label: 1}, {x: 350, y: 500, label: 2}, {x: 350, y: 400, label: 3},
      {x: 350, y: 300, label: 4}, {x: 350, y: 200, label: 5}, {x: 350, y: 100, label: 6},
      {x: 500, y: 150, label: 7}, {x: 500, y: 50, label: 8}, {x: 350, y: 30, label: 9}
    ],
    visual: 'fa-music'
  }
];

const GEO_DATABASE = {
  venezuela: [
    { q: "¿Cuál es la capital de Venezuela?", a: ["Caracas", "Valencia"], c: 0, fact: "Caracas está al pie de la montaña El Ávila.", hint: "Empieza por C y tiene muchas montañas.", icon: "fa-city" },
    { q: "¿Cómo se llama la cascada más alta del mundo?", a: ["Cataratas del Niágara", "Salto Ángel"], c: 1, fact: "Está en el estado Bolívar y mide casi 1 kilómetro.", hint: "Tiene nombre de ser celestial.", icon: "fa-water" },
    { q: "¿Cuál es el ave nacional?", a: ["El Turpial", "El Loro"], c: 0, fact: "Tiene colores amarillo, negro y blanco.", hint: "Es pequeñito y canta muy lindo.", icon: "fa-dove" },
    { q: "¿Cuál es el árbol nacional?", a: ["El Samán", "El Araguaney"], c: 1, fact: "Se pone todo amarillo cuando florece.", hint: "Sus flores parecen rayitos de sol.", icon: "fa-tree" },
    { q: "¿En qué estado está el Puente sobre el Lago?", a: ["Zulia", "Falcón"], c: 0, fact: "Es uno de los puentes más largos de Latinoamérica.", hint: "Donde hacen las mejores gaitas.", icon: "fa-bridge" },
  ],
  universal: [
    { q: "¿Cuál es el planeta donde vivimos?", a: ["Marte", "La Tierra"], c: 1, fact: "Es el único planeta con vida conocida.", hint: "Es el planeta azul.", icon: "fa-earth-americas" },
    { q: "¿Cuántos continentes hay en el mundo?", a: ["Cinco", "Siete"], c: 0, fact: "América, Europa, África, Asia y Oceanía.", hint: "Usa los dedos de una mano.", icon: "fa-globe-asia" },
    { q: "¿Cuál es la montaña más alta del mundo?", a: ["Pico Bolívar", "Everest"], c: 1, fact: "Está en la cordillera del Himalaya.", hint: "Está muy, muy cerca del cielo en Asia.", icon: "fa-mountain" },
    { q: "¿Qué océano es el más grande?", a: ["Atlántico", "Pacífico"], c: 1, fact: "Cubre un tercio de la superficie de la Tierra.", hint: "Su nombre dice que es tranquilo.", icon: "fa-fish" },
    { q: "¿En qué país están las Pirámides?", a: ["Egipto", "Italia"], c: 0, fact: "Fueron construidas por faraones hace miles de años.", hint: "Hay mucha arena y camellos.", icon: "fa-monument" },
  ],
  miranda: [
    { q: "¿Cuál es la capital del Estado Miranda?", a: ["Los Teques", "Guarenas"], c: 0, fact: "Es una ciudad con clima fresco de montaña.", hint: "Está muy cerca de Caracas.", icon: "fa-university" },
    { q: "¿Qué dulce famoso se hace en Barlovento?", a: ["Chocolate", "Gomitas"], c: 0, fact: "El cacao de Miranda es el mejor del mundo.", hint: "Es oscuro y muy rico.", icon: "fa-cookie" },
    { q: "¿Cómo se llaman los bailarines de Yare?", a: ["Diablos Danzantes", "Ángeles"], c: 0, fact: "Usan máscaras grandes y rojas.", hint: "Bailan frente a la iglesia.", icon: "fa-mask" },
    { q: "¿Qué playa famosa queda en Miranda?", a: ["Higuerote", "Cuyagua"], c: 0, fact: "Tiene canales y mucha brisa marina.", hint: "A muchos caraqueños les gusta ir ahí.", icon: "fa-umbrella-beach" },
    { q: "¿Qué montaña comparte Miranda con Caracas?", a: ["El Ávila", "Pico Espejo"], c: 0, fact: "Su nombre indígena es Waraira Repano.", hint: "La ves todos los días desde la ventana.", icon: "fa-mountain-sun" },
  ],
  formaciones: [
    { q: "¿Qué sale de un volcán cuando explota?", a: ["Lava", "Agua helada"], c: 0, fact: "La lava es roca derretida muy caliente.", hint: "Es roja y quema mucho.", icon: "fa-volcano" },
    { q: "¿Cómo se llama el movimiento de la tierra?", a: ["Terremoto", "Salto"], c: 0, fact: "Ocurre cuando las placas tectónicas se chocan.", hint: "Todo se sacude.", icon: "fa-house-damage" },
    { q: "¿Qué es una isla?", a: ["Tierra rodeada de agua", "Un río largo"], c: 0, fact: "Margarita es una isla de Venezuela.", hint: "Necesitas un barco para llegar.", icon: "fa-island-moments" },
    { q: "¿Cómo se llama el espacio entre dos montañas?", a: ["Valle", "Pico"], c: 0, fact: "Caracas está situada en un gran valle.", hint: "Es la parte baja y plana.", icon: "fa-mountain" },
    { q: "¿Qué es un desierto?", a: ["Lugar con mucha arena", "Lugar con nieve"], c: 0, fact: "En los Médanos de Coro hay un desierto.", hint: "Hace mucho calor y no hay agua.", icon: "fa-sun" },
  ]
};

const ENGLISH_DATABASE = [
  { word: "Apple", translation: "Manzana", pronunciation: "a-pol", icon: "fa-apple-alt" },
  { word: "Dog", translation: "Perro", pronunciation: "dog", icon: "fa-dog" },
  { word: "Sun", translation: "Sol", pronunciation: "san", icon: "fa-sun" },
  { word: "Blue", translation: "Azul", pronunciation: "blu", icon: "fa-tint" },
  { word: "Friend", translation: "Amigo", pronunciation: "frend", icon: "fa-user-friends" },
  { word: "School", translation: "Escuela", pronunciation: "skul", icon: "fa-school" },
];

const SCIENCE_DATABASE = [
  { 
    items: [
      { id: 'h1', label: 'Célula', x: 30, y: 40, icon: 'fa-microscope', desc: 'Es la unidad más pequeña de vida.' },
      { id: 'h2', label: 'ADN', x: 70, y: 60, icon: 'fa-dna', desc: 'Contiene las instrucciones de tu cuerpo.' }
    ] 
  },
  { 
    items: [
      { id: 'h3', label: 'Fotosíntesis', x: 50, y: 20, icon: 'fa-leaf', desc: 'Así las plantas fabrican su comida con sol.' },
      { id: 'h4', label: 'Raíz', x: 50, y: 80, icon: 'fa-seedling', desc: 'Sujeta la planta y bebe agua del suelo.' }
    ] 
  }
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
        if (i % 3 === 1) {
          const challenge = KPOP_CREATIVE_CHALLENGES[(i - 1) % KPOP_CREATIVE_CHALLENGES.length];
          l.type = 'paint';
          l.objective = challenge.obj;
          l.visual = challenge.icon;
        } else {
          const artData = ART_DATABASE[(i - 1) % ART_DATABASE.length];
          l.type = artData.type;
          l.objective = artData.objective;
          l.visual = (artData as any).visual || 'fa-pen-nib';
          l.artData = {
              technique: (artData as any).tech,
              points: (artData as any).points
          };
        }
      } 
      else if (mod === 'geo') {
        l.type = 'quiz';
        l.objective = "Misión Geografía";
        let category: keyof typeof GEO_DATABASE = 'venezuela';
        if (i > 25 && i <= 50) category = 'universal';
        else if (i > 50 && i <= 75) category = 'miranda';
        else if (i > 75) category = 'formaciones';
        const pool = GEO_DATABASE[category];
        const data = pool[(i - 1) % pool.length];
        l.question = data.q;
        l.visual = data.icon;
        l.options = data.a.map((text, idx) => ({ text, isCorrect: idx === data.c }));
        l.answer = data.fact;
        l.hints = [data.hint];
        l.factCard = { title: "¡Dato Viajero!", curiosity: data.fact };
      } 
      else if (mod === 'math') {
        l.type = 'math-master';
        l.objective = "Cálculo Mental";
        l.mathData = { op: '+', v1: 10 + i, v2: 5 + i };
        l.answer = 15 + (i * 2);
      } 
      else if (mod === 'english') {
        const data = ENGLISH_DATABASE[(i - 1) % ENGLISH_DATABASE.length];
        l.type = 'lingua-flow';
        l.objective = "Vocabulario Inglés";
        l.question = data.word;
        l.answer = data.translation;
        l.visual = data.icon;
        l.englishData = { pronunciation: data.pronunciation };
      }
      else if (mod === 'science') {
        const data = SCIENCE_DATABASE[(i - 1) % SCIENCE_DATABASE.length];
        l.type = 'science-lab';
        l.objective = "Laboratorio Natural";
        l.scientificData = { hiddenItems: data.items };
      }
      else if (mod === 'reading') {
        l.type = 'reading-adventure';
        l.objective = "Lectura del Día " + i;
        l.readingData = {
          title: "El Secreto del Bosque",
          author: "Escritor Mágico",
          estimatedTime: "3 min",
          content: "Había una vez un pequeño conejo llamado Saltarín que vivía en un bosque lleno de árboles gigantes. Un día, encontró una zanahoria dorada que brillaba bajo la luz de la luna.\n\nSaltarín no sabía qué hacer con ella, así que llamó a sus amigos para compartir el secreto. Juntos descubrieron que la zanahoria no era para comer, sino que abría la puerta a un jardín de sueños.",
          questions: [
            { question: "¿Cómo se llamaba el conejo?", options: ["Saltarín", "Orejas"], correct: 0 },
            { question: "¿Qué encontró Saltarín?", options: ["Una manzana", "Una zanahoria dorada"], correct: 1 }
          ]
        };
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante, Jana!", "¡Objetivo cumplido!", "¡Sigue explorando!", "¡Impresionante!", "¡Lo lograste!"];
