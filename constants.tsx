
import { Warrior, ModuleId, Level } from './types';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'AURA', title: 'Guerrera del Arte', subject: 'Dibujo y Color', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Aprende a mezclar colores.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TECH', title: 'MathMaster', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Domina los números.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LINGUA', title: 'Guerrera Bilingüe', subject: 'Inglés Inmersivo', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Domina el inglés.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEO', title: 'Guerrera del Mundo', subject: 'Geografía', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Explora el mapa.', icon: 'fa-globe-americas' },
  science: { id: 'science', name: 'NATURA', title: 'Guerrera Natural', subject: 'Ciencias', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre la ciencia.', icon: 'fa-leaf' },
};

// MEGA BASE DE DATOS CIENTÍFICA (Local, sin API)
const CIENCIA_DB = {
  elementos: [
    { n: "Hidrógeno", s: "H", i: "fa-wind", d: "El más ligero y abundante del universo." },
    { n: "Helio", s: "He", i: "fa-balloon", d: "Gas noble usado en globos y naves." },
    { n: "Litio", s: "Li", i: "fa-battery-full", d: "Esencial para las baterías de tu tablet." },
    { n: "Carbono", s: "C", i: "fa-gem", d: "Base de la vida. Forma el diamante y el grafito." },
    { n: "Nitrógeno", s: "N", i: "fa-vial", d: "78% del aire que respiras es nitrógeno." },
    { n: "Oxígeno", s: "O", i: "fa-lungs", d: "Vital para la respiración de todos los seres vivos." },
    { n: "Flúor", s: "F", i: "fa-tooth", d: "Protege tus dientes de las caries." },
    { n: "Neón", s: "Ne", i: "fa-lightbulb", d: "Brilla intensamente en las luces de las ciudades." },
    { n: "Sodio", s: "Na", i: "fa-salt-shaker", d: "Parte de la sal que usas en la comida." },
    { n: "Magnesio", s: "Mg", i: "fa-bolt", d: "Importante para tus músculos y huesos." },
    { n: "Aluminio", s: "Al", i: "fa-can-food", d: "Metal ligero usado en envases y aviones." },
    { n: "Silicio", s: "Si", i: "fa-microchip", d: "El corazón de todas las computadoras." },
    { n: "Fósforo", s: "P", i: "fa-fire", d: "Necesario para que tus células tengan energía." },
    { n: "Azufre", s: "S", i: "fa-volcano", d: "Color amarillo y olor fuerte, común en volcanes." },
    { n: "Cloro", s: "Cl", i: "fa-droplet", d: "Mantiene el agua de las piscinas limpia." },
    { n: "Hierro", s: "Fe", i: "fa-anvil", d: "Metal fuerte que transporta oxígeno en tu sangre." },
    { n: "Cobre", s: "Cu", i: "fa-plug", d: "Excelente conductor de electricidad." },
    { n: "Oro", s: "Au", i: "fa-coins", d: "El metal precioso que nunca se oxida." },
    { n: "Plata", s: "Ag", i: "fa-circle-dot", d: "Brillante y muy valioso para la joyería." },
    { n: "Mercurio", s: "Hg", i: "fa-thermometer", d: "¡El único metal que es líquido a temperatura ambiente!" }
  ],
  geologia: [
    { n: "Cuarzo", s: "SiO2", i: "fa-gem", d: "El mineral más común de la corteza terrestre." },
    { n: "Pirita", s: "FeS2", i: "fa-cube", d: "Llamado 'el oro de los tontos' por su brillo." },
    { n: "Obsidiana", s: "Vidrio", i: "fa-mountain", d: "Vidrio volcánico negro muy afilado." },
    { n: "Amatista", s: "Violeta", i: "fa-gem", d: "Una variedad púrpura preciosa del cuarzo." },
    { n: "Mármol", s: "Roca", i: "fa-archway", d: "Roca elegante usada en estatuas y edificios." },
    { n: "Granito", s: "Roca", i: "fa-chess-board", d: "Roca muy dura formada por tres minerales." },
    { n: "Basalto", s: "Lava", i: "fa-fire-flame-curved", d: "Roca oscura que viene directamente de la lava." },
    { n: "Diamante", s: "Puro C", i: "fa-sketch", d: "El material natural más duro que existe." },
    { n: "Pizarra", s: "Lámina", i: "fa-scroll", d: "Roca que se rompe en láminas perfectas." },
    { n: "Talco", s: "Suave", i: "fa-feather", d: "El mineral más blando del mundo." }
  ],
  botanica: [
    { n: "Venus Atrapamoscas", s: "Dionaea", i: "fa-bug", d: "Planta carnívora que atrapa insectos rápido." },
    { n: "Aloe Vera", s: "Aloe", i: "fa-leaf", d: "Su gel cura quemaduras y cuida la piel." },
    { n: "Secuoya Gigante", s: "Árbol", i: "fa-tree", d: "El árbol más grande y antiguo del planeta." },
    { n: "Girasol", s: "Helianthus", i: "fa-sun", d: "Sigue el movimiento del sol durante el día." },
    { n: "Helecho", s: "Pteridofita", i: "fa-spa", d: "Una de las plantas más antiguas, ¡no tiene flores!" },
    { n: "Bambú", s: "Hierba", i: "fa-republican", d: "La planta que crece más rápido en el mundo." },
    { n: "Cactus Saguaro", s: "Cacto", i: "fa-cactus", d: "Puede vivir 200 años en el desierto sin agua." },
    { n: "Orquídea", s: "Flor", i: "fa-spa", d: "Tienen formas increíbles para atraer polinizadores." },
    { n: "Loto Sagrado", s: "Acuática", i: "fa-water", d: "Sus hojas nunca se mojan ni se ensucian." },
    { n: "Roble", s: "Quercus", i: "fa-tree", d: "Símbolo de fuerza, vive más de 500 años." }
  ]
};

export const LEVELS: Level[] = (() => {
  const levels: Level[] = [];
  const modules: ModuleId[] = ['color', 'math', 'english', 'geo', 'science'];
  
  modules.forEach(mod => {
    let max = 60;
    if (mod === 'math') max = 100;
    if (mod === 'english') max = 130;
    if (mod === 'science') max = 120; // 120 Niveles de Ciencia Pura

    for (let i = 1; i <= max; i++) {
      let type: Level['type'] = 'quiz';
      let obj = "", ques = "", ans: any = 0, hints = ["¡Tú puedes!"], visual = "", trans = "", scene = "default";
      let sciData: any = null;

      if (mod === 'science') {
        type = 'science-lab';
        
        // Determinar categoría por tramos para progresión educativa
        let category: 'geologia' | 'botanica' | 'elementos';
        if (i <= 40) category = 'geologia';
        else if (i <= 80) category = 'botanica';
        else category = 'elementos';

        const pool = CIENCIA_DB[category];
        const itemCount = 2 + (i % 3); // 2, 3 o 4 items por nivel
        
        // Seleccionar items aleatorios sin repetir en el mismo nivel
        const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
        const hiddenItems = [];
        
        for (let j = 0; j < Math.min(itemCount, shuffledPool.length); j++) {
          const item = shuffledPool[j];
          hiddenItems.push({
            id: `sci_${i}_${j}`,
            label: item.n,
            symbol: item.s,
            desc: item.d,
            icon: item.i,
            x: 15 + Math.random() * 70,
            y: 15 + Math.random() * 70
          });
        }

        obj = `Expedición ${category.toUpperCase()}: Nivel ${i}`;
        scene = category === 'geologia' ? 'caves' : (category === 'botanica' ? 'forest' : 'lab');
        
        sciData = {
          category: category === 'geologia' ? 'mineral' : (category === 'botanica' ? 'plant' : 'micro'),
          discoveries: hiddenItems.map(h => h.label),
          hiddenItems: hiddenItems
        };

      } else if (mod === 'english') {
        type = 'lingua-flow';
        const words = [
          {en: "Diamond", es: "Diamante", img: "💎"}, {en: "Forest", es: "Bosque", img: "🌲"},
          {en: "Atom", es: "Átomo", img: "⚛️"}, {en: "Robot", es: "Robot", img: "🤖"},
          {en: "Water", es: "Agua", img: "💧"}, {en: "Star", es: "Estrella", img: "⭐"}
        ];
        const pick = words[i % words.length];
        obj = "Learn English"; ques = pick.en; trans = pick.es; visual = pick.img; scene = "park"; ans = [pick.en];
      } else if (mod === 'math') {
        type = 'math-master';
        obj = "Math Power"; ques = `${i} + ${10 + i}`; ans = i + 10 + i;
      } else {
        type = 'quiz';
        obj = "Arte Maestro"; ques = "¿Cuál es un color primario?"; ans = "Rojo";
        visual = "🎨";
      }

      levels.push({
        id: `${mod}_${i}`, moduleId: mod, type, index: i, objective: obj, help: "Explora y captura las muestras.",
        question: ques, answer: ans, translation: trans, scenario: scene, rewardId: `r_${i}`, hints, visual,
        scientificData: sciData
      });
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = [
  "¡Increíble descubrimiento, Jana!",
  "¡Eres la mejor científica del BioSphere!",
  "¡Tu bitácora está brillando con nuevos datos!",
  "¡Nivel superado! La ciencia te agradece.",
  "¡Jana, tu capacidad de observación es de otro nivel!"
];
