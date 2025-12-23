
import { Warrior, ModuleId, Level, QuizOption } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: {
    id: 'color',
    name: 'AURA',
    title: 'Guerrera del Arte',
    subject: 'Dibujo y Color',
    color: '#ec4899',
    gradient: 'from-pink-400 to-rose-600',
    description: 'Aprende a mezclar colores y crea paisajes mágicos.',
    icon: 'fa-palette',
  },
  math: {
    id: 'math',
    name: 'TECH',
    title: 'Guerrera de los Números',
    subject: 'Matemáticas',
    color: '#8b5cf6',
    gradient: 'from-violet-400 to-purple-700',
    description: 'Domina las multiplicaciones y las divisiones mágicas.',
    icon: 'fa-calculator',
  },
  english: {
    id: 'english',
    name: 'LINGUA',
    title: 'Guerrera de Idiomas',
    subject: 'Inglés',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-700',
    description: 'Aprende palabras y frases para tus canciones K-Pop.',
    icon: 'fa-language',
  },
  geo: {
    id: 'geo',
    name: 'GEO',
    title: 'Guerrera del Mundo',
    subject: 'Geografía',
    color: '#fbbf24',
    gradient: 'from-amber-300 to-yellow-600',
    description: 'Explora Venezuela, Miranda y las banderas del mundo.',
    icon: 'fa-globe-americas',
  },
  science: {
    id: 'science',
    name: 'NATURA',
    title: 'Guerrera Natural',
    subject: 'Ciencias',
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-600',
    description: 'Descubre los secretos de los animales, las plantas y el cuerpo humano.',
    icon: 'fa-leaf',
  },
};

const ART_CHALLENGES = [
  "Dibuja un Sol amarillo.",
  "Dibuja un Corazón rosa.",
  "Dibuja una Estrella dorada.",
  "Dibuja una Flor de colores.",
  "Dibuja una Casita pequeña.",
  "Dibuja un Gatito feliz.",
  "Dibuja un Helado de fresa.",
  "Dibuja un Arcoíris.",
  "Dibuja una Mariposa.",
  "Dibuja una Piruleta redonda.",
  "Dibuja un Árbol con manzanas.",
  "Dibuja una Nube sonriente.",
  "Dibuja un Pececito azul.",
  "Dibuja un Globo morado.",
  "Dibuja una Carita Feliz.",
  "Dibuja un Vestido rosa.",
  "Dibuja una Corona de reina.",
  "Dibuja un Pastel con velas.",
  "Dibuja la Luna blanca.",
  "Dibuja un Cohete espacial.",
  "Dibuja un Lápiz de color.",
  "Dibuja una Manzana roja.",
  "Dibuja un Osito de peluche.",
  "Dibuja un Barquito en el mar.",
  "Dibuja una Sombrilla.",
  "Dibuja una Pelota de playa.",
  "Dibuja un Sol con gafas.",
  "Dibuja una Hoja verde.",
  "Dibuja un Pollito amarillo.",
  "Dibuja un Regalo con lazo.",
  "Dibuja un Micrófono K-Pop.",
  "Dibuja una Nota musical.",
  "Dibuja un Diamante azul.",
  "Dibuja una Varita mágica.",
  "Dibuja un Auricular neón.",
  "Dibuja un Zapato brillante.",
  "Dibuja una Mochila rosa.",
  "Dibuja un Pincel con pintura.",
  "Dibuja un Cubo de arena.",
  "Dibuja una Galleta rica.",
  "Dibuja una Fresa roja.",
  "Dibuja un Plátano amarillo.",
  "Dibuja una Sandía verde.",
  "Dibuja un Gorrito de fiesta.",
  "Dibuja un Tambor pequeño.",
  "Dibuja una Guitarra azul.",
  "Dibuja un Robot de colores.",
  "Dibuja un Avión blanco.",
  "Dibuja una Bici roja.",
  "Dibuja un Tren largo.",
  "Dibuja un Patito de goma.",
  "Dibuja un Cubo de juguete.",
  "Dibuja una Cometa alta.",
  "Dibuja una Abeja rayada.",
  "Dibuja una Mariquita roja.",
  "Dibuja un Caracol lento.",
  "Dibuja una Tortuga verde.",
  "Dibuja un Conejito blanco.",
  "Dibuja un Oso Panda.",
  "Dibuja un Escenario K-Pop."
];

const getFlagSVG = (pais: string) => {
  const common = 'width="100%" height="100%" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style="display:block; border-radius:8px; border:4px solid #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"';
  
  switch(pais) {
    case "Argentina": return `<svg ${common}><rect width="900" height="200" fill="#75AADB"/><rect y="200" width="900" height="200" fill="#FFFFFF"/><rect y="400" width="900" height="200" fill="#75AADB"/><circle cx="450" cy="300" r="60" fill="#FFD700"/></svg>`;
    case "Brasil": return `<svg ${common}><rect width="900" height="600" fill="#009B3A"/><path d="M450 50 L850 300 L450 550 L50 300 Z" fill="#FEDF00"/><circle cx="450" cy="300" r="130" fill="#002776"/></svg>`;
    case "Canadá": return `<svg ${common}><rect width="225" height="600" fill="#FF0000"/><rect x="225" width="450" height="600" fill="#FFFFFF"/><rect x="675" width="225" height="600" fill="#FF0000"/><path d="M450 150 L470 250 L550 250 L480 320 L510 400 L450 350 L390 400 L420 320 L350 250 L430 250 Z" fill="#FF0000"/></svg>`;
    case "Francia": return `<svg ${common}><rect width="300" height="600" fill="#002395"/><rect x="300" width="300" height="600" fill="#FFFFFF"/><rect x="600" width="300" height="600" fill="#ED2939"/></svg>`;
    case "Alemania": return `<svg ${common}><rect width="900" height="200" fill="#000000"/><rect y="200" width="900" height="200" fill="#FF0000"/><rect y="400" width="900" height="200" fill="#FFCC00"/></svg>`;
    case "Italia": return `<svg ${common}><rect width="300" height="600" fill="#008C45"/><rect x="300" width="300" height="600" fill="#F4F5F0"/><rect x="600" width="300" height="600" fill="#CD212A"/></svg>`;
    case "Japón": return `<svg ${common}><rect width="900" height="600" fill="#FFFFFF"/><circle cx="450" cy="300" r="180" fill="#BC002D"/></svg>`;
    case "México": return `<svg ${common}><rect width="300" height="600" fill="#006847"/><rect x="300" width="300" height="600" fill="#FFFFFF"/><rect x="600" width="300" height="600" fill="#CE1126"/><circle cx="450" cy="300" r="50" fill="#8B4513"/></svg>`;
    case "Reino Unido": return `<svg ${common}><rect width="900" height="600" fill="#00247D"/><path d="M0 0 L900 600 M900 0 L0 600" stroke="#FFFFFF" stroke-width="60"/><path d="M0 0 L900 600 M900 0 L0 600" stroke="#CF142B" stroke-width="20"/><path d="M450 0 V600 M0 300 H900" stroke="#FFFFFF" stroke-width="100"/><path d="M450 0 V600 M0 300 H900" stroke="#CF142B" stroke-width="60"/></svg>`;
    case "Estados Unidos": return `<svg ${common}><rect width="900" height="600" fill="#FFFFFF"/><rect width="900" height="46" y="0" fill="#B22234"/><rect width="900" height="46" y="92" fill="#B22234"/><rect width="900" height="46" y="184" fill="#B22234"/><rect width="900" height="46" y="276" fill="#B22234"/><rect width="900" height="46" y="368" fill="#B22234"/><rect width="900" height="46" y="460" fill="#B22234"/><rect width="900" height="46" y="552" fill="#B22234"/><rect width="360" height="323" fill="#3C3B6E"/></svg>`;
    case "España": return `<svg ${common}><rect width="900" height="150" fill="#AA151B"/><rect y="150" width="900" height="300" fill="#F1BF00"/><rect y="450" width="900" height="150" fill="#AA151B"/><circle cx="250" cy="300" r="40" fill="#AA151B"/></svg>`;
    case "China": return `<svg ${common}><rect width="900" height="600" fill="#EE1C25"/><path d="M150 150 L170 210 L230 210 L180 250 L200 310 L150 270 L100 310 L120 250 L70 210 L130 210 Z" fill="#FFFF00"/></svg>`;
    case "India": return `<svg ${common}><rect width="900" height="200" fill="#FF9933"/><rect y="200" width="900" height="200" fill="#FFFFFF"/><rect y="400" width="900" height="200" fill="#138808"/><circle cx="450" cy="300" r="80" fill="none" stroke="#000080" stroke-width="5"/></svg>`;
    case "Sudáfrica": return `<svg ${common}><rect width="900" height="200" fill="#E03C31"/><rect y="400" width="900" height="200" fill="#001489"/><path d="M0 0 L450 300 L0 600 Z" fill="#000000" stroke="#FFB81C" stroke-width="40"/><path d="M0 300 H900" stroke="#007749" stroke-width="120" stroke-opacity="0.5"/></svg>`;
    case "Australia": return `<svg ${common}><rect width="900" height="600" fill="#00008B"/><rect width="450" height="300" fill="#00247D"/><path d="M0 0 L450 300 M450 0 L0 300" stroke="#FFFFFF" stroke-width="30"/><path d="M225 0 V300 M0 150 H450" stroke="#FFFFFF" stroke-width="50"/><path d="M225 0 V300 M0 150 H450" stroke="#CF142B" stroke-width="30"/></svg>`;
    case "Colombia": return `<svg ${common}><rect width="900" height="300" fill="#FCD116"/><rect y="300" width="900" height="150" fill="#003893"/><rect y="450" width="900" height="150" fill="#CE1126"/></svg>`;
    case "Rusia": return `<svg ${common}><rect width="900" height="200" fill="#FFFFFF"/><rect y="200" width="900" height="200" fill="#0039A6"/><rect y="400" width="900" height="200" fill="#D52B1E"/></svg>`;
    case "Egipto": return `<svg ${common}><rect width="900" height="200" fill="#CE1126"/><rect y="200" width="900" height="200" fill="#FFFFFF"/><rect y="400" width="900" height="200" fill="#000000"/><circle cx="450" cy="300" r="40" fill="#C09300"/></svg>`;
    case "Nueva Zelanda": return `<svg ${common}><rect width="900" height="600" fill="#00247D"/><rect width="450" height="300" fill="#00247D"/><path d="M0 0 L450 300 M450 0 L0 300" stroke="#FFFFFF" stroke-width="30"/><path d="M225 0 V300 M0 150 H450" stroke="#FFFFFF" stroke-width="50"/><path d="M225 0 V300 M0 150 H450" stroke="#CF142B" stroke-width="30"/><circle cx="700" cy="200" r="20" fill="#CF142B" stroke="#FFFFFF" stroke-width="5"/></svg>`;
    case "Corea del Sur": return `<svg ${common}><rect width="900" height="600" fill="#FFFFFF"/><circle cx="450" cy="300" r="150" fill="#CD2E3A"/><path d="M450 300 A75 75 0 0 1 450 450 A75 75 0 0 0 450 300 Z" fill="#0047A0"/></svg>`;
    case "Venezuela": return `<svg ${common}><rect width="900" height="200" fill="#ffcc00"/><rect y="200" width="900" height="200" fill="#0033cc"/><rect y="400" width="900" height="200" fill="#cf142b"/><circle cx="450" cy="380" r="140" fill="none" /><g fill="white" transform="translate(450, 390)"><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(-60)" /><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(-40)" /><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(-20)" /><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(0)" /><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(20)" /><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(40)" /><path d="M0,-120 L6,-102 L24,-102 L10,-91 L15,-73 L0,-84 L-15,-73 L-10,-91 L-24,-102 L-6,-102 Z" transform="rotate(60)" /><path d="M0,-10 L6,8 L24,8 L10,19 L15,37 L0,26 L-15,37 L-10,19 L-24,8 L-6,8 Z" transform="translate(0, -95)" /></g></svg>`;
    default: return `<svg ${common}><rect width="900" height="600" fill="#ccc"/></svg>`;
  }
};

const BANDERAS_INFO = [
  { pais: "Argentina", colores: ["azul celeste", "blanco", "amarillo"], desc: "Tres franjas horizontales: azul celeste, blanco y azul celeste. Sol amarillo en el centro" },
  { pais: "Brasil", colores: ["verde", "amarillo", "azul", "blanco"], desc: "Fondo verde con rombo amarillo, círculo azul con estrellas blancas" },
  { pais: "Canadá", colores: ["rojo", "blanco"], desc: "Fondo rojo con cuadrado blanco en el centro que contiene una hoja de arce roja" },
  { pais: "Francia", colores: ["azul", "blanco", "rojo"], desc: "Tres franjas verticales de igual tamaño: azul, blanco y rojo" },
  { pais: "Alemania", colores: ["negro", "rojo", "amarillo"], desc: "Tres franjas horizontales de igual tamaño: negro, rojo y dorado (amarillo)" },
  { pais: "Italia", colores: ["verde", "blanco", "rojo"], desc: "Tres franjas verticales de igual tamaño: verde, blanco y rojo" },
  { pais: "Japón", colores: ["blanco", "rojo"], desc: "Fondo blanco con círculo rojo en el centro que representa el sol" },
  { pais: "México", colores: ["verde", "blanco", "rojo"], desc: "Tres franjas verticales: verde, blanco y rojo. Escudo nacional en el centro" },
  { pais: "Reino Unido", colores: ["azul", "rojo", "blanco"], desc: "Cruz roja sobre fondo blanco con cruces diagonales rojas y blancas" },
  { pais: "Estados Unidos", colores: ["rojo", "blanco", "azul"], desc: "13 franjas rojas y blancas con cantón azul con 50 estrellas blancas" },
  { pais: "España", colores: ["rojo", "amarillo"], desc: "Tres franjas horizontales: roja, amarilla (más ancha) y roja. Escudo a la izquierda" },
  { pais: "China", colores: ["rojo", "amarillo"], desc: "Fondo rojo con cinco estrellas amarillas en el cantón" },
  { pais: "India", colores: ["azafrán", "blanco", "verde", "azul"], desc: "Tres franjas horizontales: azafrán, blanco y verde. Rueda azul en el centro" },
  { pais: "Sudáfrica", colores: ["rojo", "azul", "verde", "amarillo", "blanco", "negro"], desc: "Franjas horizontales roja, blanca y azul, con forma de Y verde bordeada de blanco y amarillo" },
  { pais: "Australia", colores: ["azul", "rojo", "blanco"], desc: "Fondo azul con Union Jack en el cantón y estrellas blancas" },
  { pais: "Colombia", colores: ["amarillo", "azul", "rojo"], desc: "Tres franjas horizontales: amarillo (más ancha), azul y roja" },
  { pais: "Rusia", colores: ["blanco", "azul", "rojo"], desc: "Tres franjas horizontales de igual tamaño: blanco, azul y rojo" },
  { pais: "Egipto", colores: ["rojo", "blanco", "negro", "dorado"], desc: "Tres franjas horizontales: roja, blanca y negra. Águila de Saladino dorada en el centro" },
  { pais: "Nueva Zelanda", colores: ["azul", "rojo", "blanco"], desc: "Fondo azul con Union Jack en el cantón y cuatro estrellas rojas bordeadas de blanco" },
  { pais: "Corea del Sur", colores: ["blanco", "rojo", "azul", "negro"], desc: "Fondo blanco con símbolo Yin-Yang rojo y azul en el centro y trigramas negros" }
];

const generateLevels = (): Level[] => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'science'];
  
  modules.forEach(mod => {
    const totalLevels = 60; 
    
    for (let i = 1; i <= totalLevels; i++) {
      let type: Level['type'] = 'quiz';
      let objective = "";
      let question = "";
      let visual = "";
      let options: QuizOption[] = [];
      let factCard: Level['factCard'];

      if (mod === 'color') {
        type = 'paint';
        objective = ART_CHALLENGES[i-1] || `Dibuja algo lindo (Nivel ${i})`;
      } 
      
      else if (mod === 'math') {
        let correct: number;
        if (i <= 30) { 
          const a = Math.floor((i-1)/3) + 2;
          const b = (i % 9) + 1;
          correct = a * b;
          objective = "Multiplicación Ninja";
          question = `${a} × ${b} = ?`;
        } else { 
          const res = Math.floor((i-31)/3) + 2;
          const div = (i % 5) + 2;
          correct = res;
          objective = "División de Guerrera";
          question = `${res * div} ÷ ${div} = ?`;
        }
        
        const uniqueOptions = new Set<number>();
        uniqueOptions.add(correct);
        while(uniqueOptions.size < 4) {
           const fake = correct + (Math.floor(Math.random() * 10) - 5);
           if (fake >= 0 && fake !== correct) uniqueOptions.add(fake);
           else uniqueOptions.add(correct + uniqueOptions.size + 1);
        }
        
        options = Array.from(uniqueOptions).map(val => ({
          text: val.toString(),
          isCorrect: val === correct
        })).sort(() => Math.random() - 0.5);
      } 
      
      else if (mod === 'english') {
        objective = "English Academy";
        const vocabulary = [
          { en: "Hello", es: "Hola", v: "👋" }, { en: "Pink", es: "Rosado", v: "🩷" },
          { en: "School", es: "Escuela", v: "🏫" }, { en: "Sister", es: "Hermana", v: "👧" },
          { en: "Ice Cream", es: "Helado", v: "🍦" }, { en: "Sun", es: "Sol", v: "☀️" },
          { en: "Book", es: "Libro", v: "📖" }, { en: "Dance", es: "Baila", v: "💃" },
          { en: "Cloud", es: "Nube", v: "☁️" }, { en: "Flower", es: "Flor", v: "🌸" }
        ];
        const item = vocabulary[(i - 1) % vocabulary.length];
        question = `¿Qué significa "${item.en}"?`;
        visual = item.v;
        options = [
          { text: item.es, isCorrect: true },
          { text: "Comida", isCorrect: false },
          { text: "Correr", isCorrect: false },
          { text: "Avión", isCorrect: false }
        ].sort(() => Math.random() - 0.5);
      } 
      
      else if (mod === 'geo') {
        if (i <= 20) { 
          const item = BANDERAS_INFO[(i - 1) % BANDERAS_INFO.length];
          objective = "Banderas del Mundo";
          question = "¿A qué país pertenece esta bandera?";
          visual = getFlagSVG(item.pais);
          options = [
            { text: item.pais, isCorrect: true },
            { text: "Italia", isCorrect: false },
            { text: "Corea del Norte", isCorrect: false },
            { text: "Portugal", isCorrect: false }
          ].sort(() => Math.random() - 0.5);
          
          factCard = { 
            title: item.pais, 
            curiosity: `Colores: ${item.colores.join(', ')}. ${item.desc}` 
          };
        } else if (i <= 40) {
          const item = BANDERAS_INFO[(i - 21) % BANDERAS_INFO.length];
          objective = "Banderas del Mundo II";
          question = "¿De qué país es esta bandera?";
          visual = getFlagSVG(item.pais);
          options = [
            { text: item.pais, isCorrect: true },
            { text: "Italia", isCorrect: false },
            { text: "España", isCorrect: false },
            { text: "Japón", isCorrect: false }
          ].sort(() => Math.random() - 0.5).map(o => o.text === item.pais && !o.isCorrect ? {text: "Perú", isCorrect: false} : o);
          factCard = { title: item.pais, curiosity: item.desc };
        } else if (i <= 50) { 
          objective = "Mi Linda Venezuela";
          if (i === 41) {
            question = "¿De qué país es esta bandera de 8 estrellas?";
            visual = getFlagSVG("Venezuela");
            options = [{ text: "Venezuela", isCorrect: true }, { text: "Ecuador", isCorrect: false }, { text: "Colombia", isCorrect: false }, { text: "Panamá", isCorrect: false }];
          } else {
            const states = [
              { n: "Zulia", c: "Maracaibo" }, { n: "Bolívar", c: "Ciudad Bolívar" },
              { n: "Lara", c: "Barquisimeto" }, { n: "Carabobo", c: "Valencia" },
              { n: "Miranda", c: "Los Teques" }, { n: "Táchira", c: "San Cristóbal" }
            ];
            const s = states[(i - 42) % states.length];
            // Fix: Defensive check for s
            if (s) {
               question = `¿Cuál es la capital del estado ${s.n}?`;
               visual = getFlagSVG("Venezuela");
               options = [
                 { text: s.c, isCorrect: true },
                 { text: "Caracas", isCorrect: false },
                 { text: "Mérida", isCorrect: false },
                 { text: "Barcelona", isCorrect: false }
               ].sort(() => Math.random() - 0.5);
            } else {
               question = "¿Cuál es la capital de Venezuela?";
               visual = getFlagSVG("Venezuela");
               options = [{ text: "Caracas", isCorrect: true }, { text: "Lima", isCorrect: false }, { text: "Quito", isCorrect: false }, { text: "Bogotá", isCorrect: false }];
            }
          }
        } else { 
          objective = "Especial: Estado Miranda";
          const mirandaQ = [
            { q: "¿Cuál es la capital del estado Miranda?", a: "Los Teques", v: "📍" },
            { q: "¿En qué región de Venezuela está Miranda?", a: "Región Capital", v: "🗺️" },
            { q: "Famosa playa de Miranda para vacacionar:", a: "Higuerote", v: "🏖️" },
            { q: "¿Cuál es el árbol emblemático de Miranda?", a: "Rosa de Montaña", v: "🌸" },
            { q: "Miranda limita al norte con el Mar...", a: "Caribe", v: "🌊" }
          ];
          const item = mirandaQ[(i - 51) % mirandaQ.length];
          // Fix: Defensive check for item
          if (item) {
            question = item.q;
            visual = item.v;
            options = [
              { text: item.a, isCorrect: true },
              { text: "Maracay", isCorrect: false },
              { text: "San Cristóbal", isCorrect: false },
              { text: "Margarita", isCorrect: false }
            ].sort(() => Math.random() - 0.5);
            factCard = { title: "Miranda", curiosity: "¡Es tu estado! Tiene los Diablos Danzantes de Yare." };
          }
        }
      } 
      
      else if (mod === 'science') {
        objective = "NATURA: Ciencias";
        const scienceQ = [
          { q: "¿Qué animal es vertebrado?", a: "Turpial", v: "🐦" },
          { q: "Ave Nacional de Venezuela:", a: "Turpial", v: "🐦" },
          { q: "¿Cuál es un mamífero?", a: "Oso Frontino", v: "🐻" },
          { q: "¿Árbol Nacional de Venezuela?", a: "Araguaney", v: "🌳" },
          { q: "¿Flor Nacional?", a: "Orquídea", v: "🌸" },
          { q: "Parte de la planta que toma agua:", a: "Raíz", v: "🌱" }
        ];
        const item = scienceQ[(i - 1) % scienceQ.length];
        if (item) {
          question = item.q;
          visual = item.v;
          options = [
            { text: item.a, isCorrect: true },
            { text: "Piedra", isCorrect: false },
            { text: "Viento", isCorrect: false },
            { text: "Nube", isCorrect: false }
          ].sort(() => Math.random() - 0.5);
        }
      }

      levels.push({
        id: `${mod}_${i}`,
        moduleId: mod,
        type,
        index: i,
        objective,
        help: "¡Confía en tu inteligencia, Jana!",
        question,
        visual,
        options,
        factCard,
        rewardId: `sticker_${mod}_${i}`,
        hints: ["¡Tú puedes!", "Mira bien el dibujo"]
      });
    }
  });
  
  return levels;
};

export const LEVELS = generateLevels();

export const MOTIVATIONAL_QUOTES = [
  "¡Increíble estilo K-Pop!",
  "¡Tu cerebro brilla como una estrella!",
  "¡Eres una verdadera guerrera del conocimiento!",
  "¡Nivel superado con éxito total!"
];
