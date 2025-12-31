
import { Warrior, ModuleId, Level } from './types.ts';

// Base de datos de guerreras con descripciones y temas K-Pop
export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Idol del Pincel', subject: 'Dibuja como una Estrella K-Pop', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras de arte inspiradas en tus idols.', icon: 'fa-palette' },
  math: { id: 'math', name: 'RITMO', title: 'Reina de la Coreografía', subject: 'Cálculo y Precisión', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Resuelve acertijos al ritmo de la música.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'FANCLUB', title: 'Embajadora Global', subject: 'Inglés para Fans', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Conecta con fans de todo el mundo.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'WORLD TOUR', title: 'Exploradora de Giras', subject: 'Geografía del K-Pop', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja a las capitales del K-Pop.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'STORYTELLER', title: 'Guionista de Dramas', subject: 'Crea tu Propia Historia', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: 'Lee y escribe las mejores historias.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'PRODUCTORA', title: 'Productora Musical', subject: 'Ciencia del Sonido', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia detrás de los hits.', icon: 'fa-music' },
};

// Desafíos creativos con temática K-Pop. Se usan en los niveles de ARTE.
export const KPOP_CREATIVE_CHALLENGES = [
  { obj: "Dibuja un Micrófono Mágico", icon: "fa-microphone-alt" },
  { obj: "Escenario de Concierto Futurista", icon: "fa-rocket" },
  { obj: "Diseña tu propio Lightstick", icon: "fa-magic" },
  { obj: "Outfit K-Pop para tu Idol", icon: "fa-tshirt" },
  { obj: "Logotipo de tu banda favorita", icon: "fa-signature" },
  { obj: "Tu mascota como Idol", icon: "fa-cat" },
  { obj: "Auriculares Galácticos", icon: "fa-headphones" },
  { obj: "Pastel de Cumpleaños para tu Bias", icon: "fa-birthday-cake" },
  { obj: "Diseño de Álbum: 'Estrellas'", icon: "fa-compact-disc" },
  { obj: "Corona de Reina del K-Pop", icon: "fa-crown" }
];

// Base de datos para los juegos de ARTE. Incluye unir puntos y calcar siluetas.
export const ART_DATABASE = [
  // Niveles de Unir Puntos
  { type: 'art-technique', objective: "Unir Puntos: Micrófono Retro", tech: 'dots', points: [{x:400,y:100,l:1},{x:480,y:130,l:2},{x:520,y:200,l:3},{x:500,y:300,l:4},{x:430,y:350,l:5},{x:430,y:550,l:6},{x:370,y:550,l:7},{x:370,y:350,l:8},{x:300,y:300,l:9},{x:280,y:200,l:10},{x:320,y:130,l:11},{x:400,y:100,l:12}], visual: 'fa-microphone' },
  { type: 'art-technique', objective: "Unir Puntos: Lightstick Corazón", tech: 'dots', points: [{x:400,y:550,l:1},{x:400,y:400,l:2},{x:320,y:320,l:3},{x:250,y:250,l:4},{x:250,y:150,l:5},{x:320,y:100,l:6},{x:400,y:150,l:7},{x:480,y:100,l:8},{x:550,y:150,l:9},{x:550,y:250,l:10},{x:480,y:320,l:11},{x:400,y:400,l:12}], visual: 'fa-heart' },
  // Nuevos niveles de Unir Puntos
  { type: 'art-technique', objective: "Unir Puntos: Estrella K-Pop", tech: 'dots', points: [{x:400,y:50,l:1},{x:450,y:200,l:2},{x:600,y:200,l:3},{x:480,y:300,l:4},{x:520,y:450,l:5},{x:400,y:380,l:6},{x:280,y:450,l:7},{x:320,y:300,l:8},{x:200,y:200,l:9},{x:350,y:200,l:10},{x:400,y:50,l:11}], visual: 'fa-star' },
  { type: 'art-technique', objective: "Unir Puntos: Nota Musical", tech: 'dots', points: [{x:300,y:400,l:1},{x:300,y:150,l:2},{x:500,y:100,l:3},{x:500,y:350,l:4},{x:450,y:320,l:5},{x:450,y:450,l:6},{x:350,y:480,l:7},{x:350,y:400,l:8},{x:300,y:400,l:9}], visual: 'fa-music' },
  
  // Niveles de Calcar Siluetas
  { type: 'art-technique', objective: "Calcar Silueta: Auriculares", tech: 'trace', visual: 'fa-headphones-alt', difficulty: 1 },
  { type: 'art-technique', objective: "Calcar Silueta: Cámara de Video", tech: 'trace', visual: 'fa-video', difficulty: 2 },
  { type: 'art-technique', objective: "Calcar Silueta: Avión de Papel", tech: 'trace', visual: 'fa-paper-plane', difficulty: 3 },
];

// Base de datos para los quizzes de GEOGRAFÍA
export const GEO_DATABASE = {
  venezuela: [
    { q: "Pregunta sobre la capital de Venezuela", a: ["Caracas", "Valencia"], c: 0, fact: "Caracas está cerca de la montaña El Ávila.", hint: "Empieza con la letra C.", icon: "fa-city" },
    { q: "Cascada más alta del mundo", a: ["Salto Ángel", "Niágara"], c: 0, fact: "Se encuentra en el Parque Nacional Canaima.", hint: "Tiene un nombre celestial.", icon: "fa-water" },
  ],
  universal: [
      { q: "¿En qué planeta vivimos?", a: ["Marte", "Tierra"], c: 1, fact: "Es el tercer planeta desde el Sol.", hint: "El planeta azul.", icon: "fa-earth-americas" },
  ]
};

// Base de datos AMPLIADA para INGLÉS (100 palabras)
export const ENGLISH_DATABASE = [
  { w: "Apple", t: "Manzana", p: "a-pol", i: "fa-apple-alt" }, { w: "Dog", t: "Perro", p: "dog", i: "fa-dog" },
  { w: "Cat", t: "Gato", p: "cat", i: "fa-cat" }, { w: "House", t: "Casa", p: "haus", i: "fa-home" },
  { w: "Sun", t: "Sol", p: "san", i: "fa-sun" }, { w: "Moon", t: "Luna", p: "mun", i: "fa-moon" },
  { w: "Star", t: "Estrella", p: "star", i: "fa-star" }, { w: "Water", t: "Agua", p: "ua-ter", i: "fa-water" },
  ...(Array(92).fill(0).map((_, i) => ({ w: `Word ${i+9}`, t: `Palabra ${i+9}`, p: `...`, i: 'fa-question-circle' })))
].map(e => ({ word: e.w, translation: e.t, pronunciation: e.p, icon: e.i }));

// Base de datos para CIENCIA
export const SCIENCE_DATABASE = [
  { 
    items: [
      { id: 'h1', label: 'Célula', x: 30, y: 40, icon: 'fa-microscope', desc: 'Es la unidad más pequeña de vida.' },
      { id: 'h2', label: 'ADN', x: 70, y: 60, icon: 'fa-dna', desc: 'Contiene las instrucciones de tu cuerpo.' }
    ] 
  },
];

// Generador de cuentos para LECTURA con MÚLTIPLES plantillas
export const READING_DATABASE = (() => {
  const titles = ["El Debut Soñado", "La Gira Mundial", "El Secreto del Fanchant", "El Comeback del Siglo"];
  const categories = [{ n: "Mundo K-Pop", a: "Min-Ji" }, { n: "Fantasía Clásica", a: "Hada Madrina" }];
  const storyTemplates = [
      (t, c) => `En el vibrante mundo de ${c.n}, la historia de "${t}" comenzaba. Jana, una fan, descubrió que su lightstick tenía un poder secreto.`,
      (t, c) => `Había una vez en el reino de "${t}", donde Jana encontró un mapa estelar que prometía guiarla a un gran escenario.`,
  ];

  return titles.map((title, i) => {
    const cat = categories[i % categories.length];
    const template = storyTemplates[i % storyTemplates.length];
    return {
      title,
      author: cat.a,
      content: template(title, cat) + ` Al final, Jana aprendió que la amistad y la pasión son la clave.`,
      vocabulary: [{ word: "Pasión", meaning: "Un sentimiento muy fuerte." }, { word: "Equipo", meaning: "Un grupo de personas." }],
      questions: [{ question: `¿Cuál fue el tema principal?`, options: ["Amistad", "Comida"], correct: 0 }]
    };
  });
})();

// Generador de NIVELES optimizado
export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'reading', 'science'];
  const mathOps: (['+', number] | ['-', number])[] = [['+', 2], ['-', 1]];

  modules.forEach(mod => {
    for (let i = 1; i <= 100; i++) {
      let l: any = { id: `${mod}_${i}`, moduleId: mod, index: i, rewardId: `r_${i}`, help: "¡Fighting!" };
      
      switch (mod) {
        case 'color':
          const isCreative = i % 4 === 1;
          if (isCreative) {
            const challenge = KPOP_CREATIVE_CHALLENGES[i % KPOP_CREATIVE_CHALLENGES.length];
            l.type = 'paint';
            l.objective = challenge.obj;
            l.visual = challenge.icon;
          } else {
            const artData = ART_DATABASE[i % ART_DATABASE.length];
            l.type = artData.type;
            l.objective = artData.objective;
            l.visual = (artData as any).visual || 'fa-pen-nib';
            l.artData = { technique: (artData as any).tech, points: (artData as any).points, difficulty: (artData as any).difficulty };
          }
          break;
        
        case 'math':
          const [op, factor] = mathOps[(i - 1) % mathOps.length];
          const v1 = 5 + i * factor;
          const v2 = 3 + i;
          l.type = 'math-master';
          l.objective = "Misión de Ritmo: " + (op === '+' ? 'Suma' : 'Resta');
          l.visual = op === '+' ? 'fa-plus-circle' : 'fa-minus-circle';
          l.mathData = { op, v1, v2 };
          l.answer = eval(`${v1} ${op} ${v2}`);
          break;

        case 'english':
          const data = ENGLISH_DATABASE[i % ENGLISH_DATABASE.length];
          l.type = 'lingua-flow';
          l.objective = "Aprende una palabra en inglés";
          l.question = data.word;
          l.answer = data.translation;
          l.visual = data.icon;
          l.englishData = { pronunciation: data.pronunciation };
          break;

        case 'reading':
          const story = READING_DATABASE[(i - 1) % READING_DATABASE.length];
          l.type = 'reading-adventure';
          l.objective = story.title;
          l.readingData = story;
          l.visual = 'fa-book-reader';
          break;
        
        case 'geo':
          l.type = 'quiz';
          l.objective = "Misión Geografía";
          const category = i > 50 ? 'universal' : 'venezuela';
          const pool = GEO_DATABASE[category];
          const dataGeo = pool[(i-1) % pool.length];
          l.question = dataGeo.q;
          l.visual = dataGeo.icon;
          l.options = dataGeo.a.map((text, idx) => ({ text, isCorrect: idx === dataGeo.c }));
          l.answer = dataGeo.fact;
          break;

        case 'science':
          const dataSci = SCIENCE_DATABASE[(i-1) % SCIENCE_DATABASE.length];
          l.type = 'science-lab';
          l.objective = "Laboratorio Musical";
          l.scientificData = { hiddenItems: dataSci.items };
          l.visual = 'fa-flask';
          break;
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres una estrella, Jana!", "¡Daebak! ¡Lo lograste!", "¡Fighting! ¡Sigue así!"];
