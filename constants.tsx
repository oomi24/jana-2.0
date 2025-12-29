
import { Warrior, ModuleId, Level } from './types.ts';

export const WARRIORS: Record<ModuleId, Warrior> = {
  color: { id: 'color', name: 'ARTE', title: 'Guerrera del Color', subject: 'Dibujo y Pintura', color: '#ec4899', gradient: 'from-pink-400 to-rose-600', description: 'Crea obras maestras.', icon: 'fa-palette' },
  math: { id: 'math', name: 'TÉCNICA', title: 'Maestra de Números', subject: 'Matemáticas', color: '#8b5cf6', gradient: 'from-violet-400 to-purple-700', description: 'Desafíos mentales.', icon: 'fa-calculator' },
  english: { id: 'english', name: 'LENGUA', title: 'Guerrera de Idiomas', subject: 'Inglés Divertido', color: '#3b82f6', gradient: 'from-blue-400 to-indigo-700', description: 'Traduce y aprende.', icon: 'fa-language' },
  geo: { id: 'geo', name: 'GEOGRAFÍA', title: 'Exploradora del Mundo', subject: 'Mapas y Países', color: '#fbbf24', gradient: 'from-amber-300 to-yellow-600', description: 'Viaja por el mapa.', icon: 'fa-globe-americas' },
  reading: { id: 'reading', name: 'LECTORA', title: 'Guerrera de Cuentos', subject: 'Lectura Comprensiva', color: '#9c27b0', gradient: 'from-fuchsia-400 to-purple-800', description: '100 historias nuevas.', icon: 'fa-book-open' },
  science: { id: 'science', name: 'NATURALEZA', title: 'Científica Natural', subject: 'Ciencias y Vida', color: '#10b981', gradient: 'from-emerald-400 to-teal-600', description: 'Descubre el mundo.', icon: 'fa-leaf' },
};

// ... (KPOP_CREATIVE_CHALLENGES, ART_DATABASE, GEO_DATABASE, ENGLISH_DATABASE, SCIENCE_DATABASE permanecen igual)
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
    { q: "¿Cómo se llama la cascada más alta del mundo?", a: ["Iguazú", "Salto Ángel"], c: 1, fact: "Está en el estado Bolívar y mide casi 1 kilómetro.", hint: "Tiene nombre de ser celestial.", icon: "fa-water" },
    { q: "¿Cuál es el ave nacional de Venezuela?", a: ["El Turpial", "El Loro"], c: 0, fact: "Tiene colores amarillo, negro y blanco.", hint: "Es pequeñito y canta muy lindo.", icon: "fa-dove" },
    { q: "¿Cuál es el árbol nacional?", a: ["El Samán", "El Araguaney"], c: 1, fact: "Se pone todo amarillo cuando florece.", hint: "Sus flores parecen rayitos de sol.", icon: "fa-tree" },
    { q: "¿En qué estado está el Puente sobre el Lago?", a: ["Zulia", "Falcón"], c: 0, fact: "Es uno de los puentes más largos de Latinoamérica.", hint: "Donde hacen las mejores gaitas.", icon: "fa-bridge" },
    { q: "¿Cuál es el teleférico más largo y alto?", a: ["Caracas", "Mérida"], c: 1, fact: "Llega hasta el Pico Espejo.", hint: "En la ciudad de los caballeros.", icon: "fa-mountain" },
    { q: "¿Qué río es el más grande de Venezuela?", a: ["Caroní", "Orinoco"], c: 1, fact: "Es uno de los ríos más importantes de América.", hint: "Tiene nombre de canción famosa.", icon: "fa-water" },
    { q: "¿Cuál es el lago más grande?", a: ["Valencia", "Maracaibo"], c: 1, fact: "Es el lago más grande de Sudamérica.", hint: "Está en el estado Zulia.", icon: "fa-fish" },
    { q: "¿Cómo se llama el archipiélago con arenas blancas?", a: ["Los Roques", "Las Aves"], c: 0, fact: "Es un parque nacional con aguas cristalinas.", hint: "Suena a piedras pequeñas.", icon: "fa-umbrella-beach" },
    { q: "¿Quién es el Libertador de Venezuela?", a: ["Simón Bolívar", "Andrés Bello"], c: 0, fact: "Nació en Caracas en 1783.", hint: "Nació en una casa muy bonita en el centro.", icon: "fa-user-tie" },
    { q: "¿Cuál es la comida más famosa de Venezuela?", a: ["Tacos", "Arepa"], c: 1, fact: "Se hace con harina de maíz.", hint: "Es redondita y se puede rellenar.", icon: "fa-cookie" },
    { q: "¿Cuál es la flor nacional?", a: ["Orquídea", "Rosa"], c: 0, fact: "Es una flor muy elegante y morada.", hint: "Se llama como una tía famosa.", icon: "fa-spa" },
    { q: "¿Qué son los Tepuyes?", a: ["Montañas planas", "Ríos rápidos"], c: 0, fact: "Son las formaciones más antiguas del mundo.", hint: "Parecen mesas gigantes de piedra.", icon: "fa-mountain-sun" },
    { q: "¿Dónde quedan los Médanos de Coro?", a: ["Falcón", "Bolívar"], c: 0, fact: "Es un desierto de arena en Venezuela.", hint: "Estado que rima con Balcón.", icon: "fa-sun" },
    { q: "¿Cuál es el estado más grande?", a: ["Zulia", "Bolívar"], c: 1, fact: "Ahí están las minas de oro y hierro.", hint: "Lleva el nombre del Libertador.", icon: "fa-map" },
    { q: "¿Qué mar baña las costas de Venezuela?", a: ["Pacífico", "Caribe"], c: 1, fact: "Es famoso por sus aguas cálidas y azules.", hint: "Los piratas navegaban por él.", icon: "fa-ship" },
    { q: "¿Cómo se llama la moneda oficial?", a: ["Dólar", "Bolívar"], c: 1, fact: "Lleva el nombre del Libertador.", hint: "Igual que el apellido de Simón.", icon: "fa-coins" },
    { q: "¿Qué colores tiene la bandera?", a: ["Amarillo, Azul y Rojo", "Blanco y Celeste"], c: 0, fact: "Tiene 8 estrellas blancas.", hint: "Oro, mar y sangre de valientes.", icon: "fa-flag" },
    { q: "¿Cuál es el baile nacional?", a: ["Salsa", "Joropo"], c: 1, fact: "Se baila con arpa, cuatro y maracas.", hint: "Se zapatea con alpargatas.", icon: "fa-music" },
    { q: "¿Cuál es el pico más alto de Venezuela?", a: ["Pico Espejo", "Pico Bolívar"], c: 1, fact: "Mide 4.978 metros sobre el nivel del mar.", hint: "Lleva el nombre del Libertador.", icon: "fa-mountain" },
    { q: "¿Cómo se llama la isla más grande?", a: ["La Tortuga", "Margarita"], c: 1, fact: "Se le conoce como la Perla del Caribe.", hint: "Es un nombre de flor y de niña.", icon: "fa-island-moments" },
    { q: "¿Qué selva está al sur del país?", a: ["Amazonas", "Gran Sabana"], c: 0, fact: "Es el pulmón del mundo en Venezuela.", hint: "Nombre de una tienda de internet famosa.", icon: "fa-leaf" },
    { q: "¿Venezuela tiene reservas de qué?", a: ["Petróleo", "Nieve"], c: 0, fact: "Tiene las reservas más grandes del mundo.", hint: "El 'oro negro'.", icon: "fa-oil-can" },
    { q: "¿Qué producto de Venezuela es premiado?", a: ["Queso", "Cacao"], c: 1, fact: "Se usa para hacer el mejor chocolate.", hint: "Es la semilla mágica de Barlovento.", icon: "fa-apple-alt" },
    { q: "¿Qué fenómeno ocurre en el Lago de Maracaibo?", a: ["Relámpago del Catatumbo", "Nieve"], c: 0, fact: "Lanzan rayos sin truenos muchas veces.", hint: "Es una luz natural que nunca se apaga.", icon: "fa-bolt" },
  ],
  universal: [
    { q: "¿Cuál es el planeta donde vivimos?", a: ["Marte", "La Tierra"], c: 1, fact: "Es el tercer planeta del sistema solar.", hint: "Es el planeta azul.", icon: "fa-earth-americas" },
    { q: "¿Cuántos continentes hay?", a: ["Cinco", "Diez"], c: 0, fact: "América, Europa, África, Asia y Oceanía.", hint: "Usa los dedos de una mano.", icon: "fa-globe-asia" },
    { q: "¿Cuál es la montaña más alta del mundo?", a: ["Aconcagua", "Everest"], c: 1, fact: "Mide 8.848 metros de altura.", hint: "Está en Asia, muy cerca del cielo.", icon: "fa-mountain" },
    { q: "¿Qué océano es el más grande?", a: ["Atlántico", "Pacífico"], c: 1, fact: "Cubre un tercio del planeta.", hint: "Su nombre dice que es tranquilo.", icon: "fa-fish" },
    { q: "¿En qué país están las Pirámides?", a: ["Egipto", "Italia"], c: 0, fact: "Fueron construidas hace miles de años.", hint: "Hay mucha arena y camellos.", icon: "fa-monument" },
    { q: "¿Cuál es el río más largo del mundo?", a: ["Amazonas", "Nilo"], c: 0, fact: "Atraviesa gran parte de Sudamérica.", hint: "Como la selva de Venezuela.", icon: "fa-water" },
    { q: "¿Qué país tiene más personas?", a: ["China", "Venezuela"], c: 0, fact: "Tiene más de mil millones de habitantes.", hint: "Ahí está la Gran Muralla.", icon: "fa-users" },
    { q: "¿Dónde está la Torre Eiffel?", a: ["Roma", "París"], c: 1, fact: "Es el símbolo de Francia.", hint: "La ciudad del amor y la luz.", icon: "fa-broadcast-tower" },
    { q: "¿Qué selva es el pulmón del mundo?", a: ["Selva Negra", "Amazonía"], c: 1, fact: "Produce gran parte del oxígeno.", hint: "Está en Sudamérica.", icon: "fa-tree" },
    { q: "¿Cuál es el desierto más caluroso?", a: ["Sahara", "Gobi"], c: 0, fact: "Está en el norte de África.", hint: "Empieza por S.", icon: "fa-sun" },
    { q: "¿Dónde hace más frío en el mundo?", a: ["Antártida", "Rusia"], c: 0, fact: "Es el continente del Polo Sur.", hint: "Donde viven los pingüinos.", icon: "fa-icicles" },
    { q: "¿Cuál es el satélite de la Tierra?", a: ["Sol", "Luna"], c: 1, fact: "Brilla de noche reflejando al sol.", hint: "Cambia de forma cada mes.", icon: "fa-moon" },
    { q: "¿Cuál es la estrella más cercana?", a: ["Estrella Polar", "El Sol"], c: 1, fact: "Nos da luz y calor cada día.", hint: "Sale por el este.", icon: "fa-star" },
    { q: "¿Dónde viven los osos polares?", a: ["Polo Norte", "Polo Sur"], c: 0, fact: "Viven en el Ártico.", hint: "En la parte de arriba del mapa.", icon: "fa-snowflake" },
    { q: "¿Qué país parece una bota?", a: ["España", "Italia"], c: 1, fact: "Está en el sur de Europa.", hint: "Comen mucha pizza y pasta.", icon: "fa-shoe-prints" },
    { q: "¿Cuál es el país más grande de Sudamérica?", a: ["Brasil", "Argentina"], c: 0, fact: "Hablan portugués.", hint: "Son famosos por el fútbol.", icon: "fa-map-marked" },
    { q: "¿Dónde viven los canguros?", a: ["África", "Australia"], c: 1, fact: "Es una isla-continente enorme.", hint: "Está muy lejos, en Oceanía.", icon: "fa-paw" },
    { q: "¿Dónde está el Big Ben?", a: ["Londres", "Madrid"], c: 0, fact: "Es un reloj muy famoso en Inglaterra.", hint: "Toman mucho té.", icon: "fa-clock" },
    { q: "¿Dónde está la Estatua de la Libertad?", a: ["Miami", "Nueva York"], c: 1, fact: "Fue un regalo de Francia.", hint: "La 'Gran Manzana'.", icon: "fa-monument" },
    { q: "¿Dónde nacieron los Juegos Olímpicos?", a: ["Grecia", "México"], c: 0, fact: "Nacieron en la ciudad de Olimpia.", hint: "País de columnas blancas.", icon: "fa-landmark" },
    { q: "¿Qué país es el 'Sol Naciente'?", a: ["Corea", "Japón"], c: 1, fact: "Está en el este de Asia.", hint: "Comen sushi y hay samuráis.", icon: "fa-sun" },
    { q: "¿Cuál es el país más grande del mundo?", a: ["Canadá", "Rusia"], c: 1, fact: "Ocupa gran parte de Europa y Asia.", hint: "Hace mucho frío y usan gorros de piel.", icon: "fa-globe" },
    { q: "¿Cuál es el país más pequeño del mundo?", a: ["Mónaco", "Vaticano"], c: 1, fact: "Está dentro de la ciudad de Roma.", hint: "Donde vive el Papa.", icon: "fa-place-of-worship" },
    { q: "¿Qué canal une dos océanos?", a: ["Suez", "Panamá"], c: 1, fact: "Permite que los barcos crucen América.", hint: "Nombre del país vecino de Colombia.", icon: "fa-water" },
    { q: "¿Cuál es la cascada más ancha?", a: ["Niágara", "Iguazú"], c: 1, fact: "Está entre Argentina y Brasil.", hint: "Empieza por I.", icon: "fa-water" },
  ],
  miranda: [
    { q: "¿Cuál es la capital del Estado Miranda?", a: ["Los Teques", "Petare"], c: 0, fact: "Es una ciudad de clima fresco.", hint: "Donde vive mucha gente que trabaja en Caracas.", icon: "fa-university" },
    { q: "¿Qué famoso producto sale de Miranda?", a: ["Café", "Cacao"], c: 1, fact: "El cacao de Barlovento es mundial.", hint: "Sirve para hacer chocolate.", icon: "fa-cookie" },
    { q: "¿Cómo se llaman los Diablos de Miranda?", a: ["Diablos de Yare", "Diablos de Coro"], c: 0, fact: "Bailan para pagar promesas.", hint: "Usan máscaras rojas gigantes.", icon: "fa-mask" },
    { q: "¿Qué playas famosas tiene Miranda?", a: ["Higuerote", "Adícora"], c: 0, fact: "Están muy cerca de Caracas.", hint: "Muchos van en carnaval.", icon: "fa-umbrella-beach" },
    { q: "¿Qué montaña comparte Miranda y Caracas?", a: ["El Ávila", "Pico Naiguatá"], c: 0, fact: "Se llama Waraira Repano.", hint: "La ves desde toda la ciudad.", icon: "fa-mountain-sun" },
    { q: "¿Dónde nace el río Guaire?", a: ["Miranda", "Aragua"], c: 0, fact: "Nace en las montañas de San Pedro.", hint: "Cerca de Los Teques.", icon: "fa-tint" },
    { q: "¿Cómo se llama la zona de los tambores?", a: ["Barlovento", "Tuy"], c: 0, fact: "Famosa por su cultura afrodescendiente.", hint: "Sopla el viento hacia allá.", icon: "fa-drum" },
    { q: "¿Qué ciudad de Miranda tiene metro?", a: ["Los Teques", "Ocumare"], c: 0, fact: "Conecta con el metro de Caracas.", hint: "Capital del estado.", icon: "fa-subway" },
    { q: "¿Qué municipio es el más moderno?", a: ["Chacao", "Paz Castillo"], c: 0, fact: "Tiene muchos edificios y plazas.", hint: "Ahí está el Centro San Ignacio.", icon: "fa-city" },
    { q: "¿Qué barrio es de los más grandes?", a: ["Petare", "El Valle"], c: 0, fact: "Está al este de la ciudad.", hint: "Tiene un centro histórico muy lindo.", icon: "fa-home" },
    { q: "¿Cómo es el clima en Los Teques?", a: ["Caliente", "Fresco"], c: 1, fact: "Por estar alto es más frío.", hint: "Necesitas suéter a veces.", icon: "fa-thermometer-half" },
    { q: "¿Qué fruta es famosa en El Jarillo?", a: ["Mango", "Durazno"], c: 1, fact: "Es un pueblo alemán en Miranda.", hint: "Fruta con pelitos en la piel.", icon: "fa-apple-alt" },
    { q: "¿Cómo se llama el parque del este?", a: ["Pque. Miranda", "Pque. Los Chorros"], c: 0, fact: "Su nombre real es Pque. Gral. Fco. de Miranda.", hint: "Donde está la réplica del barco Leander.", icon: "fa-tree" },
    { q: "¿Qué río atraviesa los Valles del Tuy?", a: ["Río Tuy", "Río Guaire"], c: 0, fact: "Es muy largo y surte agua.", hint: "Lleva el nombre de la zona.", icon: "fa-water" },
    { q: "¿Quién fue Francisco de Miranda?", a: ["Un prócer", "Un cantante"], c: 0, fact: "El 'Precursor' de la independencia.", hint: "El estado lleva su nombre.", icon: "fa-user-tie" },
    { q: "¿Qué colores tiene la bandera de Miranda?", a: ["Amarillo, Azul y Rojo", "Amarillo y Negro"], c: 0, fact: "Es parecida a la de Venezuela.", hint: "Tiene un sol y 6 estrellas.", icon: "fa-flag" },
    { q: "¿Qué dulce se come en las playas?", a: ["Conserva de Coco", "Churros"], c: 0, fact: "Hecha con coco y papelón.", hint: "Es marroncita y muy dulce.", icon: "fa-candy-cane" },
    { q: "¿Qué animal hay en el Parque del Este?", a: ["Caimán", "Elefante"], c: 0, fact: "Hay un lago con caimanes.", hint: "Tiene dientes grandes.", icon: "fa-dragon" },
    { q: "¿Dónde está la cueva del Indio?", a: ["El Hatillo", "Baruta"], c: 0, fact: "Es un parque para escalar.", hint: "Municipio rima con Amarillo.", icon: "fa-mountain" },
    { q: "¿Qué se celebra en San Juan?", a: ["Tambores", "Nieve"], c: 0, fact: "Es el 24 de junio.", hint: "San Juan todo lo tiene, San Juan todo lo da.", icon: "fa-drum" },
    { q: "¿Dónde queda Birongo?", a: ["Barlovento", "Los Teques"], c: 0, fact: "Famoso por su chocolate y cacao.", hint: "Tierra de tambores.", icon: "fa-cookie-bite" },
    { q: "¿Cómo se llaman las montañas de Miranda?", a: ["Altos Mirandinos", "Andes"], c: 0, fact: "Donde está San Antonio y Los Teques.", hint: "Están muy 'altos'.", icon: "fa-mountain" },
    { q: "¿Qué municipio es Baruta?", a: ["Miranda", "Caracas"], c: 0, fact: "Pertenece al estado Miranda.", hint: "Donde está Las Mercedes.", icon: "fa-map-pin" },
    { q: "¿Cuál es el árbol regional de Miranda?", a: ["Araguaney", "Roso Blanco"], c: 1, fact: "Es el árbol que representa al estado.", hint: "Nombre de color.", icon: "fa-tree" },
    { q: "¿Qué ave representa a Miranda?", a: ["Colibrí", "Colibrí Tijereta"], c: 1, fact: "Es pequeña y muy rápida.", hint: "Tiene la cola larga.", icon: "fa-dove" },
  ],
  formaciones: [
    { q: "¿Qué sale de un volcán?", a: ["Agua", "Lava"], c: 1, fact: "Es roca derretida muy caliente.", hint: "Es roja y quema mucho.", icon: "fa-volcano" },
    { q: "¿Qué causa un terremoto?", a: ["Viento", "Placas tectónicas"], c: 1, fact: "La tierra se mueve cuando se chocan.", hint: "Todo se sacude.", icon: "fa-house-damage" },
    { q: "¿Qué es una isla?", a: ["Tierra rodeada de agua", "Un río"], c: 0, fact: "Margarita es una isla.", hint: "Necesitas barco para llegar.", icon: "fa-island-moments" },
    { q: "¿Qué es un valle?", a: ["Montaña alta", "Espacio entre montañas"], c: 1, fact: "Caracas está en un valle.", hint: "Es la parte baja y plana.", icon: "fa-mountain" },
    { q: "¿Qué es un desierto?", a: ["Lugar con mucha arena", "Selva"], c: 0, fact: "Casi nunca llueve ahí.", hint: "Hay dunas y oasis.", icon: "fa-sun" },
    { q: "¿Qué es un río?", a: ["Agua dulce que corre", "Agua salada"], c: 0, fact: "Desemboca en el mar.", hint: "Lleva peces y corriente.", icon: "fa-water" },
    { q: "¿Qué es un lago?", a: ["Agua rodeada de tierra", "El mar"], c: 0, fact: "El de Maracaibo es famoso.", hint: "No tiene corriente como el río.", icon: "fa-tint" },
    { q: "¿Qué es el océano?", a: ["Agua salada inmensa", "Un pozo"], c: 0, fact: "Cubre la mayor parte del mundo.", hint: "Ahí viven las ballenas.", icon: "fa-fish" },
    { q: "¿Qué es un glaciar?", a: ["Río de hielo", "Un volcán"], c: 0, fact: "Están en los polos.", hint: "Es muy blanco y frío.", icon: "fa-icicles" },
    { q: "¿Qué es una cueva?", a: ["Hoyo en la montaña", "Un edificio"], c: 0, fact: "Adentro suele estar oscuro.", hint: "Viven murciélagos a veces.", icon: "fa-mountain" },
    { q: "¿Qué es un cañón?", a: ["Paredes de roca altas", "Una playa"], c: 0, fact: "El del Colorado es el más famoso.", hint: "Un río suele pasar por el fondo.", icon: "fa-mountain-sun" },
    { q: "¿Qué es una península?", a: ["Tierra casi rodeada de agua", "Una isla"], c: 0, fact: "Paraguaná es una península.", hint: "Está pegada a la tierra por un cuello.", icon: "fa-map" },
    { q: "¿Qué es un archipiélago?", a: ["Grupo de islas", "Un solo río"], c: 0, fact: "Los Roques es un archipiélago.", hint: "Muchas islas juntas.", icon: "fa-th-large" },
    { q: "¿Qué es una meseta?", a: ["Montaña plana", "Un hueco"], c: 0, fact: "Los Tepuyes son mesetas.", hint: "Parece una mesa gigante.", icon: "fa-table" },
    { q: "¿Qué es un estrecho?", a: ["Paso de agua angosto", "Un lago"], c: 0, fact: "Une dos mares.", hint: "Lo contrario de ancho.", icon: "fa-arrows-alt-h" },
    { q: "¿Qué es una bahía?", a: ["Entrada de mar a la tierra", "Una montaña"], c: 0, fact: "Es un buen lugar para barcos.", hint: "Forma de herradura.", icon: "fa-anchor" },
    { q: "¿Qué es un acantilado?", a: ["Pared de roca vertical", "Un prado"], c: 0, fact: "Suelen estar frente al mar.", hint: "Da miedo asomarse.", icon: "fa-mountain" },
    { q: "¿Qué es un delta?", a: ["Desembocadura de río en dedos", "Una nube"], c: 0, fact: "El del Orinoco es inmenso.", hint: "Parece una mano de agua.", icon: "fa-hand-paper" },
    { q: "¿Qué es un arrecife?", a: ["Bosque bajo el mar", "Arena"], c: 0, fact: "Hecho de corales.", hint: "Donde vive Nemo.", icon: "fa-fish" },
    { q: "¿Qué es una fosa marina?", a: ["Hueco profundo en el mar", "Una ola"], c: 0, fact: "Es la parte más profunda.", hint: "Está muy, muy abajo.", icon: "fa-arrow-down" },
    { q: "¿Qué es un iceberg?", a: ["Montaña de hielo flotando", "Nieve"], c: 0, fact: "Solo se ve la punta arriba.", hint: "Lo que golpeó al Titanic.", icon: "fa-snowflake" },
    { q: "¿Qué es una cascada?", a: ["Agua que cae de alto", "Un pozo"], c: 0, fact: "El Salto Ángel es una.", hint: "Agua saltarina.", icon: "fa-water" },
    { q: "¿Qué es un pantano?", a: ["Tierra con mucha agua y lodo", "Arena"], c: 0, fact: "Hay mucha vegetación.", hint: "Donde viven los cocodrilos.", icon: "fa-leaf" },
    { q: "¿Qué es la sabana?", a: ["Llanura con pasto", "Bosque cerrado"], c: 0, fact: "La Gran Sabana es hermosa.", hint: "Espacio abierto y verde.", icon: "fa-sun" },
    { q: "¿Qué es una cordillera?", a: ["Cadena de montañas", "Un río"], c: 0, fact: "Los Andes es la más larga.", hint: "Muchas montañas en fila.", icon: "fa-mountain" },
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

const READING_DATABASE = (() => {
  const titles = [
    "El Conejo Saltarín", "La Estrella de K-Pop", "El Robot Bailarín", "Viaje a Marte", "El Secreto del Árbol",
    "Gatos con Guitarras", "El Unicornio de Cristal", "Bajo el Mar", "Nieve en el Desierto", "El Mapa del Tesoro",
    "La Galleta Mágica", "El Vuelo del Dragón", "Delfines Amigos", "La Selva de Colores", "El Reloj del Tiempo",
    "Panda Comilón", "Las Botas de Siete Leguas", "El Gigante Amable", "La Sirena y la Perla", "Astronautas en Apuros",
    "El Bosque Encantado", "La Escuela de Magia", "Un Picnic en la Luna", "El Perro que Hablaba", "La Princesa Guerrera",
    "El Misterio de la Luz", "Noche de Concierto", "El Pingüino Friolento", "Las Hadas del Jardín", "El Tren de Vapor",
    "Superhéroes del Barrio", "El Sueño de Volar", "La Casa del Árbol", "El Pez que Caminaba", "Rayos de Sol",
    "La Isla Flotante", "El Castillo de Arena", "Lobo y Caperucita", "El Flautista Mágico", "Los Tres Cerditos",
    "Hansel y Gretel", "Cenicienta Moderna", "El Patito Feo", "La Tortuga Rapidez", "El León y el Ratón",
    "La Cigarra y la Hormiga", "El Zorro y las Uvas", "La Liebre Astuta", "El Escenario de K-Pop", "Bailando en Seúl",
    "El Grupo de las Estrellas", "Gira por el Mundo", "Fans y Canciones", "El Disco de Oro", "Ritmos de Colores",
    "Luces de Neon", "El Baile de la Victoria", "Moda K-Pop", "Coreografías Mágicas", "El Sueño de Ser Idol",
    "El Planeta Azul", "Estrellas Fugaces", "El Sol y sus Planetas", "Gravedad Cero", "Cohetes al Espacio",
    "El Alien Amistoso", "Cometas de Fuego", "La Vía Láctea", "La Luna de Queso", "Naves Espaciales",
    "El Guardián del Bosque", "Aguas Cristalinas", "El Viento que Canta", "La Montaña Sagrada", "Flores que Hablan",
    "El Río Sabio", "Nubes de Algodón", "El Sol Sonriente", "Naturaleza Viva", "El Árbol de la Vida",
    "Cuentos de Antes", "La Historia del Mundo", "Grandes Inventores", "El Descubrimiento", "Héroes del Pasado",
    "Viajeros del Tiempo", "La Brújula Mágica", "Misterios Resueltos", "El Ojo del Detective", "Pistas de Colores",
    "La Aldea Escondida", "El Reino de Hielo", "Dragones de Agua", "El Puente Mágico", "Puertas al Pasado",
    "La Llave Plateada", "El Libro Sagrado", "Letras con Vida", "La Magia de Leer", "Fin de la Aventura"
  ];

  const categories = [
    { name: "Fábulas de Animales", author: "Esopo Moderno" },
    { name: "Mundo K-Pop", author: "Min-Ji" },
    { name: "Aventura Espacial", author: "Capitán Astro" },
    { name: "Misterio Escolar", author: "Detective Lupa" },
    { name: "Cuentos Mágicos", author: "Hada Madrina" }
  ];

  return titles.map((title, i) => {
    const cat = categories[Math.floor(i / 20)];
    return {
      title,
      author: cat.author,
      estimatedTime: "2-3 min",
      content: `Había una vez en el mundo de ${title}, donde Jana vivía grandes aventuras. Todo comenzó cuando un día soleado, se encontró con un objeto brillante que cambiaría su vida. Era un secreto que solo los valientes podían conocer.\n\nJana decidió compartir su descubrimiento con sus mejores amigos los K-Pop Warriors. Juntos, bailaron, cantaron y aprendieron que la amistad es el tesoro más grande de todos. Al final de la jornada, la luna iluminó el camino de regreso a casa, dejando un rastro de polvo de estrellas en el cielo de ${cat.name}.`,
      vocabulary: [
        { word: "Aventura", meaning: "Un suceso emocionante y desconocido." },
        { word: "Brillante", meaning: "Que tiene mucha luz o destaca." }
      ],
      questions: [
        { question: `¿De qué trata el cuento "${title}"?`, options: ["De una aventura mágica", "De dormir mucho"], correct: 0 },
        { question: "¿Quién compartió la aventura con Jana?", options: ["Nadie", "Los K-Pop Warriors"], correct: 1 }
      ]
    };
  });
})();

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
        if (i >= 1 && i <= 25) category = 'venezuela';
        else if (i >= 26 && i <= 50) category = 'universal';
        else if (i >= 51 && i <= 75) category = 'miranda';
        else if (i >= 76 && i <= 100) category = 'formaciones';
        const pool = GEO_DATABASE[category];
        let offset = 1;
        if (category === 'universal') offset = 26;
        if (category === 'miranda') offset = 51;
        if (category === 'formaciones') offset = 76;
        const data = pool[(i - offset) % pool.length];
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
        const story = READING_DATABASE[i - 1]; // Acceso directo al índice para asegurar 100 únicos
        l.type = 'reading-adventure';
        l.objective = story.title;
        l.readingData = story;
      }
      levels.push(l);
    }
  });
  return levels;
})();

export const MOTIVATIONAL_QUOTES = ["¡Eres brillante, Jana!", "¡Objetivo cumplido!", "¡Sigue explorando!", "¡Impresionante!", "¡Lo lograste!"];
